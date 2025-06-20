import NextLink from "next/link"
import { Link, Box, Button, Text, Container, Flex, SimpleGrid, Center } from "@chakra-ui/react"
import { AnimeCard } from "@/components/server/AnimeCard"
import { LogoutButton } from "@/components/ui/LogoutButton"
import { UserDetails } from "@/components/server/UserDetails"
import { getAnimeCards } from "@/services/getAnimeCards"

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const { page } = await searchParams
  const parsedPage = Array.isArray(page) ? page[0] : page
  const pageNum = parsedPage ? parseInt(parsedPage, 10) : 1

  const { items, pageInfo, error } = await getAnimeCards(pageNum)

  if (error) {
    return (
      <Container maxW="800px">
        <Flex justify="space-between" my={6}>
          <UserDetails />
          <LogoutButton />
        </Flex>
        <Center>
          There was an error! Please refresh and try again.
        </Center>
      </Container>
    )
  }

  if (!items.length) {
    return (
      <Container maxW="800px">
        <Flex justify="space-between" my={6}>
          <UserDetails />
          <LogoutButton />
        </Flex>
        <Center>
          No results!
        </Center>
      </Container>
    )
  }
  
  return (
    <Container maxW="800px">
      <Flex justify="space-between" my={6}>
        <UserDetails />
        <LogoutButton />
      </Flex>
      <SimpleGrid columns={{ sm: 2, md: 3 }} columnGap="2" rowGap="4" as="ul">
        {items.map(item => (
          <Box as="li" key={item.id} listStyleType="none">
            <AnimeCard {...item} />
          </Box>
        ))}
      </SimpleGrid>
      <Flex justify="space-between" align="center" my={4}>
        <Link as={NextLink} href={`/?page=${pageNum - 1}`}>
          <Button disabled={pageInfo.currentPage === 1}>
            Prev
          </Button>
        </Link>
        <Text>Page {pageInfo.currentPage} of {pageInfo.lastPage}</Text>
        <Link as={NextLink} href={`/?page=${pageNum + 1}`}>
          <Button disabled={!pageInfo.hasNextPage}>
            Next
          </Button>
        </Link>
      </Flex>      
    </Container>
  )
}