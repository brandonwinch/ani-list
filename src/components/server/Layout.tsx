import { Flex, Container, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" minH="100vh">
      <Container flex="1" display="flex" as="main">
        {children}
      </Container>
      <Center
        borderTop="1px solid"
        borderColor="gray.200" py={4} mt={4}
        as="footer"
      >
        The Challenge: 3.5
      </Center>
    </Flex>
  )
}