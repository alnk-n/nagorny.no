// Lite ActionBar — a row of buttons sharing a single bordered container.
// SRCL's ActionBar composes ButtonGroup + ActionButton + DropdownMenuTrigger
// to get nested dropdowns; we only need flat actions on this site, so this
// trimmed version keeps the visual contract without the dropdown chain.

import * as React from 'react';

import styles from './ActionBar.module.css';

export interface ActionBarItem {
  hotkey?: string;
  onClick?: () => void;
  selected?: boolean;
  body: React.ReactNode;
}

interface ActionBarProps {
  items: ActionBarItem[];
}

const ActionBar: React.FC<ActionBarProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((it, i) => (
        <button
          key={i}
          type="button"
          className={styles.btn}
          onClick={it.onClick}
          aria-pressed={!!it.selected}
        >
          {it.hotkey && <span className={styles.hotkey}>{it.hotkey}</span>}
          {it.body}
        </button>
      ))}
    </div>
  );
};

export default ActionBar;
