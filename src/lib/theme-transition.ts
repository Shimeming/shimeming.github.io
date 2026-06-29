/**
 * Ink-bleed theme switch built on the View Transitions API.
 *
 * The new theme is revealed with a soft, feathered radial mask that spreads
 * from the toggle icon (see the `[data-vt="ink"]` rules in globals.css).
 *
 * Why we apply `data-mode` ourselves inside the snapshot callback: `next-themes`
 * sets that attribute from a React effect, which runs *after* the callback
 * returns — too late for the View Transition snapshot to capture it. Setting it
 * directly guarantees the "after" snapshot shows the new theme; `setTheme` is
 * still called so next-themes keeps its state and localStorage in sync.
 */

type ViewTransition = { finished: Promise<unknown> };

/** Lifetime of the fallback crossfade; must outlast the CSS transition. */
const FADE_MS = 600;

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

export interface ThemeTransitionOptions {
  /** Injectable for tests. Defaults to the global `document`. */
  doc?: Document;
  /**
   * Injectable for tests. Defaults to the `prefers-reduced-motion` media query.
   */
  reducedMotion?: boolean;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function runThemeTransition(
  next: string,
  origin: { x: number; y: number },
  setTheme: (theme: string) => void,
  options: ThemeTransitionOptions = {},
): void {
  const doc = (options.doc ?? document) as DocumentWithViewTransitions;
  const root = doc.documentElement;
  const reduced = options.reducedMotion ?? prefersReducedMotion();

  // Reduced-motion request: switch instantly, no reveal and no crossfade.
  if (reduced) {
    setTheme(next);
    return;
  }

  // No View Transitions support (e.g. older Firefox): fall back to a brief
  // page-wide colour crossfade so surfaces, borders and text change together
  // (see `[data-vt='fade']` in globals.css) instead of the page "tearing".
  if (typeof doc.startViewTransition !== 'function') {
    root.setAttribute('data-vt', 'fade');
    setTheme(next);
    const timer = setTimeout(() => root.removeAttribute('data-vt'), FADE_MS);
    (timer as unknown as { unref?: () => void }).unref?.();
    return;
  }

  const { x, y } = origin;
  const endRadius = Math.hypot(
    Math.max(x, root.clientWidth - x),
    Math.max(y, root.clientHeight - y),
  );
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);
  root.style.setProperty('--vt-r', `${endRadius}px`);
  root.setAttribute('data-vt', 'ink');

  const transition = doc.startViewTransition(() => {
    root.setAttribute('data-mode', next);
    setTheme(next);
  });

  transition.finished.finally(() => {
    root.removeAttribute('data-vt');
  });
}
