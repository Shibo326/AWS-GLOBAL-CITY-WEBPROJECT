'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { typingIndicatorVariants } from '@/components/animations/variants';
import { processMessage } from '@/lib/wingman-engine';
import type { ChatMessage } from '@/types';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

const WELCOME_MESSAGE =
  'Greetings, pilot. I am Rory, your AI Wingman. Ask me about the club -- officers, events, departments, membership, or how to join. What do you need to know?';

const TYPING_DELAY = 700;

/**
 * WingmanPanel — Chat panel content with message list, typing indicator, and input.
 * Manages chat state (messages array + isProcessing).
 * Auto-sends a welcome message from Rory on mount.
 * Follow-up chips render below Rory responses when available.
 */
export default function WingmanPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  const generateId = useCallback(() => {
    idCounter.current += 1;
    return `msg-${idCounter.current}`;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  // Auto-send welcome message on mount
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: generateId(),
      role: 'wingman',
      content: WELCOME_MESSAGE,
      timestamp: Date.now(),
      topic: 'identity',
    };
    setMessages([welcomeMsg]);
  }, [generateId]);

  // Scroll to bottom on new messages or processing state change
  useEffect(() => {
    // Small delay to allow DOM to render the new message
    const timer = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timer);
  }, [messages, isProcessing, scrollToBottom]);

  const handleSubmit = useCallback(
    (input: string) => {
      // Add user message
      const userMsg: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: input,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsProcessing(true);
      setFollowUps([]);

      // Simulate typing delay, then process
      setTimeout(() => {
        const result = processMessage(input);

        const roryMsg: ChatMessage = {
          id: generateId(),
          role: 'wingman',
          content: result.answer,
          timestamp: Date.now(),
          topic: result.topic,
        };

        setMessages((prev) => [...prev, roryMsg]);
        setIsProcessing(false);

        if (result.followUps && result.followUps.length > 0) {
          setFollowUps(result.followUps);
        }
      }, TYPING_DELAY);
    },
    [generateId]
  );

  const handleFollowUpClick = useCallback(
    (question: string) => {
      handleSubmit(question);
    },
    [handleSubmit]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Messages scroll area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isProcessing && <TypingIndicator />}

        {/* Follow-up chips */}
        {!isProcessing && followUps.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-8 pt-1">
            {followUps.map((followUp) => (
              <button
                key={followUp}
                type="button"
                onClick={() => handleFollowUpClick(followUp)}
                className="bg-card border border-border rounded-full px-3 py-1 text-xs font-mono text-secondary-text hover:border-accent-blue hover:text-primary-text transition-colors cursor-pointer"
              >
                {followUp}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="px-4 pb-3 pt-2 border-t border-border">
        <ChatInput onSubmit={handleSubmit} disabled={isProcessing} />
      </div>
    </div>
  );
}

/**
 * TypingIndicator — Three bouncing dots shown while Rory is "thinking".
 * Left-aligned like a Rory bubble with the "R" avatar.
 */
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-orange text-background flex items-center justify-center text-xs font-bold mr-2 mt-1"
        aria-hidden="true"
      >
        R
      </div>
      <div
        className="bg-surface border border-border rounded-lg px-4 py-3 flex items-center gap-1"
        aria-label="Rory is typing"
        role="status"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-secondary-text"
            variants={typingIndicatorVariants}
            animate="animate"
            style={{ animationDelay: `${i * 0.15}s` }}
            transition={{
              y: [0, -6, 0],
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 0.1,
              delay: i * 0.15,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
