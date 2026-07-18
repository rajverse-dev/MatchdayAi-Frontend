import { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage, TypingIndicator, ChatInput, SuggestedPrompts, ChatContainer } from '../../components/chatbot/ChatMessage';
import { LanguageSelector } from '../../components/common';
import { chatService } from '../../services';
import { useLanguage } from '../../context/LanguageContext';
import type { ChatMessage as ChatMessageType } from '../../types';

const initialMessages: ChatMessageType[] = [
  {
    id: 'msg_welcome',
    role: 'assistant',
    content: "Welcome to MatchDay AI! I'm your smart stadium assistant. I can help you with navigation, crowd info, queue times, emergency guidance, and transportation. How can I help you today?",
    timestamp: new Date().toISOString(),
  },
];

const defaultSuggestions = [
  'Where is the nearest restroom?',
  'What is the current crowd density?',
  'Show me food court wait times',
  'How do I get to my seat?',
];

export function AIChatPage() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(defaultSuggestions);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || typing) return;

    const userMsg: ChatMessageType = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      language,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const response = await chatService.sendMessage({
        message: content,
        language,
        conversationId,
      });
      setConversationId(response.conversationId);
      setSuggestions(response.suggestions);

      const aiMsg: ChatMessageType = {
        id: 'msg_' + (Date.now() + 1),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
  console.error('AI chat frontend error:', error);

  const errorMessage =
    error instanceof Error
      ? error.message
      : 'Unable to connect to MatchDay AI backend.';

  setMessages((prev) => [
    ...prev,
    {
      id: 'msg_err_' + Date.now(),
      role: 'assistant',
      content: `Sorry, I encountered an error: ${errorMessage}`,
      timestamp: new Date().toISOString(),
    },
  ]);
}finally {
      setTyping(false);
    }
  };

  const handleClear = () => {
    setMessages(initialMessages);
    setSuggestions(defaultSuggestions);
    setConversationId(undefined);
  };

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-9rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-xl">AI Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success-400 animate-pulse" />
              <span className="text-xs text-navy-400">Online · Powered by MatchDay AI</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <LanguageSelector />
          <button
            onClick={handleClear}
            className="p-2.5 rounded-xl glass text-navy-300 hover:text-danger-400 hover:border-danger-500/30 transition-all"
            title="Clear conversation"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-6">
          <ChatContainer>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {typing && <TypingIndicator />}
          </ChatContainer>
        </div>

        {/* Suggestions */}
        {!typing && messages.length <= 2 && (
          <div className="px-4 lg:px-6 pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-primary-400" />
              <span className="text-xs text-navy-400">Suggested prompts</span>
            </div>
            <SuggestedPrompts prompts={suggestions} onSelect={(p) => handleSend(p)} />
          </div>
        )}

        {/* Input */}
        <div className="p-4 lg:p-6 border-t border-white/5">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => handleSend()}
            onVoice={() => {}}
            disabled={typing}
          />
        </div>
      </div>
    </div>
  );
}
