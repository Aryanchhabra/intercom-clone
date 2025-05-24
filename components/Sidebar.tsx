'use client'

import { useState } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { conversations } from '@/lib/constants'
import ConversationItem from './ConversationItem'

type SidebarProps = {
  activeConversation: string
  setActiveConversation: (id: string) => void
  onClose?: () => void
}

export default function Sidebar({ activeConversation, setActiveConversation, onClose }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'waiting'>('all')

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (conv.company && conv.company.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'open' && conv.isUnread) ||
                         (filterStatus === 'waiting' && (conv.unreadCount || 0) > 0)
    
    return matchesSearch && matchesFilter
  })

  const totalUnread = conversations.filter(c => c.isUnread).length
  const totalWaiting = conversations.filter(c => (c.unreadCount || 0) > 0).length

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 h-16 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-semibold text-gray-900">Your inbox</h1>
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            className={`flex items-center text-sm font-medium transition-colors ${filterStatus === 'open' ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'}`}
            onClick={() => setFilterStatus(filterStatus === 'open' ? 'all' : 'open')}
          >
            <span>{totalUnread} Open</span>
            <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
            {totalUnread > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {totalUnread}
              </span>
            )}
          </button>
          
          <button 
            className={`flex items-center text-sm font-medium transition-colors ${filterStatus === 'waiting' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setFilterStatus(filterStatus === 'waiting' ? 'all' : 'waiting')}
          >
            <span>Waiting longest</span>
            <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
            {totalWaiting > 0 && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {totalWaiting}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter status indicator */}
      {(filterStatus !== 'all' || searchQuery) && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {searchQuery && `Searching for "${searchQuery}" • `}
              {filteredConversations.length} conversation{filteredConversations.length !== 1 ? 's' : ''} found
            </span>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilterStatus('all')
              }}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation, index) => (
            <div
              key={conversation.id}
              className="fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ConversationItem
                conversation={conversation}
                isActive={activeConversation === conversation.id}
                onClick={() => setActiveConversation(conversation.id)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-center p-4">
            <div className="text-gray-400 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">No conversations found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Quick actions footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New conversation
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 