'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { typingIndicatorVariants } from '@/components/animations/variants';
import { processMessage } from '@/lib/wingman-engine';
import type { ChatMessage } from '@/types';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

const WELCOME_MESSAGE =
  'Greetings, pilot. I am Rory, your AI Wingman. Ask me about the club — officers, events, departments, membership, or how to join. What do you need to know?';

const TYPING_DELAY = 700;

const QUICK_ACTIONS = [
  '🎯 How do I join?',
  '👥 Who are the officers?',
  '📅 Upcoming events',
  '🏢 What departments exist?',
];

/**
 * WingmanPanel — Chat panel content with message list, typing indicator, and input.
 * Manages chat state (messages array + isProcessing).
 * Auto-sends a welcome message from Rory on mount.
 * Quick action chips appear below welcome message.
 * Follow-up chips render below Rory responses when available.
 */
export default function WingmanPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [showQuickActions, setShowQuickActions] = useState(true);
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
    const timer = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timer);
  }, [messages, isProcessing, scrollToBottom]);

  const handleSubmit = useCallback(
    (input: string) => {
      // Hide quick actions once user sends first message
      setShowQuickActions(false);

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
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* Quick action chips — shown after welcome only */}
        <AnimatePresence>
          {showQuickActions && !isProcessing && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-wrap gap-2 pl-10 pt-2"
            >
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => handleFollowUpClick(action)}
                  className="group bg-white border border-border rounded-xl px-3.5 py-2 text-xs font-body text-secondary-text 
                    hover:border-accent-orange/50 hover:bg-accent-orange/5 hover:text-primary-text hover:shadow-sm
                    transition-all duration-200 cursor-pointer"
                >
                  {action}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Follow-up chips */}
        <AnimatePresence>
          {!isProcessing && followUps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2 pl-10 pt-1"
            >
              {followUps.map((followUp) => (
                <button
                  key={followUp}
                  type="button"
                  onClick={() => handleFollowUpClick(followUp)}
                  className="bg-white border border-border rounded-xl px-3.5 py-2 text-xs font-body text-secondary-text 
                    hover:border-accent-orange/50 hover:bg-accent-orange/5 hover:text-primary-text hover:shadow-sm
                    transition-all duration-200 cursor-pointer"
                >
                  {followUp}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area — elevated with subtle gradient */}
      <div className="px-4 sm:px-6 pb-4 pt-3 border-t border-border/50 bg-gradient-to-t from-white/80 to-transparent">
        <ChatInput onSubmit={handleSubmit} disabled={isProcessing} />
      </div>
    </div>
  );
}

/**
 * TypingIndicator — Three bouncing dots shown while Rory is "thinking".
 * Left-aligned like a Rory bubble with avatar.
 */
function TypingIndicator() {
  return (
    <div className="flex justify-start items-end gap-2">
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border border-accent-orange/30 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #FF9900, #FBBF24)' }}
        aria-hidden="true"
      >
        <img src="/images/rory-curious.png" alt="" className="w-full h-full object-contain" draggable={false} />
      </div>
      <div
        className="bg-white border border-border/60 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5 shadow-sm"
        aria-label="Rory is typing"
        role="status"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-2 h-2 rounded-full bg-accent-orange/60"
            variants={typingIndicatorVariants}
            animate="animate"
            style={{ animationDelay: `${i * 0.15}s` }}
            transition={{
              y: [0, -5, 0],
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: i * 0.15,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
