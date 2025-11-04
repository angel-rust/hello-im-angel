'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { useUIStore } from '@/lib/store';
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Github,
  Search,
  Palette,
  Zap,
} from 'lucide-react';

export default function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const navigate = (path: string) => {
    setCommandPaletteOpen(false);
    router.push(path);
    setSearch('');
  };

  if (!commandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl">
        <Command
          className="rounded-lg border border-accent-blue/30 bg-black/95 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center border-b border-accent-blue/20 px-4">
            <Search className="mr-2 h-5 w-5 text-accent-blue/60" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search..."
              className="flex h-14 w-full bg-transparent py-3 text-lg outline-none placeholder:text-neutral/50 text-neutral"
            />
            <kbd className="ml-auto hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-accent-blue/30 bg-accent-blue/10 px-2 font-mono text-xs font-medium text-accent-blue">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-96 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-neutral/60">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="text-xs font-semibold text-accent-blue/80 px-2 py-2"
            >
              <Command.Item
                onSelect={() => navigate('/')}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent-blue/10 text-neutral data-[selected=true]:bg-accent-blue/20"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/about')}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent-blue/10 text-neutral data-[selected=true]:bg-accent-blue/20"
              >
                <User className="h-4 w-4" />
                <span>About</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/work')}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent-blue/10 text-neutral data-[selected=true]:bg-accent-blue/20"
              >
                <Briefcase className="h-4 w-4" />
                <span>Work</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/skills')}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent-blue/10 text-neutral data-[selected=true]:bg-accent-blue/20"
              >
                <Code className="h-4 w-4" />
                <span>Skills</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/blog')}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent-blue/10 text-neutral data-[selected=true]:bg-accent-blue/20"
              >
                <Zap className="h-4 w-4" />
                <span>Blog</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/connect')}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent-blue/10 text-neutral data-[selected=true]:bg-accent-blue/20"
              >
                <Mail className="h-4 w-4" />
                <span>Connect</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Quick Actions"
              className="text-xs font-semibold text-accent-blue/80 px-2 py-2 mt-2"
            >
              <Command.Item
                onSelect={() => {
                  window.open('https://github.com/angel-rust', '_blank');
                  setCommandPaletteOpen(false);
                }}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent-blue/10 text-neutral data-[selected=true]:bg-accent-blue/20"
              >
                <Github className="h-4 w-4" />
                <span>View GitHub Profile</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/settings')}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 cursor-pointer hover:bg-accent-blue/10 text-neutral data-[selected=true]:bg-accent-blue/20"
              >
                <Palette className="h-4 w-4" />
                <span>Theme Settings</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
