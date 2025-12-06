// User type (already defined in AuthContext, but re-export for convenience)
export interface User {
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  dob?: Date | string;
}

// Citation type for bot responses
export interface Citation {
  id: string;
  title: string;
  url: string;
  snippet?: string;
}

// Message type
export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'bot';
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

// Conversation type
export interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  lastMessageTime: Date;
  createdAt: Date;
  messageCount: number;
}
