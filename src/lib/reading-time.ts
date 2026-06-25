// CJK-aware: ~400 Han chars/min + ~200 latin words/min, min 1 minute.
export function readingTime(body: string): number {
  const cjk = (body.match(/\p{Script=Han}/gu) ?? []).length;
  const words = (body.match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.ceil(cjk / 400 + words / 200));
}
