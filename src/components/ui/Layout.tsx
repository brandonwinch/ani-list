'use client'

import { Flex, Container, Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" minH="100vh">
      <Container flex="1" display="flex">
        {children}
      </Container>
      <Box as="footer">
        The Challenge: 3.5
      </Box>
    </Flex>
  )
}