'use client'

import { COOKIE_KEY } from "@/constants"
import { useEffect, useState } from "react"

export const UserDetails = () => {
  const [loginInfo, setLoginInfo] = useState<{ user: string; job: string } | null>(null)

  useEffect(() => {
    // get raw cookie data
    const cookieData = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_KEY}=`))

    if (cookieData) {
      const value = decodeURIComponent(cookieData.split('=')[1])
      const parsed = JSON.parse(value)
      setLoginInfo(parsed)
    }
  }, [])

  if (!loginInfo) { return null }

  return (
    <div>
      <p>{loginInfo.user}</p>
      <p>{loginInfo.job}</p>
    </div>
  )
}