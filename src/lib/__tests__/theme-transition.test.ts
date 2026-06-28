import { describe, expect, it, vi } from 'vitest';
import { runThemeTransition } from '../theme-transition';

/** Build a fake <html> element that records the calls the helper makes. */
function makeRoot() {
  return {
    style: { setProperty: vi.fn() },
    setAttribute: vi.fn(),
    removeAttribute: vi.fn(),
    clientWidth: 100,
    clientHeight: 50,
  };
}

describe('runThemeTransition', () => {
  it('crossfades instead of revealing when the View Transitions API is unavailable', () => {
    vi.useFakeTimers();
    try {
      const root = makeRoot();
      const doc = { documentElement: root } as unknown as Document; // no startViewTransition
      const setTheme = vi.fn();

      runThemeTransition('dark', { x: 10, y: 20 }, setTheme, { doc, reducedMotion: false });

      // Switches the theme and enables a temporary page-wide colour crossfade...
      expect(setTheme).toHaveBeenCalledWith('dark');
      expect(root.setAttribute).toHaveBeenCalledWith('data-vt', 'fade');
      expect(root.style.setProperty).not.toHaveBeenCalled(); // no reveal geometry

      // ...then tears the crossfade flag down once it has finished.
      expect(root.removeAttribute).not.toHaveBeenCalled();
      vi.runAllTimers();
      expect(root.removeAttribute).toHaveBeenCalledWith('data-vt');
    } finally {
      vi.useRealTimers();
    }
  });

  it('switches theme instantly with no crossfade when the user prefers reduced motion', () => {
    const root = makeRoot();
    const startViewTransition = vi.fn();
    const doc = { documentElement: root, startViewTransition } as unknown as Document;
    const setTheme = vi.fn();

    runThemeTransition('dark', { x: 10, y: 20 }, setTheme, { doc, reducedMotion: true });

    expect(setTheme).toHaveBeenCalledWith('dark');
    expect(startViewTransition).not.toHaveBeenCalled();
    expect(root.setAttribute).not.toHaveBeenCalledWith('data-vt', expect.anything());
  });

  it('runs a view transition from the origin and applies the theme inside the callback', () => {
    const root = makeRoot();
    let captured: (() => void) | undefined;
    const startViewTransition = vi.fn((cb: () => void) => {
      captured = cb;
      return { finished: Promise.resolve(), ready: Promise.resolve(), updateCallbackDone: Promise.resolve() };
    });
    const doc = { documentElement: root, startViewTransition } as unknown as Document;
    const setTheme = vi.fn();

    runThemeTransition('dark', { x: 10, y: 20 }, setTheme, { doc, reducedMotion: false });

    // origin + reach to the farthest corner are exposed as CSS custom properties
    expect(root.style.setProperty).toHaveBeenCalledWith('--vt-x', '10px');
    expect(root.style.setProperty).toHaveBeenCalledWith('--vt-y', '20px');
    const expectedR = Math.hypot(Math.max(10, 100 - 10), Math.max(20, 50 - 20));
    expect(root.style.setProperty).toHaveBeenCalledWith('--vt-r', `${expectedR}px`);
    expect(root.setAttribute).toHaveBeenCalledWith('data-vt', 'ink');
    expect(startViewTransition).toHaveBeenCalledTimes(1);

    // theme is NOT applied until the snapshot callback runs
    expect(setTheme).not.toHaveBeenCalled();
    captured?.();
    expect(root.setAttribute).toHaveBeenCalledWith('data-mode', 'dark');
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
