import { getClient } from "@/ApolloClient";
import { ListItem } from "@/components/ui/ListItem";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { UserDetails } from "@/components/ui/UserDetails";
import { gql } from "@apollo/client";

const GET_ANIME = gql`
  query GetAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
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

export default async function Home({ searchParams }: { searchParams: { page?: string | string[] } }) {
  const { page } = await searchParams
  const parsedPage = Array.isArray(page) ? page[0] : page
  const pageNum = parsedPage ? parseInt(parsedPage, 10) : 1

  const { data } = await getClient().query({
    query: GET_ANIME,
    variables: {
      page: pageNum,
      perPage: 5
    },
  })

  const items = data?.Page?.media?.filter(Boolean)
  
  return (
    <>
      <UserDetails />
      <LogoutButton />
      <ul>
        {items.map(item => (
          <ListItem
            key={item.id}
            title={item.title.english || item.title.romaji || "Title not found."}
            imgSrc={item.coverImage.large}
          />
        ))}
      </ul>
    </>
  )
}