"use client"

import { COOKIE_KEY } from '@/constants'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()

  const handleClick = () => {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0`

    router.push('/login')
  }

  return (
    <Button variant="outline" onClick={handleClick}>
      Logout
    </Button>
  )
}