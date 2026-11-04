// Shared by the lead form (browser) and /api/lead (server).

export const CONTACT_METHODS = ['Telegram', 'Viber', 'Дзвінок'] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export const isContactMethod = (value: string): value is ContactMethod =>
  (CONTACT_METHODS as readonly string[]).includes(value);

/** Request types shown as chips in the lead form. Triggers preselect one via `data-contact-service`. */
export const REQUEST_TYPES = ['Реклама під ключ', 'Аудит', 'Сайт', 'Вакансія', 'Інше'] as const;

// ---------------------------------------------------------------------------
// Phone numbers
//
// Most traffic is Ukrainian, so the field starts with +380 and a strict UA mask.
// Visitors can replace the code: known countries get their own length + grouping,
// any other code falls back to the E.164 limit (8–15 digits in total).
// Country calling codes are prefix-free, so the first matching rule is the only one.

type PhoneRule = {
  code: string;
  /** Allowed lengths of the national part (digits after the country code). */
  lengths: number[];
  /** How the national part is grouped for display. */
  groups: number[];
};

export const DEFAULT_PHONE_CODE = '380';

const PHONE_RULES: PhoneRule[] = [
  { code: '380', lengths: [9], groups: [2, 3, 2, 2] }, // Україна
  { code: '1', lengths: [10], groups: [3, 3, 4] }, // США, Канада
  { code: '44', lengths: [10], groups: [4, 6] }, // Велика Британія
  { code: '48', lengths: [9], groups: [3, 3, 3] }, // Польща
  { code: '49', lengths: [10, 11], groups: [3, 4, 4] }, // Німеччина
  { code: '33', lengths: [9], groups: [1, 2, 2, 2, 2] }, // Франція
  { code: '39', lengths: [9, 10], groups: [3, 3, 4] }, // Італія
  { code: '34', lengths: [9], groups: [3, 3, 3] }, // Іспанія
  { code: '351', lengths: [9], groups: [3, 3, 3] }, // Португалія
  { code: '31', lengths: [9], groups: [1, 4, 4] }, // Нідерланди
  { code: '32', lengths: [8, 9], groups: [3, 3, 3] }, // Бельгія
  { code: '41', lengths: [9], groups: [2, 3, 2, 2] }, // Швейцарія
  { code: '43', lengths: [10, 11], groups: [3, 4, 4] }, // Австрія
  { code: '420', lengths: [9], groups: [3, 3, 3] }, // Чехія
  { code: '421', lengths: [9], groups: [3, 3, 3] }, // Словаччина
  { code: '40', lengths: [9], groups: [3, 3, 3] }, // Румунія
  { code: '373', lengths: [8], groups: [2, 3, 3] }, // Молдова
  { code: '370', lengths: [8], groups: [3, 2, 3] }, // Литва
  { code: '371', lengths: [8], groups: [2, 3, 3] }, // Латвія
  { code: '372', lengths: [7, 8], groups: [4, 4] }, // Естонія
  { code: '45', lengths: [8], groups: [2, 2, 2, 2] }, // Данія
  { code: '46', lengths: [9], groups: [2, 3, 2, 2] }, // Швеція
  { code: '47', lengths: [8], groups: [3, 2, 3] }, // Норвегія
  { code: '358', lengths: [9, 10], groups: [2, 3, 4] }, // Фінляндія
  { code: '353', lengths: [9], groups: [2, 3, 4] }, // Ірландія
  { code: '972', lengths: [9], groups: [2, 3, 4] }, // Ізраїль
  { code: '995', lengths: [9], groups: [3, 2, 2, 2] }, // Грузія
];

const MAX_E164_DIGITS = 15;
const MIN_E164_DIGITS = 8;

const findRule = (digits: string) => PHONE_RULES.find((rule) => digits.startsWith(rule.code));

/**
 * Turns whatever the visitor typed or pasted into international digits (no "+").
 * Handles the usual Ukrainian habits: "096…", "96…", "380…", "00380…" and "+380 0…".
 */
export const normalizePhoneDigits = (raw: string) => {
  const hasPlus = raw.trim().startsWith('+');
  let digits = raw.replace(/\D/g, '');

  if (!hasPlus) {
    if (digits.startsWith('00')) digits = digits.slice(2);
    else if (/^0\d{9}$/.test(digits)) digits = DEFAULT_PHONE_CODE + digits.slice(1);
    else if (/^[1-9]\d{8}$/.test(digits)) digits = DEFAULT_PHONE_CODE + digits;
  }
  // Ukrainian national numbers never start with 0: "+380 096…" → "+380 96…".
  while (digits.startsWith(`${DEFAULT_PHONE_CODE}0`)) {
    digits = DEFAULT_PHONE_CODE + digits.slice(DEFAULT_PHONE_CODE.length + 1);
  }

  const rule = findRule(digits);
  const max = rule ? rule.code.length + Math.max(...rule.lengths) : MAX_E164_DIGITS;
  return digits.slice(0, max);
};

const groupDigits = (value: string, groups: number[]) => {
  const parts: string[] = [];
  let index = 0;
  for (const size of groups) {
    if (index >= value.length) break;
    parts.push(value.slice(index, index + size));
    index += size;
  }
  if (index < value.length) parts.push(value.slice(index));
  return parts.join(' ');
};

/** "+380 96 123 45 67", "+1 415 555 0134"; unknown codes stay ungrouped (code length is unknown). */
export const formatPhone = (digits: string) => {
  if (!digits) return '';
  const rule = findRule(digits);
  if (!rule) return `+${digits}`;
  const national = digits.slice(rule.code.length);
  return national ? `+${rule.code} ${groupDigits(national, rule.groups)}` : `+${rule.code}`;
};

export type PhoneCheck = { ok: true; digits: string } | { ok: false; reason: 'empty' | 'chars' | 'length'; hint: string };

export const checkPhone = (raw: string): PhoneCheck => {
  const value = raw.trim();
  if (!/^\+?[\d\s()./-]*$/.test(value)) return { ok: false, reason: 'chars', hint: 'Номер може містити лише цифри' };

  const digits = normalizePhoneDigits(value);
  const rule = findRule(digits);
  const national = rule ? digits.slice(rule.code.length) : digits;
  if (!national) return { ok: false, reason: 'empty', hint: 'Вкажіть номер телефону' };

  if (rule) {
    if (rule.lengths.includes(national.length)) return { ok: true, digits };
    const need = rule.lengths.join(' або ');
    return { ok: false, reason: 'length', hint: `Перевірте номер: після +${rule.code} має бути ${need} цифр` };
  }
  if (digits.length >= MIN_E164_DIGITS && digits.length <= MAX_E164_DIGITS) return { ok: true, digits };
  return { ok: false, reason: 'length', hint: 'Перевірте номер: код країни і номер, наприклад +380 96 123 45 67' };
};

export const isValidPhone = (raw: string) => checkPhone(raw).ok;
