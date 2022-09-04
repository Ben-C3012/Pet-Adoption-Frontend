import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import UserCard from './tables/UserCard'

export default function InfoModal() {
    const [user, setUser] = useState('')
    const [currentPets, setcurrentPets] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                onClick={() => {
                    onOpen();
                    // handleUserInfo();
                }}>

                +</Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>


                        <UserCard  user={user} currentPets={currentPets} />



                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}