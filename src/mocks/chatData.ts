import type { Conversation, Message, Citation } from '../types/chat';

// Mock citations
export const mockCitations: Citation[] = [
    {
        id: 'cite-1',
        title: 'SPOKE Knowledge Graph - Diabetes',
        url: 'https://spoke.ucsf.edu/diseases/diabetes',
        snippet: 'Type 2 diabetes is a chronic condition affecting glucose metabolism...'
    },
    {
        id: 'cite-2',
        title: 'SPOKE - Metformin Drug Information',
        url: 'https://spoke.ucsf.edu/drugs/metformin',
        snippet: 'Metformin is a first-line medication for type 2 diabetes...'
    },
    {
        id: 'cite-3',
        title: 'SPOKE - Insulin Resistance',
        url: 'https://spoke.ucsf.edu/pathways/insulin-resistance',
        snippet: 'Insulin resistance occurs when cells fail to respond to insulin...'
    }
];

// Mock messages
export const mockMessages: Record<string, Message[]> = {
    'conv-1': [
        {
            id: 'msg-1',
            conversationId: 'conv-1',
            role: 'user',
            content: 'Bệnh đái tháo đường type 2 là gì?',
            timestamp: new Date('2024-11-30T10:00:00')
        },
        {
            id: 'msg-2',
            conversationId: 'conv-1',
            role: 'bot',
            content: 'Bệnh đái tháo đường type 2 là một rối loạn chuyển hóa mãn tính, đặc trưng bởi tình trạng tăng đường huyết do cơ thể không sản xuất đủ insulin hoặc không sử dụng insulin hiệu quả (kháng insulin).\n\nĐây là dạng phổ biến nhất của bệnh đái tháo đường, chiếm khoảng 90-95% các trường hợp. Bệnh thường phát triển ở người lớn tuổi, nhưng ngày càng nhiều trẻ em và thanh thiếu niên mắc bệnh do tỷ lệ béo phì gia tăng.',
            citations: [mockCitations[0], mockCitations[2]],
            timestamp: new Date('2024-11-30T10:00:15')
        },
        {
            id: 'msg-3',
            conversationId: 'conv-1',
            role: 'user',
            content: 'Thuốc điều trị chính là gì?',
            timestamp: new Date('2024-11-30T10:01:00')
        },
        {
            id: 'msg-4',
            conversationId: 'conv-1',
            role: 'bot',
            content: 'Metformin là thuốc điều trị đầu tay cho bệnh đái tháo đường type 2. Đây là thuốc thuộc nhóm biguanide, hoạt động bằng cách:\n\n1. Giảm sản xuất glucose ở gan\n2. Tăng độ nhạy cảm với insulin ở các mô\n3. Giảm hấp thu glucose ở ruột\n\nMetformin thường được kê đơn cùng với thay đổi lối sống (chế độ ăn và tập thể dục). Nếu Metformin đơn thuần không đủ kiểm soát đường huyết, bác sĩ có thể kết hợp thêm các thuốc khác như sulfonylureas, DPP-4 inhibitors, hoặc insulin.',
            citations: [mockCitations[1]],
            timestamp: new Date('2024-11-30T10:01:20')
        }
    ],
    'conv-2': [
        {
            id: 'msg-5',
            conversationId: 'conv-2',
            role: 'user',
            content: 'Triệu chứng của bệnh cao huyết áp là gì?',
            timestamp: new Date('2024-11-29T14:30:00')
        },
        {
            id: 'msg-6',
            conversationId: 'conv-2',
            role: 'bot',
            content: 'Cao huyết áp thường được gọi là "kẻ giết người thầm lặng" vì nhiều người không có triệu chứng rõ ràng. Tuy nhiên, một số triệu chứng có thể bao gồm:\n\n- Đau đầu (đặc biệt vào buổi sáng)\n- Chóng mặt\n- Mờ mắt\n- Đau ngực\n- Khó thở\n- Chảy máu cam\n\nĐo huyết áp định kỳ là cách tốt nhất để phát hiện bệnh sớm.',
            timestamp: new Date('2024-11-29T14:30:25')
        }
    ],
    'conv-3': [
        {
            id: 'msg-7',
            conversationId: 'conv-3',
            role: 'user',
            content: 'Chào bạn!',
            timestamp: new Date('2024-11-28T09:15:00')
        },
        {
            id: 'msg-8',
            conversationId: 'conv-3',
            role: 'bot',
            content: 'Xin chào! Tôi là trợ lý y tế AI, được hỗ trợ bởi SPOKE Knowledge Graph. Tôi có thể giúp bạn tìm hiểu về các bệnh lý, thuốc men, và kiến thức y học. Bạn cần tư vấn về vấn đề gì?',
            timestamp: new Date('2024-11-28T09:15:05')
        }
    ]
};

// Mock conversations
export const mockConversations: Conversation[] = [
    {
        id: 'conv-1',
        title: 'Bệnh đái tháo đường type 2',
        lastMessage: 'Metformin là thuốc điều trị đầu tay cho bệnh đái tháo đường type 2...',
        lastMessageTime: new Date('2024-11-30T10:01:20'),
        createdAt: new Date('2024-11-30T10:00:00'),
        messageCount: 4
    },
    {
        id: 'conv-2',
        title: 'Triệu chứng cao huyết áp',
        lastMessage: 'Cao huyết áp thường được gọi là "kẻ giết người thầm lặng"...',
        lastMessageTime: new Date('2024-11-29T14:30:25'),
        createdAt: new Date('2024-11-29T14:30:00'),
        messageCount: 2
    },
    {
        id: 'conv-3',
        title: 'Chào mừng',
        lastMessage: 'Xin chào! Tôi là trợ lý y tế AI...',
        lastMessageTime: new Date('2024-11-28T09:15:05'),
        createdAt: new Date('2024-11-28T09:15:00'),
        messageCount: 2
    }
];
