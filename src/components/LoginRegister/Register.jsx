import {
    FormControl,
    FormLabel,
    Input,
    Flex,
    Button
} from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { Context } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'

function Register() {

    const navigate = useNavigate()
    const value = useContext(Context);
    const { loggedIn, isLoggedIn } = value

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            phoneNumber: ''
        }

    })

    const handleRegister = async () => {
        console.log(formik.values)
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/users/signup',
                data: {
                    name: formik.values.name,
                    email: formik.values.email,
                    password: formik.values.password,
                    passwordConfirm: formik.values.passwordConfirm,
                    phoneNumber: formik.values.phoneNumber
                },
                withCredentials: true
            })

            if (res) {
                console.log(res)
                isLoggedIn(true)
                navigate('/main', { replace: true })
                window.location.reload()
            }

        } catch (err) {
            console.log(err.response.data.message)
            showErrorToast(err.response.data.message)

        }
    }

    const showToastMessage = () => {
        toast.success('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showErrorToast = (err) => {
        toast.error(err, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    return (
        <> <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input onChange={formik.handleChange} value={formik.values.name} type={'text'} name='name' />
        </FormControl>

            <FormControl mt={5}>
                <FormLabel>Email</FormLabel>
                <Input onChange={formik.handleChange} value={formik.values.email} name='email' type='email' />
            </FormControl>


            <FormControl mt={5}>
                <FormLabel>Password</FormLabel>
                <Input onChange={formik.handleChange} value={formik.values.password} name='password' type='password' />
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Confirm Password</FormLabel>
                <Input onChange={formik.handleChange} value={formik.values.passwordConfirm} type='password' name='passwordConfirm' />
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Phone Number</FormLabel>
                <Input onChange={formik.handleChange} value={formik.values.phoneNumber} name='phoneNumber' type='number' />
                <Flex justify={'center'} >
                    <Button w={'150px'} mt={9} colorScheme='teal' onClick={handleRegister} >Sign Up</Button>
                    <ToastContainer />
                </Flex>
            </FormControl>

        </>
    )
}



export default Register