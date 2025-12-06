import React from 'react';
import type { Conversation } from '../../types/chat';
import ChatItem from './ChatItem';
import { ScrollArea } from '../ui/scroll-area';

interface ChatListProps {
    conversations: Conversation[];
    currentConversationId: string | null;
    onSelectConversation: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
    conversations,
    currentConversationId,
    onSelectConversation
}) => {
    if (conversations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <p className="text-sm text-muted-foreground">
                    Chưa có cuộc trò chuyện nào
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    Bắt đầu chat mới để tư vấn y học
                </p>
            </div>
        );
    }

    return (
        <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 p-2">
                {conversations.map((conversation) => (
                    <ChatItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={conversation.id === currentConversationId}
                        onClick={() => onSelectConversation(conversation.id)}
                    />
                ))}
            </div>
        </ScrollArea>
    );
};

export default ChatList;
