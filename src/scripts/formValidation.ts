const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

type DataLayerPayload = Record<string, unknown>;
type FormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type MessageType = 'success' | 'error';
type UtmKey = (typeof UTM_KEYS)[number];
type UtmValues = Partial<Record<UtmKey, string>>;
type LeadFormData = Record<string, string> & {
  name?: string;
  phone?: string;
  contact_method?: string;
  service?: string;
  message?: string;
};

const pushDataLayerEvent = (eventName: string, payload: DataLayerPayload = {}) => {
  if (typeof window === 'undefined') return;
  const win = window as Window & { dataLayer?: DataLayerPayload[] };
  if (!win.dataLayer) {
    win.dataLayer = [];
  }
  win.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    page_title: document.title,
    ...payload,
  });
};

const storeUtmFromUrl = () => {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
    }
  });
};

const getUtmValues = (): UtmValues => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utmValues: UtmValues = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key) || sessionStorage.getItem(key) || '';
    if (value) {
      utmValues[key] = value;
    }
  });

  return utmValues;
};

export class FormValidator {
  private form: HTMLFormElement;
  private successMessage: string;

  constructor(formId: string, successMessage: string, _errorMessage: string) {
    const form = document.getElementById(formId);
    if (!(form instanceof HTMLFormElement)) {
      throw new Error(`Form with id "${formId}" not found`);
    }
    this.form = form;
    this.successMessage = successMessage;
    this.init();
  }

  init(): void {
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));

    // Real-time validation on blur
    const inputs = this.form.querySelectorAll<FormField>('input, textarea, select');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
    });
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePhone(phone: string): boolean {
    if (!phone) return false; // Phone is required now
    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');

    // Valid formats:
    // 380962290400 (12 digits starting with 38)
    // +380962290400 (+ and 12 digits starting with 38)
    // 0962290400 (10 digits starting with 0)

    const withPlus = /^\+380\d{9}$/; // +380XXXXXXXXX (13 chars total)
    const withoutPlus = /^380\d{9}$/; // 380XXXXXXXXX (12 digits)
    const shortFormat = /^0\d{9}$/; // 0XXXXXXXXX (10 digits)

    return withPlus.test(cleanPhone) || withoutPlus.test(cleanPhone) || shortFormat.test(cleanPhone);
  }

  validateField(field: FormField): boolean {
    const errorElement = field.parentElement?.querySelector<HTMLElement>('.error-message');
    const fieldType = field instanceof HTMLInputElement ? field.type : '';
    const value = field.value.trim();
    let error = '';

    if (field.required && !value) {
      error = "Це поле є обов'язковим";
    } else if (fieldType === 'email' && field.value && !this.validateEmail(field.value)) {
      error = 'Введіть коректну email адресу';
    } else if (fieldType === 'tel' && !this.validatePhone(field.value)) {
      error = 'Введіть коректний номер телефону';
    } else if (field.name === 'name' && value.length < 2) {
      error = "Ім'я має бути мінімум 2 символи";
    }

    if (errorElement) {
      errorElement.textContent = error;
      errorElement.style.display = error ? 'block' : 'none';
    }

    if (error) {
      field.classList.add('border-red-500');
      field.classList.remove('border-green-500');
      return false;
    } else if (field.value) {
      field.classList.remove('border-red-500');
      field.classList.add('border-green-500');
      return true;
    }

    return true;
  }

  validateForm(): { isValid: boolean } {
    const inputs = this.form.querySelectorAll<FormField>('input[required], textarea[required], select[required]');

    let isValid = true;
    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return { isValid };
  }

  async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const validation = this.validateForm();
    if (!validation.isValid) {
      return;
    }

    // Get form data
    const formData = new FormData(this.form);
    const data: LeadFormData = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    const utmValues = getUtmValues();
    const selectedPlan = sessionStorage.getItem('selectedPlan') || '';

    // Send to Google Sheets
    const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwdJADWtJiV1dALQhdz_209hivO3uaRw-fB6yfeJCF4JfyaxTTo-6E5iggAKeagha3jfw/exec';

    const params = new URLSearchParams({
      name: data.name || '',
      phone: data.phone || '',
      contact_method: data.contact_method || '',
      service: data.service || 'Не вказано',
      message: data.message || 'Не вказано',
      plan: selectedPlan,
      utm_source: utmValues.utm_source || '',
      utm_medium: utmValues.utm_medium || '',
      utm_campaign: utmValues.utm_campaign || '',
      utm_term: utmValues.utm_term || '',
      utm_content: utmValues.utm_content || '',
    });

    const url = `${SHEETS_URL}?${params.toString()}`;

    // Create script tag to send data (bypasses CORS)
    const script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);

    // Clean up script tag after 3 seconds
    setTimeout(() => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }, 3000);

    // Show success message
    this.showMessage(this.successMessage, 'success');
    pushDataLayerEvent('lead_submit', {
      form_id: this.form.id || '',
      lead_service: data.service || '',
      lead_contact_method: data.contact_method || '',
      lead_plan: selectedPlan || '',
    });
    this.form.reset();
    if (selectedPlan) {
      sessionStorage.removeItem('selectedPlan');
    }

    // Remove validation classes
    const inputs = this.form.querySelectorAll<FormField>('input, textarea, select');
    inputs.forEach((input) => {
      input.classList.remove('border-green-500', 'border-red-500');
    });
  }

  showMessage(message: string, type: MessageType): void {
    // Remove any existing message
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message p-4 rounded-xl text-center font-semibold mb-4 ${
      type === 'success'
        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
        : 'bg-red-500/20 text-red-300 border border-red-500/30'
    }`;
    messageDiv.textContent = message;

    // Find the submit button and insert message before it
    const submitBtn = this.form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submitBtn && submitBtn.parentElement) {
      submitBtn.parentElement.insertBefore(messageDiv, submitBtn);
    } else {
      // Fallback: append to form
      this.form.appendChild(messageDiv);
    }

    // Auto-hide after 8 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 8000);
  }
}

// Initialize form validation
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      storeUtmFromUrl();
      if (document.getElementById('contact-form')) {
        new FormValidator(
          'contact-form',
          "Дякуємо! Ми отримали вашу заявку. Ми зв'яжемося з вами протягом 1 робочого дня.",
          "Сталася помилка. Спробуйте ще раз або зв'яжіться з нами напряму."
        );
      }
    } catch (error) {
      console.error('Form validation initialization failed:', error);
    }
  });
}
