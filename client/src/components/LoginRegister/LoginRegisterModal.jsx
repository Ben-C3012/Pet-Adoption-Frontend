import React from 'react'
import ToggleRegister from './ToggleRegister'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button,
    useDisclosure, Text
} from '@chakra-ui/react'

function LoginRegister() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Text onClick={onOpen}>Login / Register</Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login / Register</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <ToggleRegister />

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default LoginRegister