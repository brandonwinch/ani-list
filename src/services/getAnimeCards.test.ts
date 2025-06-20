import { describe, it, expect, vi } from 'vitest'
import { getAnimeCards } from './getAnimeCards'

const mockQuery = vi.fn()
vi.mock('@/ApolloClient', () => ({
  getClient: vi.fn(() => ({ query: mockQuery }))
}))

describe('getAnimeCards()', () => {
  it('transform gql data to expected view model', async () => {
    mockQuery.mockResolvedValue({
      data: {
        Page: {
          pageInfo: { currentPage: 2, lastPage: 1, hasNextPage: true },
          media: [{
            id: 123,
            idMal: 456,
            episodes: 24,
            bannerImage: "banner.jpg",
            title: { english: "My Anime" },
            coverImage: { large: "cover.jpg" },
            streamingEpisodes: [
              { site: "Google", url: "https://www.google.com" }
            ],
          }],
        }
      },
      error: null
    })

    const result = await getAnimeCards(2, 6)

    expect(result.items).toEqual([
      {
        id: 123,
        idMal: 456,
        title: "My Anime",
        episodeCount: 24,
        imgSrc: "cover.jpg",
        bannerImgSrc: "banner.jpg",
        streamingEpisodes: [
          { site: "Google", url: "https://www.google.com" }
        ]
      },
    ])

    expect(result.pageInfo).toEqual({
      currentPage: 2,
      hasNextPage: true,
      lastPage: 1
    })
  })
})