// Shared by the lead form (browser) and /api/lead (server).

export type ContactKind = 'Email' | 'Telegram' | 'Телефон';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM_RE = /^(?:@|(?:https?:\/\/)?t\.me\/)[a-z0-9_]{4,32}$/i;

/** Detects how the visitor wants to be contacted. Returns null for invalid input. */
export const detectContact = (raw: string): ContactKind | null => {
  const value = raw.trim();
  if (!value) return null;
  if (EMAIL_RE.test(value)) return 'Email';
  if (TELEGRAM_RE.test(value)) return 'Telegram';

  const digits = value.replace(/[\s()+.-]/g, '');
  if (/^\d{9,15}$/.test(digits)) return 'Телефон';

  return null;
};
