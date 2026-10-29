// Shared by the lead form (browser) and /api/lead (server).

export const CONTACT_METHODS = ['Telegram', 'Viber', 'Дзвінок'] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export const isContactMethod = (value: string): value is ContactMethod =>
  (CONTACT_METHODS as readonly string[]).includes(value);

/** Accepts Ukrainian and international numbers: 9–15 digits, optional leading +, common separators. */
export const isValidPhone = (raw: string) => {
  const value = raw.trim();
  if (!/^\+?[\d\s()./-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15;
};
