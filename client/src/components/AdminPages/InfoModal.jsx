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
   
    // console.log(id)
    const [user, setUser] = useState('')
    const [currentPets, setcurrentPets] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()


    // const handleUserInfo = () => {

    //     const userId = id

    //     axios({
    //         method: 'GET',
    //         url: `http://localhost:8080/api/v1/users/${userId}`,
    //         withCredentials: true
    //     })

    //         .then(res => {
    //             // console.log(res.data.data.user)
    //             setUser(res.data.data.user)
    //             setcurrentPets(res.data.data.user.currentPets)
    //         })

    // }




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