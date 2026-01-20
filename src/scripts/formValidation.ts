const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const pushDataLayerEvent = (eventName, payload = {}) => {
  if (typeof window === 'undefined') return;
  const win = window as Window & { dataLayer?: Record<string, unknown>[] };
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

const getUtmValues = () => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utmValues = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key) || sessionStorage.getItem(key) || '';
    if (value) {
      utmValues[key] = value;
    }
  });

  return utmValues;
};

export class FormValidator {
  constructor(formId, successMessage, errorMessage) {
    const form = document.getElementById(formId);
    if (!form) {
      throw new Error(`Form with id "${formId}" not found`);
    }
    this.form = form;
    this.successMessage = successMessage;
    this.errorMessage = errorMessage;
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation on blur
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
    });
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePhone(phone) {
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

  validateField(field) {
    const errorElement = field.parentElement?.querySelector('.error-message');
    let error = '';

    if (field.required && !field.value.trim()) {
      error = "Це поле є обов'язковим";
    } else if (field.type === 'email' && field.value && !this.validateEmail(field.value)) {
      error = 'Введіть коректну email адресу';
    } else if (field.type === 'tel' && !this.validatePhone(field.value)) {
      error = 'Введіть коректний номер телефону';
    } else if (field.name === 'name' && field.value.trim().length < 2) {
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

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');

    let isValid = true;
    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return { isValid };
  }

  async handleSubmit(e) {
    e.preventDefault();

    const validation = this.validateForm();
    if (!validation.isValid) {
      return;
    }

    // Get form data
    const formData = new FormData(this.form);
    const data = {};
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
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      input.classList.remove('border-green-500', 'border-red-500');
    });
  }

  showMessage(message, type) {
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
    const submitBtn = this.form.querySelector('button[type="submit"]');
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

