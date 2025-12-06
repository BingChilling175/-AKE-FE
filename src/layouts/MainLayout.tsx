import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '../components/ui/sidebar';
import SearchChat from '../components/Sidebar/SearchChat';
import { MessageSquare, Clock, Plus, Trash2 } from 'lucide-react';
import { ModeToggle } from '../components/ui/mode-toggle';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../components/ui/alert-dialog";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, logout } = useAuth();
    const {
        conversations,
        currentConversation,
        setCurrentConversation,
        createNewConversation,
        searchConversations,
        deleteConversation
    } = useChat();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleNewChat = () => {
        createNewConversation();
    };

    const displayName = user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.username || 'User';

    const userInitial = displayName.charAt(0).toUpperCase();

    // Filter conversations based on search
    const filteredConversations = searchQuery
        ? searchConversations(searchQuery)
        : conversations;

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            return new Date(date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        } else if (days === 1) {
            return 'Hôm qua';
        } else if (days < 7) {
            return `${days} ngày`;
        } else {
            return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
        }
    };

    return (
        <>
            <Sidebar collapsible="icon">
                <SidebarHeader className="border-b p-4">
                    <div className="flex items-center gap-2 px-2">
                        <MessageSquare className="h-6 w-6" />
                        <span className="font-bold text-xl group-data-[collapsible=icon]:hidden">
                            AKE Chat
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    {/* User Info */}
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        size="lg"
                                        onClick={() => navigate('/profile')}
                                        tooltip="Hồ sơ cá nhân"
                                    >
                                        <Avatar className="h-8 w-8">
                                            {user?.avatar ? (
                                                <AvatarImage src={user.avatar} alt={displayName} />
                                            ) : null}
                                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                                {userInitial}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col gap-0.5 text-left group-data-[collapsible=icon]:hidden">
                                            <span className="font-medium text-sm truncate">
                                                {displayName}
                                            </span>
                                            <span className="text-xs text-muted-foreground truncate">
                                                {user?.email || '@' + user?.username}
                                            </span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* New Chat Button */}
                    <SidebarGroup>
                        <SidebarGroupContent className="px-2">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={handleNewChat}
                                        tooltip="Cuộc trò chuyện mới"
                                        className="w-full"
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            Cuộc trò chuyện mới
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Search */}
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarGroupContent className="px-2">
                            <SearchChat onSearch={handleSearch} />
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Chat List */}
                    <SidebarGroup>
                        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
                            Lịch sử chat
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {filteredConversations.length === 0 ? (
                                    <div className="px-2 py-4 text-center text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                                        Chưa có cuộc trò chuyện
                                    </div>
                                ) : (
                                    filteredConversations.map((conversation) => (
                                        <SidebarMenuItem key={conversation.id}>
                                            <SidebarMenuButton
                                                onClick={() => setCurrentConversation(conversation.id)}
                                                isActive={conversation.id === currentConversation?.id}
                                                className="w-full group/item"
                                                tooltip={conversation.title}
                                            >
                                                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                                                <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                                        <span className="font-medium text-sm truncate">
                                                            {conversation.title}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0">
                                                            <Clock className="h-3 w-3" />
                                                            {formatTime(conversation.lastMessageTime)}
                                                        </span>
                                                    </div>
                                                    {conversation.lastMessage && (
                                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                                            {conversation.lastMessage}
                                                        </p>
                                                    )}
                                                </div>
                                                <div
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity group-data-[collapsible=icon]:hidden"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setConversationToDelete(conversation.id);
                                                    }}
                                                >
                                                    <div className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md cursor-pointer">
                                                        <Trash2 className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="border-t p-4">
                    <div className="flex flex-col gap-2">
                        <ModeToggle />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="w-full"
                        >
                            <span className="group-data-[collapsible=icon]:hidden">Đăng xuất</span>
                            <span className="hidden group-data-[collapsible=icon]:inline">⎋</span>
                        </Button>
                    </div>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset>
                <header className="flex h-14 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                    <div className="flex-1" />
                </header>
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </SidebarInset>

            <AlertDialog open={!!conversationToDelete} onOpenChange={(open) => !open && setConversationToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Hành động này không thể hoàn tác. Cuộc trò chuyện này sẽ bị xóa vĩnh viễn khỏi lịch sử của bạn.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => {
                                if (conversationToDelete) {
                                    deleteConversation(conversationToDelete);
                                    setConversationToDelete(null);
                                }
                            }}
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default MainLayout;
