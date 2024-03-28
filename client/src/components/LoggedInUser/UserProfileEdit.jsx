import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react';
import ResetPasswordForm from './ResetPasswordForm';
import { useNavigate} from 'react-router-dom';
import { useState, useEffect, useRef , useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../../App';

export default function UserProfileEdit() {
    const { user , setUser } = useContext(Context)
    const inputRef = useRef(null);
    const navigate = useNavigate()
    const backToUserInfo = () => navigate('/settings')

    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [bio, setBio] = useState('')

    const handleNameChange = (e) => setName(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value)
    const handleBioChange = (e) => setBio(e.target.value)

    const handleProfileEdit = () => {
        axios({
            method: 'PATCH',
            url: 'http://localhost:8080/api/v1/users/updateMe',
            data: {
                name,
                email,
                phoneNumber,
                bio
            },
            withCredentials: true
        })
            .then(res => {
                setUser(res.data.data.user)
                navigate('/settings')
                toast.success('Profile Updated Successfully')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (user) {
            const { photo, name, email, phoneNumber, bio } = user
            setPhoto(photo)
            setEmail(email)
            setName(name)
            setPhoneNumber(phoneNumber)
            setBio(bio)
        }
    }, [user])

    // Hanlde File input
    const handleClick = () => inputRef.current.click();

    const handleFileChange = async (event) => {
        try {
            const fileObj = event.target.files && event.target.files[0]
            const formData = new FormData();
            formData.append("photo", fileObj);
            const res = await axios.patch('http://localhost:8080/api/v1/users/photo', formData, {
                headers: {
                    "content-type": "multipart/form-data"
                },
                withCredentials: true
            });
            setPhoto(res.data.data.user.photo)
            window.location.reload()

        } catch (err) {
            console.log(err)
            toast.error('Something Went Wrong! , Try A Differernt Picture')
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'start'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack

                spacing={4}
                w={'full'}
                maxW={'xl'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>

                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    User Profile Edit
                </Heading>
                <FormControl id="userName">
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src={photo}>
                                <AvatarBadge
                                    as={IconButton}
                                    size="sm"
                                    rounded="full"
                                    top="-10px"
                                    colorScheme="green"
                                />
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <Button onClick={handleClick} w="full">Change Icon</Button>
                            <Input onChange={handleFileChange} ref={inputRef} type={'file'} bg={'green.300'} display={'none'} />
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl id="userName" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        onChange={handleNameChange}
                        value={name}
                        placeholder="User Name"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        onChange={handleEmailChange}
                        value={email}
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                    />
                </FormControl>

                <FormControl id="phone" isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                        onChange={handlePhoneNumberChange}
                        value={phoneNumber}
                        placeholder="0523456789"
                        _placeholder={{ color: 'gray.500' }}
                        type="number"
                    />
                </FormControl>

                <FormControl id="bio">
                    <FormLabel>bio</FormLabel>
                    <Input
                        onChange={handleBioChange}
                        value={bio}
                        placeholder="This is my bio"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        onClick={backToUserInfo}
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Back To User Info
                    </Button>
                    <Button
                        onClick={handleProfileEdit}
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Save
                    </Button>

                    <ResetPasswordForm />

                    <ToastContainer /> 


                </Stack>
            </Stack>

  
            
        </Flex>
    );
}