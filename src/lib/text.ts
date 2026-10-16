const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Turns `*accent*` markers into <em> for headlines. Output is HTML-escaped. */
export const emphasize = (value: string) =>
  escapeHtml(value)
    .replace(/(\d) (\d{3})/g, '$1&nbsp;$2')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

/** Removes `*accent*` markers for plain-text contexts (meta, alt, aria). */
export const plain = (value: string) => value.replace(/\*/g, '');

export const pad2 = (value: number) => String(value).padStart(2, '0');
