"use client"

import { useRouter } from "next/navigation"
import { FormEvent } from "react"
import {
  Button,
  Center,
  Container,
  Field,
  Fieldset,
  Input,
} from "@chakra-ui/react"
import { COOKIE_KEY } from "@/constants"

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
      document.cookie = `${COOKIE_KEY}=${encodedCookieValue}; path=/; max-age=${86400}` // 1 day

      // reroute to login
      router.push('/')
    }
  }

  return (
    <Center flex="1">
      <Container maxW="600px">
        <form id="login" onSubmit={handleSubmit}>
          <Fieldset.Root size="lg">
            <Fieldset.Content>
              <Field.Root required>
                <Field.Label>User</Field.Label>
                <Input name="user" />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Job Title</Field.Label>
                <Input name="job" />
              </Field.Root>
            </Fieldset.Content>

            <Fieldset.ErrorText>
              Some fields are invalid. Please check them.
            </Fieldset.ErrorText>
            <Button type="submit">Login</Button>
          </Fieldset.Root>
        </form>
      </Container>
    </Center>
  )
}