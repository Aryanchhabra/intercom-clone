import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Intercom Clone',
  description: 'A modern clone of the Intercom chat interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
} 