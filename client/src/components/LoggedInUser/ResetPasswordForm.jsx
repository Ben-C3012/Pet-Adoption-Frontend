import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import ResetPassword from './ResetPassword'

export default function ResetPasswordForm() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>

      <Button
        onClick={onOpen}
        bg={'blue.700'}
        color={'white'}
        w="full"
        _hover={{
          bg: 'blue.900',
        }}>
        Change Password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        
          <ModalCloseButton />
          <ModalBody>

            <ResetPassword />

          </ModalBody>

          <ModalFooter>

            <Button colorScheme='blue' mr={3} onClick={onClose} bg={'blue.700'}>
              Close
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}