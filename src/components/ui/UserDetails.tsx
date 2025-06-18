import { COOKIE_KEY } from "@/constants"
import { cookies } from "next/headers"

export const UserDetails = async () => {
  const cookieStore = await cookies()
  const loginInfo = cookieStore.get(COOKIE_KEY)
  
  if (!loginInfo) { return null }

  const parsedLoginInfo = JSON.parse(loginInfo.value)

  return (
    <div>
      <p>{parsedLoginInfo.user}</p>
      <p>{parsedLoginInfo.job}</p>
    </div>
  )
}