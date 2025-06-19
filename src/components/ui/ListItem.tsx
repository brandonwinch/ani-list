"use client"

import { Button, CloseButton, Dialog, Text, Image } from "@chakra-ui/react"

type Props = {
  title: string
  imgSrc: string
}

export const ListItem = ({ title, imgSrc }: Props) => {
  return (
    <>
      <Image src={imgSrc} alt={title} h="320px" w="auto" mx="auto" />
      <Dialog.Root>
        <Dialog.Trigger w="full">
          <Text fontWeight="bold">{title}</Text>
        </Dialog.Trigger>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}