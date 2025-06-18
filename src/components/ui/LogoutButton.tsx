"use client"

import { COOKIE_KEY } from '@/constants'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()

  const handleClick = () => {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0`

    router.push('/login')
  }

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  )
}