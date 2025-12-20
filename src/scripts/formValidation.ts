interface FormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export class FormValidator {
  private form: HTMLFormElement;
  private successMessage: string;
  private errorMessage: string;

  constructor(formId: string, successMessage: string, errorMessage: string) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) {
      throw new Error(`Form with id "${formId}" not found`);
    }
    this.form = form;
    this.successMessage = successMessage;
    this.errorMessage = errorMessage;
    this.init();
  }

  private init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation on blur
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input as HTMLInputElement));
    });
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private validatePhone(phone: string): boolean {
    if (!phone) return false; // Phone is required now
    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Valid formats:
    // 380962290400 (12 digits starting with 38)
    // +380962290400 (+ and 12 digits starting with 38)
    // 0962290400 (10 digits starting with 0)
    
    const withPlus = /^\+380\d{9}$/;      // +380XXXXXXXXX (13 chars total)
    const withoutPlus = /^380\d{9}$/;      // 380XXXXXXXXX (12 digits)
    const shortFormat = /^0\d{9}$/;        // 0XXXXXXXXX (10 digits)
    
    return withPlus.test(cleanPhone) || withoutPlus.test(cleanPhone) || shortFormat.test(cleanPhone);
  }

  private validateField(field: HTMLInputElement): boolean {
    const errorElement = field.parentElement?.querySelector('.error-message') as HTMLElement;
    let error = '';

    if (field.required && !field.value.trim()) {
      error = 'Це поле обов\'язкове';
    } else if (field.type === 'email' && field.value && !this.validateEmail(field.value)) {
      error = 'Введіть коректну email адресу';
    } else if (field.type === 'tel' && !this.validatePhone(field.value)) {
      error = 'Введіть коректний номер телефону';
    } else if (field.name === 'name' && field.value.trim().length < 2) {
      error = 'Ім\'я має містити принаймні 2 символи';
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

  private validateForm(): ValidationResult {
    const errors: { [key: string]: string } = {};
    const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
    
    let isValid = true;
    inputs.forEach((input) => {
      if (!this.validateField(input as HTMLInputElement)) {
        isValid = false;
      }
    });

    return { isValid, errors };
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();

    const validation = this.validateForm();
    if (!validation.isValid) {
      return;
    }

    // Get form data
    const formData = new FormData(this.form);
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // console.log('Sending form data:', data);

    // Send to Google Sheets
    const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx4OfLk5LvraXgy4tdoHbu-29j3QoQ2apZTyaknKmioTIn_IN1spCtcn6t_ZOioQDr-Rg/exec';
    
    const params = new URLSearchParams({
      name: data.name || '',
      phone: data.phone || '',
      contact_method: data.contact_method || '',
      service: data.service || 'Не вказано',
      message: data.message || 'Не вказано'
    });

    const url = `${SHEETS_URL}?${params.toString()}`;
    // console.log('Google Sheets URL:', url);

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
    this.form.reset();

    // Remove validation classes
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      input.classList.remove('border-green-500', 'border-red-500');
    });
  }

  private showMessage(message: string, type: 'success' | 'error') {
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
      new FormValidator(
        'contact-form',
        'Дякуємо! Ми отримали вашу заявку. Наш менеджер зв\'яжеться з вами протягом 1 робочого дня.',
        'Щось пішло не так. Будь ласка, спробуйте ще раз або зв\'яжіться з нами напряму.'
      );
    } catch (error) {
      console.error('Form validation initialization failed:', error);
    }
  });
}
