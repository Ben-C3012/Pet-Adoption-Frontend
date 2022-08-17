import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Flex,
    Button
} from '@chakra-ui/react'
import { useState } from 'react'


function Register() {

    const [input, setInput] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)

    const isError = input === ''


    return (
        <> <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input type='text' />
        </FormControl>

            <FormControl mt={5}>
                <FormLabel>Email</FormLabel>
                <Input type='email' />
            </FormControl>


            <FormControl mt={5}>
                <FormLabel>Password</FormLabel>
                <Input type='password' />
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Confirm Password</FormLabel>
                <Input type='password' />
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Phone Number</FormLabel>
                <Input type='number' />
                <Flex justify={'center'} >
                    <Button w={'150px'} mt={9} colorScheme='teal'>Sign Up</Button>
                </Flex>
            </FormControl>

        </>
    )
}

export default Register