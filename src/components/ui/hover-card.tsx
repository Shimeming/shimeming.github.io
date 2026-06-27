'use client';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode, useState } from 'react';

/**
 * Floating info card anchored to a trigger. Opens on hover (with safe-travel so
 * the pointer can move into the card to click links), keyboard focus, and tap;
 * closes on leave / blur / Escape / outside press. Rendered in a portal so it
 * escapes ancestor transforms (Reveal) and overflow:hidden (Collapsible).
 *
 * `transform: false` makes Floating UI position via top/left instead of a
 * transform, so motion can animate scale without fighting the positioning.
 */
export const HoverCard = ({
  trigger,
  children,
  className = '',
}: {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
  });
  // Stable element setters — destructured so they read as plain refs, not
  // member access during render (satisfies react-hooks/refs).
  const { setReference, setFloating } = refs;

  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'label' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <span
        ref={setReference}
        className='inline-flex'
        {...getReferenceProps()}
      >
        {trigger}
      </span>
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={setFloating}
              style={floatingStyles}
              className={`z-50 origin-top ${className}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              {...getFloatingProps()}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default HoverCard;
