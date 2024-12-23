'use client'

import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked')
  }

  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

