import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Sparkles } from 'lucide-react';
import type { ChatMessage, Conversation, SourceRef } from '@/types';
import { getConversations, sendMockMessage } from '@/services/mockService';
import { ChatSidebar } from '@/components/ChatSidebar';
import { MessageBubble } from '@/components/MessageBubble';
import { MessageComposer } from '@/components/MessageComposer';
import { ChatEmptyState } from '@/components/ChatEmptyState';
import { SourceViewer } from '@/components/SourceViewer';

let idCounter = 100;
const nextId = () => `gen-${idCounter++}`;

export function Assistant() {
  const location = useLocation();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewSource, setViewSource] = useState<SourceRef | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingPrefill = useRef<string | null>(null);

  useEffect(() => {
    getConversations().then((convos) => {
      setConversations(convos);
      setActiveId(convos[0].id);
      setMessages(convos[0].messages);
    });
  }, []);

  // Handle prefill from Standards page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q && conversations.length > 0 && !pendingPrefill.current) {
      pendingPrefill.current = q;
      // start a fresh conversation with the prefilled question
      handleNewConversation(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, conversations.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  function selectConversation(id: string) {
    const convo = conversations.find((c) => c.id === id);
    if (!convo) return;
    setActiveId(id);
    setMessages([...convo.messages]);
    setSidebarOpen(false);
  }

  function handleNewConversation(prefill?: string) {
    const newConvo: Conversation = {
      id: nextId(),
      title: prefill ? prefill.slice(0, 40) : 'New conversation',
      group: 'Today',
      messages: [],
    };
    setConversations((prev) => [newConvo, ...prev]);
    setActiveId(newConvo.id);
    setMessages([]);
    setSidebarOpen(false);
    if (prefill) {
      sendMessage(prefill);
    }
  }

  async function sendMessage(text: string) {
    const userMsg: ChatMessage = {
      id: nextId(),
      role: 'user',
      content: text,
    };
    const pendingMsg: ChatMessage = {
      id: nextId(),
      role: 'assistant',
      content: '',
      pending: true,
    };
    setMessages((prev) => [...prev, userMsg, pendingMsg]);
    setLoading(true);

    const answer = await sendMockMessage(text);

    setMessages((prev) =>
      prev.map((m) =>
        m.id === pendingMsg.id
          ? {
              ...m,
              content: answer.content,
              sources: answer.sources,
              declined: answer.declined,
              pending: false,
            }
          : m,
      ),
    );

    // persist into conversations state
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, userMsg, {
                ...pendingMsg,
                content: answer.content,
                sources: answer.sources,
                declined: answer.declined,
                pending: false,
              }],
              title: c.messages.length === 0 ? text.slice(0, 40) : c.title,
            }
          : c,
      ),
    );

    setLoading(false);
  }

  const activeConvo = conversations.find((c) => c.id === activeId);
  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[calc(100dvh-4rem)] overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={selectConversation}
        onNew={() => handleNewConversation()}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-navy-100 bg-white/60 px-4 py-3 sm:px-6">
          <button
            className="grid h-9 w-9 place-items-center rounded-lg text-navy-700 hover:bg-navy-50 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open conversations"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy-900 text-white">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-900">
                SAATHI Assistant
              </p>
              <p className="text-xs text-ink-muted">
                {activeConvo?.title ?? 'New conversation'}
              </p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
          {isEmpty ? (
            <ChatEmptyState onPick={(t) => sendMessage(t)} />
          ) : (
            <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  role={m.role}
                  content={m.content}
                  sources={m.sources}
                  pending={m.pending}
                  declined={m.declined}
                  onViewSource={setViewSource}
                />
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <MessageComposer onSend={sendMessage} disabled={loading} />
      </div>

      <SourceViewer source={viewSource} onClose={() => setViewSource(null)} />
    </div>
  );
}
