import { getClient } from "@/ApolloClient";
import { ListItem } from "@/components/ui/ListItem";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { UserDetails } from "@/components/ui/UserDetails";
import { gql } from "@apollo/client";
import { Link, Box, Button, Text, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";

const GET_ANIME = gql`
  query GetAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        total
        hasNextPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
          medium
          color
        }
      }
    }
  }
`

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const { page } = await searchParams
  const parsedPage = Array.isArray(page) ? page[0] : page
  const pageNum = parsedPage ? parseInt(parsedPage, 10) : 1

  const { data } = await getClient().query({
    query: GET_ANIME,
    variables: {
      page: pageNum,
      perPage: 6
    },
  })

  const { media, pageInfo } = data?.Page
  
  return (
    <Container maxW="800px">
      <Flex justify="space-between" my={6}>
        <UserDetails />
        <LogoutButton />
      </Flex>
      <SimpleGrid columns={{ sm: 2, md: 3 }} columnGap="2" rowGap="4">
        {/* @ts-expect-error: GQL not typed yet. */}
        {media.map(item => (
          <Box key={item.id}>
            <ListItem
              title={item.title.english || item.title.romaji || "Title not found."}
              imgSrc={item.coverImage.large}
            />
          </Box>
        ))}
      </SimpleGrid>

      <Flex justify="space-between" align="center" my={4}>
        <Link as={NextLink} href={`/?page=${pageNum - 1}`}>
          <Button disabled={pageInfo.currentPage === 1}>
            Prev
          </Button>
        </Link>
        <Text>Page {pageInfo.currentPage} of {pageInfo.total}</Text>
        <Link as={NextLink} href={`/?page=${pageNum + 1}`}>
          <Button disabled={!pageInfo.hasNextPage}>
            Next
          </Button>
        </Link>
      </Flex>
    </Container>
  )
}