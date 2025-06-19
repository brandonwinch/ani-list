import { COOKIE_KEY } from "@/constants"
import { Box, Text } from "@chakra-ui/react"
import { cookies } from "next/headers"

export const UserDetails = async () => {
  const cookieStore = await cookies()
  const loginInfo = cookieStore.get(COOKIE_KEY)
  
  if (!loginInfo) { return null }

  const parsedLoginInfo = JSON.parse(loginInfo.value)

  return (
    <Box>
      <Text fontWeight="bold">
        {parsedLoginInfo.user}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {parsedLoginInfo.job}
      </Text>
    </Box>
  )
}