// Minimal utility surface used by the SRCL components in this site.
// (Lifted from internet-development/www-sacred/common/utilities.ts, MIT.)

export function classNames(...args: Array<string | number | boolean | null | undefined | Record<string, unknown>>): string {
  const out: string[] = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === 'string' || typeof arg === 'number') {
      out.push(String(arg));
    } else if (typeof arg === 'object') {
      for (const k of Object.keys(arg)) if ((arg as any)[k]) out.push(k);
    }
  }
  return out.join(' ');
}

export function leftPad(input: string, length: number, char = ' '): string {
  const zerosNeeded = length - input.length;
  if (zerosNeeded <= 0) return input;
  return char.repeat(zerosNeeded) + input;
}
