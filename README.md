# Intercom Admin Panel Replica

A functional replica of the Intercom admin panel built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**[View Live Demo →](https://intercom-clone-umber.vercel.app/)**

## How This Project Was Made

### 1. Project Setup
Started with Next.js 14 using the App Router and TypeScript for type safety. Added Tailwind CSS for styling and Heroicons for consistent iconography.

```bash
npx create-next-app@latest intercom-replica --typescript --tailwind --app
npm install @heroicons/react clsx
```

### 2. Layout Architecture
Created a three-panel layout mimicking Intercom's interface:
- **Left Panel**: Conversation sidebar with search and filtering
- **Center Panel**: Message conversation view with chat interface  
- **Right Panel**: AI assistant with suggestions and customer details

### 3. Component Structure
Built modular components for maintainability:

```
components/
├── IntercomApp.tsx      # Main container with state management
├── Sidebar.tsx          # Conversation list with search/filter
├── ConversationPanel.tsx # Chat interface with messaging
├── AssistantPanel.tsx   # AI assistant panel
└── ConversationItem.tsx # Individual conversation items
```

### 4. State Management
Used React's built-in hooks for state management:
- `useState` for component-level state (active conversation, search queries, messages)
- `useEffect` for side effects (auto-scroll, simulated responses)
- Shared constants file for mock data and types

### 5. Key Features Implemented

**Real-time Messaging Simulation:**
- Dynamic conversation switching
- Message status tracking (sending → sent → seen)
- Typing indicators with animated dots
- Auto-scroll to new messages

**Search & Filtering:**
- Live search across conversations, names, and companies
- Filter buttons (All/Open/Waiting) with dynamic count badges
- Empty states for no results

**Mobile Responsiveness:**
- Slide-out sidebars for mobile devices
- Touch-friendly button sizes
- Responsive typography and spacing
- Mobile navigation header

**AI Assistant:**
- Interactive suggestion buttons with contextual responses
- Customer details tab with mock order history
- Feedback system for AI responses

### 6. Styling Approach
Used Tailwind CSS utility classes with custom animations:

```css
/* Custom animations in globals.css */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### 7. Mock Data Structure
Created realistic mock data in `lib/constants.ts`:

```typescript
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
  // ... more conversations
]
```

### 8. TypeScript Integration
Defined proper types for all data structures:

```typescript
type Message = {
  id: string
  sender: 'customer' | 'agent'
  text: string
  timestamp: string
  status?: 'sending' | 'sent' | 'seen'
}
```

### 9. Responsive Design Implementation
Made the layout work on all screen sizes:
- Desktop: Three-panel layout side by side
- Tablet: Collapsible right panel
- Mobile: Stack panels with slide-out navigation

### 10. Animation & Interaction Details
Added micro-interactions for better UX:
- Conversation item hover effects
- Message bubble animations
- Loading states with spinners
- Staggered list animations

## Tech Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Consistent icon library
- **React Hooks** - State management

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Key Learning Points
- Component composition and state management in React
- Responsive design with Tailwind CSS
- TypeScript for large React applications
- Animation and micro-interaction implementation
- Mobile-first responsive design principles

This project demonstrates modern React development practices with a focus on clean code, responsive design, and user experience. 