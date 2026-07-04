'use client';

import { motion } from 'framer-motion';
import { chatBubbleVariants } from '@/components/animations/variants';
import type { ChatMessage } from '@/types';

interface ChatBubbleProps {
  message: ChatMessage;
}

/**
 * ChatBubble — Individual message bubble for the Wingman chat.
 * User messages are right-aligned with accent-blue tint.
 * Wingman (Rory) messages are left-aligned with surface bg and a small "R" avatar.
 * Spring animation on entry via chatBubbleVariants.
 */
export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      variants={chatBubbleVariants}
      initial="initial"
      animate="animate"
    >
      {/* Rory avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-orange text-background flex items-center justify-center text-xs font-bold mr-2 mt-1"
          aria-hidden="true"
        >
          R
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-accent-blue/10 text-primary-text'
            : 'bg-surface border border-border text-primary-text'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
