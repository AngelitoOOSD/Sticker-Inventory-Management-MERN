import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, HStack, Image, useColorModeValue, Heading, IconButton, Text, useToast, Modal, useDisclosure, 
    ModalOverlay, ModalHeader, ModalCloseButton, ModalContent, ModalBody, Input, VStack,
    ModalFooter,
    Button, Tag} from "@chakra-ui/react"
import { useStickerStore } from "../store/sticker";
import { useState } from "react";



const StickerCard = ({sticker}) => {

    const [updatedSticker, setUpdatedSticker] = useState(sticker); 

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteSticker, updateSticker} = useStickerStore();
    const toast = useToast();

    const {isOpen, onOpen, onClose } = useDisclosure();

    //delete confirmation
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    //open delete confirm
    const openDeleteModal = () => {
        setIsDeleteOpen(true);
    }
    //close delete confirm
    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
    }

    //delete button
    const handleDeleteSticker = async (pid) => {
        const {success, message} = await deleteSticker(pid)
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        }
    }

    //Update button
    const handleUpdateSticker = async (pid, updatedSticker) => {
        const { success, message} = await updateSticker(pid, updatedSticker);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else{
            toast({
                title: "Success",
                description: "Sticker Updated Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
    >
        <Image src={sticker.image} alt={sticker.name} h='{48}' w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='lg' mb={4}>
                {sticker.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${sticker.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<DeleteIcon/>} onClick={openDeleteModal} colorScheme='red' />
            </HStack>
        </Box>
        
        <Modal isOpen={isDeleteOpen}>
            <ModalContent>
                <ModalHeader textAlign="center" fontSize='3xl' color="red.400">Delete Sticker</ModalHeader>
                <Text textAlign="center" fontSize='2xl'>{updatedSticker.name}</Text>
                <Image src={sticker.image}/>
                <ModalFooter justifyContent="center">
                    <Button colorScheme='red' mr={4} onClick={() => handleDeleteSticker(sticker._id, updatedSticker)}>
                        Delete
                    </Button>
                    <Button variant='ghost' onClick={closeDeleteModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Sticker</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack spacing={4}>
                        <Input
                        placeholder='Sticker Name'
                        name='name'
                        value={updatedSticker.name}
                        onChange={(e) => setUpdatedSticker({...updatedSticker, name: e.target.value})}
                        />
                        <Input
                        placeholder='Price'
                        name='price'
                        type='number'
                        value={updatedSticker.price}
                        onChange={(e) => setUpdatedSticker({...updatedSticker, price: e.target.value})}
                        />
                        <Input
                        placeholder='Image URL'
                        name='image'
                        value={updatedSticker.image}
                        onChange={(e) => setUpdatedSticker({...updatedSticker, image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdateSticker(sticker._id, updatedSticker)}>
                        Update
                    </Button>
                    <Button variant='ghost' onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default StickerCard