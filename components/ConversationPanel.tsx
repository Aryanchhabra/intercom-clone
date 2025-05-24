'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { Message, ConversationData, conversationsData } from '@/lib/constants'

type ConversationPanelProps = {
  conversationId: string
}

export default function ConversationPanel({ conversationId }: ConversationPanelProps) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentConversation = conversationsData[conversationId]

  useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages)
    }
  }, [conversationId, currentConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'agent',
      text: message.trim(),
      timestamp: 'now',
      status: 'sending'
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
    setIsTyping(true)

    // Simulate message sending
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      )
    }, 500)

    // Simulate customer response for demo
    setTimeout(() => {
      const responses = [
        "Thank you for helping me with this!",
        "That sounds great, I appreciate your assistance.",
        "Perfect, that resolves my issue.",
        "Could you provide more details on that?",
        "I understand, thank you for clarifying."
      ]
      
      const customerResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'customer',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: 'now',
        status: 'seen'
      }

      setMessages(prev => [...prev, customerResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!currentConversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
          <p className="text-gray-500">Select a conversation from the sidebar to start messaging.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Conversation header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 h-16">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{currentConversation.name}</h2>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 lg:space-x-3">
          <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </button>
          <button className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="px-2 lg:px-3 py-1.5 bg-gray-900 text-white text-xs lg:text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Close
          </button>
        </div>
      </div>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          {messages.map((msg, index) => (
            <div key={msg.id} className={`fade-in ${index === messages.length - 1 ? 'slide-in' : ''}`}>
              {msg.sender === 'customer' ? (
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 mr-3">
                    {currentConversation.avatar}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 lg:px-4 py-2 lg:py-3 max-w-xs lg:max-w-lg">
                      <p className="text-sm text-gray-800 leading-relaxed break-words">
                        {msg.text}
                      </p>
                    </div>
                    <div className="mt-1 ml-1">
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-end">
                  <div className="flex flex-col items-end flex-1 min-w-0">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tr-sm px-3 lg:px-4 py-2 lg:py-3 max-w-xs lg:max-w-lg">
                      <p className="text-sm text-gray-800 leading-relaxed break-words">
                        {msg.text}
                      </p>
                    </div>
                    <div className="mt-1 mr-1 flex items-center">
                      <span className="text-xs text-gray-500">
                        {msg.status === 'sending' ? 'Sending...' : 
                         msg.status === 'sent' ? 'Sent' : 
                         `Seen · ${msg.timestamp}`}
                      </span>
                      {msg.status === 'sending' && (
                        <div className="ml-2 w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ml-3 flex-shrink-0">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Agent" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start fade-in">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 mr-3">
                {currentConversation.avatar}
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 lg:px-4 py-2 lg:py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat composition area */}
      <div className="border-t border-gray-200 bg-white">
        {/* Top toolbar */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
          <div className="flex items-center">
            <button className="flex items-center text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1"/>
                <circle cx="8" cy="12" r="1" fill="#4B5563"/>
                <circle cx="12" cy="12" r="1" fill="#4B5563"/>
                <circle cx="16" cy="12" r="1" fill="#4B5563"/>
              </svg>
              <span className="hidden sm:inline">Chat</span>
              <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors" title="Quick Reply">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="hidden sm:block p-1 text-gray-500 hover:text-gray-700 transition-colors" title="Add Note">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 12H16M8 8H16M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="hidden sm:block p-1 text-gray-500 hover:text-gray-700 transition-colors" title="More Actions">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
          
          <div>
            <button className="flex items-center text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors">
              <span className="hidden sm:inline">Send</span>
              <span className="sm:hidden text-xs">Send</span>
              <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Message input area */}
        <div className="p-3 lg:p-4">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full border border-gray-300 rounded-lg px-3 lg:px-4 py-2 lg:py-3 pr-12 lg:pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm leading-relaxed transition-all duration-200 h-16 lg:h-20"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="absolute bottom-2 lg:bottom-3 right-2 lg:right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 touch-manipulation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          {/* Formatting toolbar */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation" title="Bold">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12H18M6 6H18M6 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation" title="Italic">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H10M14 20H5M15 4L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation" title="Attach File">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59722 21.9983 8.00501 21.9983C6.4128 21.9983 4.88582 21.3658 3.76001 20.24C2.63419 19.1142 2.00171 17.5872 2.00171 15.995C2.00171 14.4028 2.63419 12.8758 3.76001 11.75L12.95 2.56C13.6242 1.8858 14.5384 1.50745 15.495 1.50745C16.4516 1.50745 17.3658 1.8858 18.04 2.56C18.7142 3.2342 19.0926 4.1484 19.0926 5.105C19.0926 6.0616 18.7142 6.9758 18.04 7.65L8.84001 16.84C8.50281 17.1772 8.04781 17.3665 7.57251 17.3665C7.09721 17.3665 6.64221 17.1772 6.30501 16.84C5.96781 16.5028 5.7785 16.0478 5.7785 15.5725C5.7785 15.0972 5.96781 14.6422 6.30501 14.305L15.07 5.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation" title="Emoji">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="9" cy="9" r="1" fill="currentColor"/>
                  <circle cx="15" cy="9" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            <div className="text-xs text-gray-500 flex items-center">
              <span className="hidden sm:inline">Use </span>
              <span className="bg-gray-200 px-1.5 py-0.5 rounded font-mono mx-1 text-xs">⌘K</span>
              <span className="hidden sm:inline"> for shortcuts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 