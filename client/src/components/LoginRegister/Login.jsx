import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Flex } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { Context } from '../../App'

function Login() {

    const navigate = useNavigate()
    const value = useContext(Context);
    const { loggedIn, isLoggedIn } = value



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            }



        } catch (err) {
            console.log(err)
        }
    }


    return (
        <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input id='email' type='email' onChange={handleEmail} value={email} />

            <FormLabel htmlFor='password' mt={5}>Password</FormLabel>
            <Input id='password' type='password' onChange={handlePassword} value={password} />

            <Flex justify={'center'} >
                <Button onClick={hanldeForm} w={'150px'} mt={5} colorScheme='blue'>Login</Button>
            </Flex>

        </FormControl>
    )
}

export default Login