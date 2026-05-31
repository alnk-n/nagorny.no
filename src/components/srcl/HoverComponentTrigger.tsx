// Ported and simplified from internet-development/www-sacred (MIT).
// Tooltip-only variant — no Popover dependency.

import styles from './HoverComponentTrigger.module.css';
import * as React from 'react';
import * as Position from '@common/position';
import Tooltip from './Tooltip';
import { createPortal } from 'react-dom';

interface HoverComponentTriggerProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  text: string;
}

function HoverComponentTrigger({ children, text }: HoverComponentTriggerProps) {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<{ top: number; left: number }>({
    top: -9999,
    left: -9999,
  });

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  // useLayoutEffect fires after DOM commit but before browser paint, so the
  // tooltip never flashes at the off-screen initial position.
  React.useLayoutEffect(() => {
    if (!open || !triggerRef.current || !tooltipRef.current) return;
    const { position: pos } = Position.calculate(triggerRef.current, tooltipRef.current);
    setPosition(pos);
  }, [open]);

  const portal = open
    ? createPortal(
        <Tooltip
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 'var(--z-index-page-tooltips)',
          }}
        >
          {text}
        </Tooltip>,
        document.body,
      )
    : null;

  return (
    <div
      ref={triggerRef}
      className={styles.root}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {React.cloneElement(children, { tabIndex: 0 } as any)}
      {portal}
    </div>
  );
}

export default HoverComponentTrigger;
