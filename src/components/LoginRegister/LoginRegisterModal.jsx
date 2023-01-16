import ToggleRegister from './ToggleRegister'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text
} from '@chakra-ui/react'
import { Context } from '../../App'
import { useContext, useEffect } from 'react'

function LoginRegister(props) {
    const value = useContext(Context);
    const { loggedIn, isLoggedIn } = value

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (loggedIn) {
            onClose()
        }
    }, [loggedIn])

    return (
        <>
            <Text onClick={onOpen}>Login / Register</Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login / Register</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <ToggleRegister onclose={onclose} />

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