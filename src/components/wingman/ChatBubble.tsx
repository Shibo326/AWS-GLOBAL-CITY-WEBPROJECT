'use client';

import { motion } from 'framer-motion';
import { chatBubbleVariants } from '@/components/animations/variants';
import type { ChatMessage } from '@/types';

interface ChatBubbleProps {
  message: ChatMessage;
}

/**
 * ChatBubble — Individual message bubble for the Wingman chat.
 * User messages: right-aligned with orange gradient tint, rounded with tail on right.
 * Wingman (Rory) messages: left-aligned with white surface, Rory avatar, rounded with tail on left.
 * Spring animation on entry via chatBubbleVariants.
 */
export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
      variants={chatBubbleVariants}
      initial="initial"
      animate="animate"
    >
      {/* Rory avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border border-accent-orange/30 shadow-sm"
          style={{ background: 'linear-gradient(135deg, #FF9900, #FBBF24)' }}
          aria-hidden="true"
        >
          <img
            src="/images/rory-curious.png"
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      )}

      <div
        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-accent-orange to-accent-warm text-white rounded-2xl rounded-br-md'
            : 'bg-white border border-border/60 text-primary-text rounded-2xl rounded-bl-md'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {/* Timestamp */}
        <span
          className={`block text-[10px] mt-1 font-mono ${
            isUser ? 'text-white/60 text-right' : 'text-secondary-text/60'
          }`}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

/** Format timestamp to HH:MM */
function formatTime(ts: number): string {
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
