'use client';

// Extended from internet-development/www-sacred/components/TreeView.tsx (MIT)
// Additions: `onClick` + `active` props so file leaves can act as router links,
// and an `active` style hook on the inner row. The folder semantics (toggle on
// click) are unchanged for non-file nodes.

import styles from '@components/TreeView.module.css';

import * as React from 'react';

interface TreeViewProps {
  children?: React.ReactNode;
  defaultValue?: boolean;
  depth?: number;
  isFile?: boolean;
  isLastChild?: boolean;
  isRoot?: boolean;
  parentLines?: boolean[];
  style?: React.CSSProperties;
  title: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  containsActive?: boolean;
}

const TreeView: React.FC<TreeViewProps> = ({
  defaultValue = false,
  title,
  children,
  depth = 0,
  isFile = false,
  isRoot = false,
  isLastChild = false,
  style,
  parentLines = [],
  onClick,
  active = false,
  containsActive = false,
}) => {
  const [show, setShow] = React.useState<boolean>(defaultValue);

  // Auto-expand whenever this folder is active or contains the active page,
  // so the user never has to manually open the tree to see where they are.
  React.useEffect(() => {
    if (!isFile && (active || containsActive)) setShow(true);
  }, [active, containsActive, isFile]);

  // Row click: files navigate; folders navigate AND ensure expanded.
  const handleRowClick = (): void => {
    if (isFile) { onClick?.(); return; }
    onClick?.();
    setShow(true);
  };
  // Chevron click: toggle expand/collapse without navigating.
  const handleChevronClick = (e: React.MouseEvent): void => {
    if (isFile) return;
    e.stopPropagation();
    setShow((prev) => !prev);
  };

  const hasChildren = React.Children.count(children) > 0;

  const spacing = parentLines.map((line) => (line ? '│   ' : '    ')).join('');
  const endPrefix = isLastChild ? '└── ' : '├── ';
  const prefix = `${spacing}${endPrefix}`;
  const icon = isFile ? '' : show ? '╦ ' : '╤ ';

  const updatedParentLines = [...parentLines, !isLastChild];

  return (
    <div className={styles.root} style={style}>
      <div
        tabIndex={0}
        role={isFile ? 'link' : 'button'}
        onClick={handleRowClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { handleRowClick(); }
          else if (e.key === ' ') {
            e.preventDefault();
            if (isFile) handleRowClick(); else setShow((v) => !v);
          } else if (!isFile && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            e.preventDefault();
            setShow(e.key === 'ArrowRight');
          }
        }}
        className={styles.item}
        aria-expanded={isFile ? undefined : show}
        style={active ? { background: 'var(--theme-focused-foreground)' } : undefined}
      >
        <span style={{ whiteSpace: 'pre' }}>{prefix}</span>
        {isFile ? null : (
          <span
            className={styles.chevron}
            role="button"
            aria-label={show ? 'Skjul mappe' : 'Vis mappe'}
            onClick={handleChevronClick}
            style={{ whiteSpace: 'pre', cursor: 'pointer' }}
          >{icon}</span>
        )}
        {title}
      </div>
      {!isFile && show && hasChildren && (
        <div>
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<TreeViewProps>, {
                  depth: depth + 1,
                  isLastChild: index === React.Children.count(children) - 1,
                  parentLines: updatedParentLines,
                } as any)
              : child
          )}
        </div>
      )}
    </div>
  );
};

export default TreeView;
