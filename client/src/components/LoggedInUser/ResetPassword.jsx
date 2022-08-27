import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
    const navigate = useNavigate()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const handleCurrentPassword = (e) => setCurrentPassword(e.target.value)
    const handleNewPassword = (e) => setNewPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)


    const handleResetPassword = () => {
        axios({
            method: 'PATCH',
            url: 'http://localhost:8080/api/v1/users/updateMyPassword',
            data: {
                passwordCurrent: currentPassword,
                password: newPassword,
                passwordConfirm: confirmPassword

            },
            withCredentials: true
        })
            .then(res => {
                console.log(res)
                if (res.statusText === 'OK') {
                    setMessage('Password Changed Successfully')
                    setStatus('success')
                }

            })

            .catch(err => {
                console.log(err.response.data.message)
                setMessage(err.response.data.message)
                setStatus('error')
            })
    }


    return (
        <Flex
            minH={'20vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}

                p={6}
                my={10}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Reset Password
                </Heading>
                <FormControl id="email" isRequired>
                    <FormLabel>Current Password</FormLabel>
                    <Input onChange={handleCurrentPassword}
                        type="password"
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" onChange={handleNewPassword} />
                </FormControl>

                <FormControl id="password" isRequired>
                    <FormLabel>Password Confirm</FormLabel>
                    <Input type="password" onChange={handleConfirmPassword} />
                </FormControl>

                <Stack spacing={6}>
                    <Button
                        onClick={handleResetPassword}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>

                    {message && <Alert status={status}>
                        <AlertIcon />
                        <AlertTitle>{message}</AlertTitle>
                    </Alert>}

                </Stack>
            </Stack>
        </Flex>
    );
}