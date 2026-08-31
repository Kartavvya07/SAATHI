
import { Plus, MessageSquare } from 'lucide-react';
import type { Conversation } from '@/types';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  open: boolean;
  onClose: () => void;
}

export function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  open,
  onClose,
}: ChatSidebarProps) {
  const groups: ('Today' | 'Yesterday' | 'Older')[] = [
    'Today',
    'Yesterday',
    'Older',
  ];

  return (
    <>
      {open && (
        <div
          className="fixed top-16 inset-x-0 bottom-0 z-30 bg-navy-950/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 border-r border-navy-100 bg-cream transition-transform duration-300 md:static md:z-0 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="px-5 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Conversations
            </p>
            <button
              onClick={onNew}
              className="btn-primary mt-4 w-full"
            >
              <Plus size={16} />
              New Conversation
            </button>
          </div>

          <div className="mt-5 flex-1 overflow-y-auto scrollbar-thin px-3 pb-4">
            {groups.map((group) => {
              const items = conversations.filter((c) => c.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group} className="mb-4">
                  <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                    {group}
                  </p>
                  <div className="space-y-0.5">
                    {items.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => onSelect(c.id)}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          activeId === c.id
                            ? 'bg-navy-900 text-white'
                            : 'text-ink-soft hover:bg-navy-50'
                        }`}
                      >
                        <MessageSquare
                          size={15}
                          className={activeId === c.id ? 'text-accent-300' : 'text-ink-muted'}
                        />
                        <span className="truncate">{c.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-navy-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-100 text-sm font-semibold text-navy-700">
                U
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-navy-900">
                  Guest user
                </p>
                <p className="truncate text-xs text-ink-muted">
                  Prototype session
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
