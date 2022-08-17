import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Flex } from '@chakra-ui/react'

function Login() {
    return (
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
            <FormLabel mt={5}>Password</FormLabel>

            <Input type='password' />

            <Flex justify={'center'} >
                <Button w={'150px'} mt={8} colorScheme='blue'>Login</Button>
            </Flex>

        </FormControl>
    )
}

export default Login