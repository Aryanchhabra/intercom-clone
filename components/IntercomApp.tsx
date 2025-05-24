'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import ConversationPanel from './ConversationPanel'
import AssistantPanel from './AssistantPanel'

export default function IntercomApp() {
  const [activeConversation, setActiveConversation] = useState('luis')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isMobileAssistantOpen, setIsMobileAssistantOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white relative">
      {/* Mobile Overlay */}
      {(isMobileSidebarOpen || isMobileAssistantOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            setIsMobileSidebarOpen(false)
            setIsMobileAssistantOpen(false)
          }}
        />
      )}

      {/* Left sidebar - Inbox */}
      <div className={`
        w-72 flex-shrink-0 border-r border-gray-200 z-50 bg-white
        lg:relative lg:translate-x-0
        fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          activeConversation={activeConversation} 
          setActiveConversation={(id) => {
            setActiveConversation(id)
            setIsMobileSidebarOpen(false) // Close sidebar on mobile after selection
          }}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Main conversation area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="flex lg:hidden items-center justify-between p-4 border-b border-gray-200 bg-white">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h1 className="text-lg font-semibold text-gray-900">Intercom</h1>
          
          <button
            onClick={() => setIsMobileAssistantOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <ConversationPanel conversationId={activeConversation} />
      </div>

      {/* Right sidebar - AI Assistant */}
      <div className={`
        w-80 flex-shrink-0 border-l border-gray-200 z-50 bg-white
        lg:relative lg:translate-x-0
        fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out
        ${isMobileAssistantOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        hidden lg:block
        ${isMobileAssistantOpen ? '!block' : ''}
      `}>
        <AssistantPanel onClose={() => setIsMobileAssistantOpen(false)} />
      </div>
    </div>
  )
} 