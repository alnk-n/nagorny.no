// Sidebar.tsx — file-tree sidebar built from SRCL TreeView + ActionListItem.

import * as React from 'react';

import TreeView from './srcl/TreeView';
import ActionListItem from './srcl/ActionListItem';
import Divider from './srcl/Divider';

import { IDENTITY, PROJECTS, WRITING } from '../data';

interface Props {
  path: string;
  navigate: (p: string) => void;
  onPickAny?: () => void;
  onClose?: () => void;
}

const Sidebar: React.FC<Props> = ({ path, navigate, onPickAny, onClose }) => {
  const isActive = (p: string) => p === path;
  const go = (p: string) => () => { navigate(p); onPickAny?.(); };

  return (
    <>
      <div className="site-aside-head">
        <h3>· file tree</h3>
        <button className="site-aside-close" onClick={onClose} aria-label="close menu">[ × ]</button>
      </div>
      <div role="tree" aria-label="filesystem">
        <TreeView title="~ / jonas-eriksen" defaultValue isRoot>
          <TreeView title="readme.md"     isFile active={isActive('/')}              onClick={go('/')} />
          <TreeView title="about.md"      isFile active={isActive('/about.md')}      onClick={go('/about.md')} />
          <TreeView title="now.log"       isFile active={isActive('/now.log')}       onClick={go('/now.log')} />
          <TreeView title="resume.txt"    isFile active={isActive('/resume.txt')}    onClick={go('/resume.txt')} />
          <TreeView title="contact.conf"  isFile active={isActive('/contact.conf')}  onClick={go('/contact.conf')} />

          <TreeView
            title="projects/"
            defaultValue={path.startsWith('/projects')}
            active={isActive('/projects/')}
            containsActive={path.startsWith('/projects')}
            onClick={go('/projects/')}
          >
            {PROJECTS.map((p) => (
              <TreeView
                key={p.id}
                title={`${p.id}.md`}
                isFile
                active={isActive(`/projects/${p.id}.md`)}
                onClick={go(`/projects/${p.id}.md`)}
              />
            ))}
          </TreeView>

          <TreeView
            title="writing/"
            defaultValue={path.startsWith('/writing')}
            active={isActive('/writing/')}
            containsActive={path.startsWith('/writing')}
            onClick={go('/writing/')}
          >
            {WRITING.map((w) => (
              <TreeView
                key={w.slug}
                title={`${w.slug}.md`}
                isFile
                active={isActive(`/writing/${w.slug}.md`)}
                onClick={go(`/writing/${w.slug}.md`)}
              />
            ))}
          </TreeView>
        </TreeView>
      </div>

      <div style={{ height: '1.25rem' }} />
      <Divider />

      <h3>· shortcuts</h3>
      <div className="shortcuts-list">
        <ActionListItem icon="↑" href={`mailto:${IDENTITY.email}`}>mail</ActionListItem>
        <ActionListItem icon="↗" href={`https://github.com/${IDENTITY.github.replace('@', '')}`}>github</ActionListItem>
        <ActionListItem icon="↗" href="#/resume.txt">resume</ActionListItem>
        <ActionListItem icon="↗" href="#/now.log">now</ActionListItem>
      </div>

      <p className="aside-hint">
        Tastatur: ↑/↓ for å bla mellom filer
      </p>
    </>
  );
};

export default Sidebar;
