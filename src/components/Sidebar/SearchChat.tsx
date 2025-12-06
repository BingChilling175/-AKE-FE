import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '../ui/button';

interface SearchChatProps {
    onSearch: (query: string) => void;
}

const SearchChat: React.FC<SearchChatProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={query}
                onChange={handleChange}
                className="pl-9 pr-9"
            />
            {query && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                >
                    <X className="h-3 w-3" />
                </Button>
            )}
        </div>
    );
};

export default SearchChat;
