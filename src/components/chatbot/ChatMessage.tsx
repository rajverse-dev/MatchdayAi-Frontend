import { type ReactNode } from 'react';
import { User, Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types';
import { formatTime } from '../../utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 animate-fade-in-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-primary-600 text-white' : 'bg-gradient-to-br from-primary-500 to-primary-700 text-white'
        }`}
      >
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-primary-600 text-white rounded-tr-sm'
              : 'glass text-navy-100 rounded-tl-sm'
          }`}
        >
          {message.content}
        </div>
        <span className="text-xs text-navy-500 mt-1 px-1">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0">
        <Bot size={18} className="text-white" />
      </div>
      <div className="glass px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary-400 animate-bounce-dot" style={{ animationDelay: '0s' }} />
        <span className="h-2 w-2 rounded-full bg-primary-400 animate-bounce-dot" style={{ animationDelay: '0.2s' }} />
        <span className="h-2 w-2 rounded-full bg-primary-400 animate-bounce-dot" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onVoice?: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, onVoice, disabled }: ChatInputProps) {
  return (
    <div className="flex items-end gap-2.5">
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Ask me anything about the stadium..."
          rows={1}
          className="w-full px-4 py-3 pr-12 rounded-2xl glass text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary-500/40 resize-none max-h-32"
          disabled={disabled}
        />
      </div>
      {onVoice && (
        <button
          onClick={onVoice}
          className="p-3 rounded-2xl glass text-navy-300 hover:text-primary-400 hover:border-primary-500/30 transition-all"
          title="Voice input"
        >
          <MicIcon />
        </button>
      )}
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="p-3 rounded-2xl bg-primary-600 text-white hover:bg-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-glow"
      >
        <SendIcon />
      </button>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="px-3.5 py-2 rounded-xl glass text-sm text-navy-200 hover:text-primary-400 hover:border-primary-500/30 transition-all"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

interface ChatContainerProps {
  children: ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
