import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Flex } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import {

    InputGroup,

    InputRightElement,



    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { Context } from '../../App'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function Login() {

    const navigate = useNavigate()
    const value = useContext(Context);
    const { loggedIn, isLoggedIn } = value
    const [showPassword, setShowPassword] = useState(false);


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setmessage] = useState('')

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const hanldeForm = async () => {
        console.log(email, password)
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/users/login',
                data: {
                    email,
                    password
                },
                withCredentials: true
            })

            console.log(res.status === 200)
            if (res) {
                isLoggedIn(true)
                navigate('/main', { replace: true })
                window.location.reload()
            }

        } catch (err) {
            console.log(err.response.data.message)
            setmessage(err.response.data.message)
        }
    }


    return (
        <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input id='email' type='email' onChange={handleEmail} value={email} />

       
            <FormControl mt={4} id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input  onChange={handlePassword} value={password} type={showPassword ? 'text' : 'password'} />
                    <InputRightElement h={'full'}>
                        <Button
                            variant={'ghost'}
                            onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>



            <Flex justify={'center'} >
                <Button onClick={hanldeForm} w={'150px'} mt={5} colorScheme='blue'>Login</Button>
            </Flex>

            {message && <Alert mt={1} status='error' >
                <AlertIcon />
                <AlertTitle>{message}</AlertTitle>
            </Alert>}

        </FormControl>
    )
}

export default Login




// <FormLabel htmlFor='password' mt={5}>Password</FormLabel>
// <Input id='password' type='password' onChange={handlePassword} value={password} />