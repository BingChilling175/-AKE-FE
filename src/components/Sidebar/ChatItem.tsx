import React from 'react';
import type { Conversation } from '../../types/chat';
import { MessageSquare, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatItemProps {
    conversation: Conversation;
    isActive: boolean;
    onClick: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ conversation, isActive, onClick }) => {
    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            return new Date(date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        } else if (days === 1) {
            return 'Hôm qua';
        } else if (days < 7) {
            return `${days} ngày trước`;
        } else {
            return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
        }
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full text-left px-3 py-3 rounded-lg transition-colors group",
                isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
            )}
        >
            <div className="flex items-start gap-3">
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                    <MessageSquare className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-medium text-sm truncate">
                            {conversation.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(conversation.lastMessageTime)}</span>
                        </div>
                    </div>

                    {conversation.lastMessage && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {conversation.lastMessage}
                        </p>
                    )}
                </div>
            </div>
        </button>
    );
};

export default ChatItem;
