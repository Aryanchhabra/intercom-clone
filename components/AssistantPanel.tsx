'use client'

import { useState } from 'react'
import { suggestions } from '@/lib/constants'

export default function AssistantPanel({ onClose }: { onClose?: () => void }) {
  const [question, setQuestion] = useState('')
  const [activeTab, setActiveTab] = useState('copilot')
  const [isLoading, setIsLoading] = useState(false)
  const [lastResponse, setLastResponse] = useState<string | null>(null)
  
  const handleAskQuestion = async (questionText?: string) => {
    const finalQuestion = questionText || question.trim()
    if (!finalQuestion) return

    setIsLoading(true)
    setQuestion('')

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'How do I get a refund?': 'I can help you with refunds! For unopened items purchased within 30 days, you can request a full refund. Would you like me to start the refund process?',
        'Track my order status': 'I can help you track your order. Please provide your order number and I\'ll get the latest status for you.',
        'Exchange or return policy': 'Our return policy allows returns within 30 days of purchase. Items must be in original condition. Would you like more details?',
        'Speak to a human agent': 'I\'ll connect you with a human agent right away. Please hold while I transfer your conversation.',
        'Schedule a callback': 'I can schedule a callback for you. What time would work best for you today or tomorrow?'
      }

      const response = responses[finalQuestion] || 
        `I understand you're asking about "${finalQuestion}". Let me help you with that. Based on the conversation, I can see this relates to your inquiry. Would you like me to provide more specific guidance?`
      
      setLastResponse(response)
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAskQuestion()
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50" style={{
      background: 'linear-gradient(135deg, #fafbff 0%, #f5f7ff 100%)'
    }}>
      {/* Header tabs */}
      <div className="flex border-b border-gray-200 h-16 items-center px-4">
        <button 
          className={`px-0 py-4 text-sm font-medium flex items-center relative transition-colors ${activeTab === 'copilot' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('copilot')}
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" x="4" y="4" rx="2" fill="currentColor" />
            <path d="M9 14C9.5 15 10.5 16 12 16C13.5 16 14.5 15 15 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="9" cy="10" r="1.25" fill="white" />
            <circle cx="15" cy="10" r="1.25" fill="white" />
          </svg>
          AI Copilot
          {activeTab === 'copilot' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          )}
        </button>
        <button 
          className={`px-4 py-4 text-sm font-medium relative transition-colors ${activeTab === 'details' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('details')}
        >
          Details
          {activeTab === 'details' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          )}
        </button>
        <div className="flex-1"></div>
        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700 transition-colors ml-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'copilot' ? (
          <div className="flex-1 flex flex-col">
            {lastResponse ? (
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect width="16" height="16" x="4" y="4" rx="2" />
                      <path d="M9 14C9.5 15 10.5 16 12 16C13.5 16 14.5 15 15 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="9" cy="10" r="1.25" fill="white" />
                      <circle cx="15" cy="10" r="1.25" fill="white" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {lastResponse}
                      </p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        👍 Helpful
                      </button>
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        👎 Not helpful
                      </button>
                      <button 
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        onClick={() => setLastResponse(null)}
                      >
                        ✕ Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gray-900 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect width="16" height="16" x="4" y="4" rx="2" fill="currentColor" />
                      <path d="M9 14C9.5 15 10.5 16 12 16C13.5 16 14.5 15 15 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="9" cy="10" r="1.25" fill="white" />
                      <circle cx="15" cy="10" r="1.25" fill="white" />
                    </svg>
                  </div>
                  <div className="font-semibold text-lg text-gray-800">Hi, I'm Fin AI Copilot</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Ask me anything about this conversation.
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 p-4 space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-900">luis@github.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-900">San Francisco, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer since:</span>
                  <span className="text-gray-900">Nov 2023</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Order History</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last order:</span>
                  <span className="text-gray-900">#ORD-1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total orders:</span>
                  <span className="text-gray-900">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total spent:</span>
                  <span className="text-gray-900">$247.50</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom section with Suggested and Input */}
        <div className="border-t border-gray-200 bg-white bg-opacity-90 p-4 mt-auto">
          {activeTab === 'copilot' && (
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-2 font-medium">Suggested</div>
              <div className="space-y-2">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <button 
                    key={index}
                    className="block w-full text-left border border-gray-300 rounded-full px-4 py-2.5 text-sm bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.01]"
                    onClick={() => handleAskQuestion(suggestion.text)}
                    disabled={isLoading}
                  >
                    <span className="mr-2">{suggestion.icon}</span>{suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-full">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={activeTab === 'copilot' ? "Ask a question..." : "Search details..."}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-full px-4 py-2.5 pr-10 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm disabled:opacity-50 transition-all duration-200"
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
              onClick={() => handleAskQuestion()}
              disabled={isLoading || !question.trim()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 