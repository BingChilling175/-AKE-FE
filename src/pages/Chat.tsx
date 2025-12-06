import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from '../components/Chat/ChatContainer';
import ChatInput from '../components/Chat/ChatInput';

export default function ChatPage() {
    const { user } = useAuth();
    const { messages, isLoading, sendMessage, currentConversation, conversations, setCurrentConversation } = useChat();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
    }, [user, navigate]);

    // Auto-select first conversation if none selected
    useEffect(() => {
        if (!currentConversation && conversations.length > 0) {
            setCurrentConversation(conversations[0].id);
        }
    }, [currentConversation, conversations, setCurrentConversation]);

    if (!user) return null;

    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col">
                <ChatContainer messages={messages} isLoading={isLoading} />
                <ChatInput onSend={sendMessage} disabled={isLoading} />
            </div>
        </MainLayout>
    );
}
