import React from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface NewChatButtonProps {
    onClick: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            className="w-full"
            variant="default"
        >
            <Plus className="h-4 w-4 mr-2" />
            Cuộc trò chuyện mới
        </Button>
    );
};

export default NewChatButton;
