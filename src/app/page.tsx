import NextLink from "next/link"
import { PropsWithChildren } from "react"
import { Link, Box, Text, Container, Flex, SimpleGrid, Center } from "@chakra-ui/react"
import { AnimeCard } from "@/components/server/AnimeCard"
import { LogoutButton } from "@/components/ui/LogoutButton"
import { UserDetails } from "@/components/server/UserDetails"
import { getAnimeCards } from "@/services/getAnimeCards"

export const metadata = {
  title: "The Challenge - Information",
  description: "The information page of The Challenge.",
}

const InvalidState = ({ children }: PropsWithChildren) => {
  return (
    <Container maxW="800px">
      <Flex justify="space-between" my={6} as="header">
        <UserDetails />
        <LogoutButton />
      </Flex>
      <Center>
        {children}
      </Center>
    </Container>
  )
}

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const { page } = await searchParams
  const parsedPage = Array.isArray(page) ? page[0] : page
  const pageNum = parsedPage ? parseInt(parsedPage, 10) : 1

  const { items, pageInfo, error } = await getAnimeCards(pageNum)

  if (error) {
    return (
      <InvalidState>
        There was an error! Please refresh and try again.
      </InvalidState>
    )
  }

  if (!items.length) {
    return (
      <InvalidState>
        No results!
      </InvalidState>
    )
  }
  
  return (
    <Container maxW="800px">
      <Flex justify="space-between" my={6} as="header">
        <UserDetails />
        <LogoutButton />
      </Flex>
      {/* @note: This needs some sort of Suspense to help with a loading state, but I
                 was unable to get it working without a hydration error occuring from
                 chakra-ui. I'm not familiar enough with this component library to solve
                 the issue in a take-home, but in a prod app, a loading skeleton would
                 be appearing here.
      */}
      <SimpleGrid columns={{ sm: 2, md: 3 }} columnGap="2" rowGap="4" as="ul">
        {items.map(item => (
          <Box as="li" key={item.id} listStyleType="none">
            <AnimeCard {...item} />
          </Box>
        ))}
      </SimpleGrid>
      <Flex justify="space-between" align="center" my={4} as="nav">
        <Link as={NextLink} href={`/?page=${pageNum - 1}`} aria-label="Previous page">
          Prev
        </Link>
        <Text>Page {pageInfo.currentPage} of {pageInfo.lastPage}</Text>
        <Link as={NextLink} href={`/?page=${pageNum + 1}`} aria-label="Next page">
          Next
        </Link>
      </Flex>      
    </Container>
  )
}