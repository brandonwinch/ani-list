import { CloseButton, Dialog, Text, Image, Link, Stack } from "@chakra-ui/react"

type Props = {
  idMal: number
  title: string
  episodeCount: number
  imgSrc: string
  bannerImgSrc: string
  streamingEpisodes: { site: string; url: string }[]
}

export const AnimeCard = ({ title, idMal, episodeCount, imgSrc, bannerImgSrc, streamingEpisodes }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger w="full">
        <Image src={imgSrc} alt={title} h="320px" w="auto" mx="auto" />
        <Text fontWeight="bold" as="span">{title}</Text>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Stack>
              <Dialog.Title>{title}</Dialog.Title>
              <Image src={bannerImgSrc} alt={title} />
            </Stack>
          </Dialog.Header>
          <Dialog.Body>
            <Text>
              📺 <strong>{episodeCount}</strong> {`${episodeCount > 1 ? "episodes" : "episode"}`}.
            </Text>
            <Text>
              🔗 <strong>View</strong> on{' '}
              <Link href={`https://myanimelist.net/anime/${idMal}`} color="teal.500" target="__blank">
                MAL
              </Link>.
            </Text>
            <Text>
              🎬{' '}
              {streamingEpisodes.length
                ? <>
                    <strong>Watch</strong> the first episode on{' '}
                    <Link href={streamingEpisodes[0].url} color="teal.500" target="__blank">
                      {streamingEpisodes[0].site}
                    </Link>.
                  </>
                : <>
                    <strong>No</strong> episodes available to stream.
                  </>
              }
            </Text>
          </Dialog.Body>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}