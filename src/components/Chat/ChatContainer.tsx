import React, { useEffect, useRef } from 'react';
import type { Message } from '../../types/chat';
import ChatMessage from './ChatMessage';
import { Skeleton } from '../ui/skeleton';

interface ChatContainerProps {
    messages: Message[];
    isLoading?: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading = false }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div className="flex-1 flex flex-col overflow-hidden relative">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 scroll-smooth"
            >
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.length === 0 && !isLoading ? (
                        // Empty state
                        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                            <div className="text-6xl mb-4">💬</div>
                            <h2 className="text-2xl font-semibold mb-2">Bắt đầu cuộc trò chuyện</h2>
                            <p className="text-muted-foreground max-w-md">
                                Hỏi tôi bất kỳ câu hỏi nào về y học. Tôi sẽ sử dụng SPOKE Knowledge Graph để cung cấp thông tin chính xác.
                            </p>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <div className="flex gap-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs flex-shrink-0">
                                        AI
                                    </div>
                                    <div className="flex flex-col gap-2 max-w-[80%]">
                                        <Skeleton className="h-4 w-[250px]" />
                                        <Skeleton className="h-4 w-[300px]" />
                                        <Skeleton className="h-4 w-[200px]" />
                                    </div>
                                </div>
                            )}
                            <div id="scroll-anchor" className="h-1" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;
