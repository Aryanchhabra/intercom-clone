export type Message = {
  id: string
  sender: 'customer' | 'agent'
  text: string
  timestamp: string
  status?: 'sending' | 'sent' | 'seen'
}

export type ConversationData = {
  id: string
  name: string
  avatar: string
  messages: Message[]
}

export type Conversation = {
  id: string
  name: string
  company?: string
  lastMessage: string
  timestamp: string
  isUnread: boolean
  unreadCount?: number
  isHighlighted?: boolean
  avatarColor: string
  avatarInitial: string
  isSystem?: boolean
  isForwarded?: boolean
}

// Mock conversation data for the chat interface
export const conversationsData: Record<string, ConversationData> = {
  luis: {
    id: 'luis',
    name: 'Luis Easton',
    avatar: 'L',
    messages: [
      {
        id: '1',
        sender: 'customer',
        text: 'I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you\'d be able to refund me, as it is un-opened.',
        timestamp: '1min',
        status: 'seen'
      },
      {
        id: '2',
        sender: 'agent',
        text: 'Let me just look into this for you, Luis.',
        timestamp: '1min',
        status: 'seen'
      }
    ]
  },
  ivan: {
    id: 'ivan',
    name: 'Team Hiker',
    avatar: 'T',
    messages: [
      {
        id: '1',
        sender: 'customer',
        text: 'Hi there, I have a question about my recent order. I ordered it about 1 month ago and I haven\'t opened the package yet.',
        timestamp: '2min',
        status: 'seen'
      }
    ]
  },
  lead: {
    id: 'lead',
    name: 'Lead from New York',
    avatar: 'L',
    messages: [
      {
        id: '1',
        sender: 'customer',
        text: 'Good morning, let me know if you have any availability for a quick call this week.',
        timestamp: '45m',
        status: 'seen'
      },
      {
        id: '2',
        sender: 'agent',
        text: 'Hello! I\'d be happy to schedule a call with you. What times work best?',
        timestamp: '40m',
        status: 'seen'
      }
    ]
  },
  system: {
    id: 'system',
    name: 'Booking API problems',
    avatar: 'B',
    messages: [
      {
        id: '1',
        sender: 'customer',
        text: 'Bug report: The booking API is returning 500 errors when trying to create new reservations.',
        timestamp: '45m',
        status: 'seen'
      }
    ]
  },
  forwarded: {
    id: 'forwarded',
    name: 'Miracle',
    avatar: 'M',
    messages: [
      {
        id: '1',
        sender: 'customer',
        text: 'Hey there, I\'m here to inquire about the services you offer. I was referred by a colleague.',
        timestamp: '45m',
        status: 'seen'
      }
    ]
  }
}

// Mock conversation list data for the sidebar
export const conversations: Conversation[] = [
  {
    id: 'luis',
    name: 'Luis',
    company: 'GitHub',
    lastMessage: 'I have a question...',
    timestamp: '44m',
    isUnread: false,
    avatarColor: 'purple',
    avatarInitial: 'L'
  },
  {
    id: 'ivan',
    name: 'Team Hiker',
    company: '',
    lastMessage: 'Hi there, I have a qu...',
    timestamp: '2min',
    isUnread: true,
    unreadCount: 2,
    isHighlighted: true,
    avatarColor: 'red',
    avatarInitial: 'T'
  },
  {
    id: 'lead',
    name: 'Lead from New York',
    company: '',
    lastMessage: 'Good morning, let me...',
    timestamp: '45m',
    isUnread: true,
    unreadCount: 1,
    avatarColor: 'purple',
    avatarInitial: 'L'
  },
  {
    id: 'system',
    name: 'Booking API problems',
    company: 'Small Crafts',
    lastMessage: 'Bug report',
    timestamp: '45m',
    isUnread: false,
    avatarColor: 'gray',
    avatarInitial: 'B',
    isSystem: true
  },
  {
    id: 'forwarded',
    name: 'Miracle',
    company: 'Exemplary Bank',
    lastMessage: "Hey there, I'm here to...",
    timestamp: '45m',
    isUnread: true,
    unreadCount: 3,
    avatarColor: 'gray',
    avatarInitial: 'M',
    isForwarded: true
  }
]

// AI Assistant suggestions
export type Suggestion = {
  icon: string
  text: string
  category: 'refund' | 'info' | 'support'
}

export const suggestions: Suggestion[] = [
  { icon: '💸', text: 'How do I get a refund?', category: 'refund' },
  { icon: '📦', text: 'Track my order status', category: 'info' },
  { icon: '🔄', text: 'Exchange or return policy', category: 'refund' },
  { icon: '💬', text: 'Speak to a human agent', category: 'support' },
  { icon: '📞', text: 'Schedule a callback', category: 'support' },
] 