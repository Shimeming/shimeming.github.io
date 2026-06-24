export function mergeOrder(curated, discovered) {
  const present = new Set(discovered);
  const kept = curated.filter((s) => present.has(s));
  const known = new Set(kept);
  const added = discovered.filter((s) => !known.has(s)).sort();
  return [...kept, ...added];
}
