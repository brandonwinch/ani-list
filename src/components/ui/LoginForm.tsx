"use client"

import { COOKIE_KEY } from "@/constants"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

const MAX_COOKIE_LIFE = 86400 // 1 day

export const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const user = formData.get("user")
    const job = formData.get("job")

    if (user && job) {
      const encodedCookieValue = encodeURIComponent(JSON.stringify({
        user: user.toString(),
        job: job.toString()
      }))

      // set cookie
      document.cookie = `${COOKIE_KEY}=${encodedCookieValue}; path=/; max-age=${MAX_COOKIE_LIFE}`

      // reroute to login
      router.push('/')
    }
  }

  return (
    <form id="login" onSubmit={handleSubmit}>
      <label htmlFor="user">
        username
      </label>
      <input id="user" name="user" required />

      <label htmlFor="job">
        job title
      </label>
      <input id="job" name="job" required />

      <button type="submit">Login</button>
    </form>
  )
}