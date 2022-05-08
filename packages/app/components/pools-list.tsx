import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  useColorModeValue,
  SimpleGrid,
  Image,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { useLocalObservable } from 'mobx-react-lite';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Tag,
  TagLabel,
  TagCloseButton,
  Input
} from '@chakra-ui/react'
import { store } from "../store/root";
import { ChainCoin, osmosis } from "../data/asset-list";
import { PoolsData, PoolsCard } from "./pools-card";

export default function ListPools({ pools, assets }: { pools: PoolsData[], assets: ChainCoin[] }) {

  const { poolStore, assetStore } = useLocalObservable(() => store);

  const [activeAssetIndex, setActiveAssetIndex] = useState<number[]>([0, 1])

  const [assetAddIndex, setAssetAddIndex] = useState(0)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const poolAdd = (index1: number, index2: number) => {
    if (assets.length < 2) {
      alert('at least two assets')
      return
    }
    poolStore.addPool(assets[index1], assets[index2])
  }

  const assetAdd = () => {
    assetStore.addAsset(osmosis.assets[assetAddIndex]);
    onClose()
  }

  const onAssetChange = (index: number) => {
    const activeAssetIndexArr = [...activeAssetIndex]
    activeAssetIndexArr.push(index)
    activeAssetIndexArr.shift()
    setActiveAssetIndex(activeAssetIndexArr)
  }

  const assetRemove = (asset: ChainCoin) => {
    assetStore.removeAsset(asset)
  }

  return <Box p={4}>
    <Flex align="center" mb={6}>
      <Heading as="h2" fontSize="2xl" mr={4}>
        Active Pools
        </Heading>
      <Button display={{ base: "none", sm: "block" }} onClick={() => {
        poolAdd(activeAssetIndex[0], activeAssetIndex[1])
      }}>Create New Pool</Button>
      <Button display={{ base: "none", sm: "block" }}
        colorScheme='teal'
        onClick={onOpen}>Create New Asset</Button>
      <Button display={{ base: "none", sm: "block" }}
        colorScheme='blue'
      >Click logo to update to first asset</Button>
    </Flex>
    <SimpleGrid columns={{ sm: 9 }} gap={4} mb={8}>
      {
        assets.map((i, index) => (
          <Box key={index} >
            <Checkbox
              onChange={() => {
                onAssetChange(index)
              }}
              isChecked={index === activeAssetIndex[0] || index === activeAssetIndex[1]}>
              {/* {i.name} */}
              <HStack spacing={4}>
                <Tag
                  borderRadius='full'
                  variant='solid'
                  colorScheme='green'
                >
                  <TagLabel>{i.name}</TagLabel>
                  <TagCloseButton onClick={() => assetRemove(i)} />
                </Tag>
              </HStack>
            </Checkbox>
            <Image src={i.logo_URIs.png} width={50} onClick={() => {
              assetStore.updateAsset(osmosis.assets[0], index)
            }} />
          </Box>
        ))
      }
    </SimpleGrid>
    <SimpleGrid columns={{ sm: 2 }} gap={4} maxW={{ sm: "md" }} mb={8}>
      <Box>
        <Text
          fontWeight="semibold"
          color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
          mb={1}
        >
          OSMO Price
          </Text>
        <Text fontSize="3xl" fontWeight="bold" py={2}>
          $4.41
          </Text>
      </Box>
      <Box>
        <Text
          fontWeight="semibold"
          color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
          mb={2}
        >
          Reward distribution on
          </Text>
        <Flex align="center">
          <Text fontSize="3xl" fontWeight="bold">
            12
            </Text>
          <Box
            borderRadius="lg"
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            px={3}
            mx={1}
          >
            <Text fontSize="2xl" fontWeight="bold">
              H
              </Text>
          </Box>
          <Text fontSize="3xl" fontWeight="bold">
            19
            </Text>
          <Box
            borderRadius="lg"
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            px={3}
            mx={1}
          >
            <Text fontSize="2xl" fontWeight="bold">
              M
              </Text>
          </Box>
        </Flex>
      </Box>
    </SimpleGrid>
    <Box
      bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
      m={-4}
      px={4}
      py={6}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Assets List
      </Text>
      <SimpleGrid columns={{ sm: 2, lg: 4 }} gap={4} mb={8}>
        {
          pools.map((i, index) => (
            <PoolsCard poolsData={i} key={index} />
          ))
        }
      </SimpleGrid>
    </Box>


    <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asset List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={{ sm: 6 }} gap={4} mb={8}>
            {
              osmosis.assets.map((i, index) => (
                <Box key={index} >
                  <Checkbox
                    onChange={() => {
                      setAssetAddIndex(index)
                    }}
                    isChecked={index === assetAddIndex}>

                    {i.name}
                  </Checkbox>
                  <Image src={i.logo_URIs.png} width={50} />
                </Box>
              ))
            }
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
            </Button>
          <Button variant='ghost' onClick={assetAdd} >Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  </Box >
}
