'use server'

import { cookies } from 'next/headers'

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
      headers: {
        Cookie: `token=${token.value}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    const userData = await response.json()
    return userData
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

