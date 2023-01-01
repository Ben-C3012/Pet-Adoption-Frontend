import {
    InputGroup,
    InputRightElement,
    FormControl, FormLabel,
    Input,
    Button,
    Flex,
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
    Progress
} from '@chakra-ui/react'
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
    const [message, setMessage] = useState('')
    const [spinner, setSpinner] = useState(false)

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleForm = async () => {
        setSpinner(true)
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
                setSpinner(false)
                isLoggedIn(true)
                navigate('/main', { replace: true })
                window.location.reload()
            }

        } catch (err) {
            setSpinner(false)
            console.log(err.response.data.message)
            setMessage(err.response.data.message)

        }
    }

    return (

        <>
            {spinner && <Progress size={'xs'} isIndeterminate />}
            <FormControl mt={6}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input id='email' type='email' onChange={handleEmail} value={email} />

                <FormControl mt={4} id="password">
                    <FormLabel>Password</FormLabel>

                    <InputGroup>
                        <Input onChange={handlePassword} value={password} type={showPassword ? 'text' : 'password'} />

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
                    <Button onClick={handleForm} w={'150px'} mt={5} colorScheme='blue'>Login</Button>
                </Flex>

                <Box w={'100%'} h={'5vh'} >

                    {message && <Alert mt={1} status='error' >
                        <AlertIcon />
                        <AlertTitle>{message}</AlertTitle>
                    </Alert>}

                </Box>

            </FormControl>
        </>
    )
}

export default Login




