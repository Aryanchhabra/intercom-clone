'use client'

import { FC } from 'react'
import clsx from 'clsx'
import { Conversation } from '@/lib/constants'

type ConversationItemProps = {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
}

const ConversationItem: FC<ConversationItemProps> = ({ conversation, isActive, onClick }) => {
  const { id, name, company, lastMessage, timestamp, isUnread, unreadCount, isHighlighted, avatarColor, avatarInitial, isSystem, isForwarded } = conversation
  
  const getAvatarBgColor = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-500'
      case 'red':
        return 'bg-red-500'
      case 'gray':
        return 'bg-gray-600'
      default:
        return 'bg-gray-500'
    }
  }
  
  return (
    <div 
      onClick={onClick}
      className={clsx(
        'flex items-start px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-sm',
        isActive && 'bg-blue-50 border-r-2 border-blue-500'
      )}
    >
      <div className="relative mr-3 flex-shrink-0">
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full ${getAvatarBgColor(avatarColor)} flex items-center justify-center text-white text-sm font-semibold transition-transform duration-200 hover:scale-105`}>
          {isSystem ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          ) : isForwarded ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8V4l8 8-8 8v-4H4v-8z"/>
            </svg>
          ) : (
            avatarInitial
          )}
        </div>
        
        {isUnread && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex-1 min-w-0">
            <div className={clsx(
              'font-medium truncate text-sm transition-colors',
              isUnread ? 'text-gray-900' : 'text-gray-800',
              isActive && 'text-blue-900'
            )}>
              {name}
            </div>
            {company && (
              <div className="text-xs text-gray-500 truncate">{company}</div>
            )}
          </div>
          
          <div className="ml-2 flex-shrink-0 flex items-center">
            {unreadCount && unreadCount > 0 && (
              <span className="mr-2 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
            {isHighlighted ? (
              <div className="text-xs text-gray-900 bg-yellow-400 rounded-full px-2 py-1 font-semibold animate-pulse">
                {timestamp}
              </div>
            ) : (
              <div className="text-xs text-gray-500">{timestamp}</div>
            )}
          </div>
        </div>
        
        <div className={clsx(
          'text-sm truncate transition-colors',
          isUnread ? 'text-gray-700 font-medium' : 'text-gray-500'
        )}>
          {lastMessage}
        </div>
      </div>
    </div>
  )
}

export default ConversationItem 