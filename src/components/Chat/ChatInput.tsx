import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Send on Enter, new line on Shift+Enter
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t bg-background p-4">
            <div className="max-w-4xl mx-auto flex gap-2 items-end">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Đặt câu hỏi về y học..."
                    disabled={disabled}
                    className="min-h-[60px] max-h-[200px] resize-none"
                    rows={2}
                />
                <Button
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    size="icon"
                    className="h-[60px] w-[60px] rounded-xl flex-shrink-0"
                >
                    <Send className="h-5 w-5" />
                </Button>
            </div>
            <div className="max-w-4xl mx-auto mt-2 text-xs text-muted-foreground text-center">
                Nhấn Enter để gửi, Shift+Enter để xuống dòng
            </div>
        </div>
    );
};

export default ChatInput;
