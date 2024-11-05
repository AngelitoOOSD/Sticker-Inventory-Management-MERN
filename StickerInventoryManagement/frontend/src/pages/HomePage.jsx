import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useStickerStore } from "../store/sticker";
import { useEffect } from "react";
import StickerCard from "../components/StickerCard";



const HomePage = () => {
    const {fetchStickers, stickers} = useStickerStore();
    useEffect(()=> {
        fetchStickers();
    }, [fetchStickers]);
    //view in browser console
    console.log("stickers", stickers);

  return (
    <Container maxW='container.xl' py={4}>
        <VStack spacing={8}>
            <Text
                fontSize={"50"}
                fontWeight={"bold"}
                bgGradient={"linear(to-r, orange.400, orange.200, orange.400)"}
                bgClip={"text"}
                textAlign={"center"}
            >Sticker Inventory
            </Text>
            <Text fontSize='2xl' color="blue.400" >Decorate your notebooks! Decorate your calendar! Decorate the world!</Text>
            
            <SimpleGrid
                columns={{
                    base:1,
                    md:2,
                    lg:3,
                }}
                spacing={10}
                w={"full"}
            >
                {stickers.map((sticker) => (
                    <StickerCard key={sticker._id} sticker={sticker} />
                ))}
            </SimpleGrid>

            
            {stickers.length === 0 && (
                <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                No stickers found {" "}
                <Link to={"/create"}>
                    <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}
                    >Create a Sticker
                    </Text>
                </Link>
            </Text>
            )}
            
        </VStack>
    </Container>
  )
}

export default HomePage