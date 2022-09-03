import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Select,
    Button,
    Heading,
    useColorModeValue,
    Center,
    Tooltip,
    Alert,
    AlertIcon,
    AlertDescription,
    Text
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

export default function AddPet() {
    const inputRef = useRef(null);
    const [photo, setPhoto] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const handleClick = () => inputRef.current.click();

    const formik = useFormik({
        initialValues: {
            type: '',
            name: '',
            adoptionStatus: '',
            height: '',
            weight: '',
            color: '',
            bio: '',
            hypoallergenic: '',
            dietaryRestrictions: '',
            breed: '',
            photo: photo
        },

        validate: values => {
            let errors = {}
            if (!values.type) errors.type = 'Required'
            if (!values.name) errors.name = 'Required'
            if (!values.adoptionStatus) errors.adoptionStatus = 'Required'
            if (!values.height) errors.height = 'Required'
            if (!values.weight) errors.weight = 'Required'
            if (!values.color) errors.color = 'Required'
            if (!values.bio) errors.bio = 'Required'
            if (!values.hypoallergenic) errors.hypoallergenic = 'Required'
            if (!values.dietaryRestrictions) errors.dietaryRestrictions = 'Required'
            if (!values.breed) errors.breed = 'Required'
            if (!values.photo) errors.photo = 'Required'




            return errors
        }
    })

    const handleFileChange = async (event) => {
        const fileObj = event.target.files && event.target.files[0]
        setPhoto(fileObj)
    };

    const handleFormSubmit = async () => {
        formik.values.photo = photo
        try {
            const res = await axios.post('http://localhost:8080/api/v1/pets/', formik.values, {
                headers: {
                    "content-type": "multipart/form-data"
                },
                withCredentials: true
            });


            if (res.status === 201) {
                setStatus('success')
                setMessage('Pet Successfully Created')
            }

        } catch (err) {
            console.log(err)
            setStatus('error')
            setMessage('Something Went Wrong! Please Try Again')
        }

        formik.resetForm();
    }



    setTimeout(() => {
        setStatus('')
        setMessage('')
    }, 3000);

    console.log(formik.errors)

    return (
        <Flex
            minH={'100vh'}
            align={'start'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={10} w={'2xl'} mx={'auto'} maxW={'2xl'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Add A New Pet
                    </Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={8}>

                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Select onChange={formik.handleChange} value={formik.values.type} placeholder=' Select Type' name='type'>
                                <option value='Dog'>Dog</option>
                                <option value='Cat'>Cat</option>
                            </Select>
                            {formik.errors.type ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.type}</Text> : null}
                        </FormControl>

                        <FormControl mb={'30px'} >
                            <FormLabel>Name</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.name} type={'text'} name='name' />
                            {formik.errors.name ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.name}</Text> : null}
                        </FormControl>

                        <FormControl>
                            <FormLabel>Adoption Status</FormLabel>
                            <Select onChange={formik.handleChange} value={formik.values.adoptionStatus} placeholder=' Select Adoption Status' name='adoptionStatus'>
                                <option value='Available'>Available</option>
                                <option value='Fostered'>Fostered</option>
                                <option value='Adopted'>Adopted</option>
                            </Select>
                            {formik.errors.adoptionStatus ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.adoptionStatus}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Height</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.height} min={0} type={'number'} name={'height'} />
                            {formik.errors.height ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.height}</Text> : null}
                        </FormControl>

                        <FormControl>
                            <FormLabel>Weight</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.weight} min={0} type={'number'} name={'weight'} />
                            {formik.errors.weight ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.weight}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Color</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.color} type={'text'} name={'color'} />
                            {formik.errors.color ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.color}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Bio</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.bio} type={'text'} name={'bio'} />
                            {formik.errors.bio ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.bio}</Text> : null}
                        </FormControl>

                        <FormControl>
                            <FormLabel>Hypoallergenic</FormLabel>
                            <Select onChange={formik.handleChange} value={formik.values.hypoallergenic} name={'hypoallergenic'} placeholder=' Select Hypoallergenic Status'>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Select>
                            {formik.errors.hypoallergenic ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.hypoallergenic}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Dietary Restrictions</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.dietaryRestrictions} name={'dietaryRestrictions'} type={'text'} />
                            {formik.errors.bio ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.bio}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Breed</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.breed} name={'breed'} type={'text'} />
                            {formik.errors.breed ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.breed}</Text> : null}
                        </FormControl>

                        <Tooltip label={photo.name} fontSize='md'>
                            <Center w="full" display={'flex'} flexDirection={'column'}>
                                <Button onClick={handleClick} w="full">Choose Photo</Button>
                                <Input onChange={handleFileChange} name={'photo'} ref={inputRef} type={'file'} bg={'green.300'} display={'none'} />
                            </Center>
                        </Tooltip>

                        {message && <Alert status={status}>
                            <AlertIcon />

                            <AlertDescription>{message}</AlertDescription>
                        </Alert>}

                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={handleFormSubmit}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Add Pet
                            </Button>
                        </Stack>
                        <Stack pt={6}>

                        </Stack>
                    </Stack>
                </Box>
            </Stack >
        </Flex >
    );
}