import { Box, Container, Heading, VStack, useColorModeValue, Button, Input, useToast } from '@chakra-ui/react'
import {useState} from 'react'
import { useStickerStore } from '../store/sticker';

const CreatePage = () => {

    const [newSticker, setNewSticker] = useState({
        name: "",
        price: "",
        image: "",
    });

    const toast = useToast();
    const {createSticker} = useStickerStore()

    const handleAddSticker = async() => {
        const {success, message} = await createSticker(newSticker);

        //destructure the values
        if(!success) {
            toast({
                title:"Error",
                description:message,
                status:"error",
                duration:5000,
                isClosable:true
            })
        }else{
            toast({
                title:"Success",
                description:message,
                status:"success",
                duration:5000,
                isClosable:true
            })
        }
        //set the input fields back to empty
        setNewSticker({name:"", price:"", image:""});
    }

  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Sticker
            </Heading>

            <Box
                w={"full"} bg={useColorModeValue("white", "gray.800")}
                p={6} rounded={"lg"} shadow={"md"}
            >
                <VStack spacing={4}>
                    <Input
                        placeholder='Sticker Name'
                        name='name'
                        //adds the sticker name value to newSticker
                        //onChange is an event handler in React that's triggered whenever the value of an input field changes
                        //(e) => ... is a function that receives the event (e) as an argument
                        //the (e) parameter represents the change event triggered by the input
                        //{...newSticker}: The spread operator (...) creates a shallow copy of the current newSticker state. 
                        //This way, we preserve all the other properties of newSticker without modifying them directly.
                        //The final result is a new newSticker object with the updated name property, which is then set as the new state.
                        value={newSticker.name}
                        onChange={(e) => setNewSticker({...newSticker, name: e.target.value})}
                    />
                    <Input
                        placeholder='Price'
                        name='price'
                        value={newSticker.price}
                        onChange={(e) => setNewSticker({...newSticker, price: e.target.value})}
                    />
                    <Input
                        placeholder='Image URL'
                        name='image'
                        value={newSticker.image}
                        onChange={(e) => setNewSticker({...newSticker, image: e.target.value})}
                    />
                    
                    <Button colorScheme='blue' onClick={handleAddSticker} w='full'>Add Sticker</Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage