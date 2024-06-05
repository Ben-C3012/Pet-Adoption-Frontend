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
    Text,
    Progress
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useToast } from '@chakra-ui/react'


export default function AddPet() {
    const toast = useToast()
    const inputRef = useRef(null);
    const handleClick = () => inputRef.current.click();

    const [photo, setPhoto] = useState('')
    const [spinner, setSpinner] = useState(false)
    const [photoChosen, setPhotoChosen] = useState(false)

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
            photo: ''
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

            return errors
        }
    })

    const handleFileChange = async (event) => {
        const fileObj = event.target.files && event.target.files[0]
        setPhotoChosen(true)
        setPhoto(fileObj)
    };

    const handleFormSubmit = async () => {

        setSpinner(true)
        toast({
            title: 'Feature Disabled!',
            description: 'Feature Disabled For Security Purposes',
            status: 'error',
            duration: 3000,
            isClosable: true,
        })

        setSpinner(false)

        return


        setSpinner(true)
        formik.values.photo = photo
        try {
            const res = await axios.post('http://localhost:8080/api/v1/pets/', formik.values, {
                headers: {
                    "content-type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.status === 201) {
                setSpinner(false)
                toast({
                    title: 'Pet Added Successfully!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }

        } catch (err) {
            console.log(err)
            toast({
                title: 'Error Adding Pet',
                description: 'Please try again later',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setSpinner(false)
        }

    }

    const typeIsEmpty = formik.values.type === '' && true
    const formikErrors = Object.keys(formik.errors).length > 0 && true

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
                            <Select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.type} placeholder=' Select Type' name='type'>
                                <option value='Dog'>Dog</option>
                                <option value='Cat'>Cat</option>
                            </Select>
                            {formik.touched.type && formik.errors.type && formik.errors.type ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.type}</Text> : null}
                        </FormControl>

                        <FormControl mb={'30px'} >
                            <FormLabel>Name</FormLabel>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type={'text'} name='name' />
                            {formik.touched.name && formik.errors.name && formik.errors.name ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.name}</Text> : null}
                        </FormControl>

                        <FormControl>
                            <FormLabel>Adoption Status</FormLabel>
                            <Select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.adoptionStatus} placeholder=' Select Adoption Status' name='adoptionStatus'>
                                <option value='Available'>Available</option>
                                <option value='Fostered'>Fostered</option>
                                <option value='Adopted'>Adopted</option>
                            </Select>
                            {formik.touched.adoptionStatus && formik.errors.adoptionStatus && formik.errors.adoptionStatus ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.adoptionStatus}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Height</FormLabel>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.height} min={0} type={'number'} name={'height'} />
                            {formik.touched.height && formik.errors.height && formik.errors.height ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.height}</Text> : null}
                        </FormControl>

                        <FormControl>
                            <FormLabel>Weight</FormLabel>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.weight} min={0} type={'number'} name={'weight'} />
                            {formik.touched.weight && formik.errors.weight && formik.errors.weight ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.weight}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Color</FormLabel>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.color} type={'text'} name={'color'} />
                            {formik.touched.color && formik.errors.color && formik.errors.color ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.color}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Bio</FormLabel>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bio} type={'text'} name={'bio'} />
                            {formik.touched.bio && formik.errors.bio && formik.errors.bio ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.bio}</Text> : null}
                        </FormControl>

                        <FormControl>
                            <FormLabel>Hypoallergenic</FormLabel>
                            <Select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hypoallergenic} name={'hypoallergenic'} placeholder=' Select Hypoallergenic Status'>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Select>
                            {formik.touched.hypoallergenic && formik.errors.hypoallergenic && formik.errors.hypoallergenic ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.hypoallergenic}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Dietary Restrictions</FormLabel>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.dietaryRestrictions} name={'dietaryRestrictions'} type={'text'} />
                            {formik.touched.dietaryRestrictions && formik.errors.dietaryRestrictions && formik.errors.bio ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.bio}</Text> : null}
                        </FormControl>

                        <FormControl >
                            <FormLabel>Breed</FormLabel>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.breed} name={'breed'} type={'text'} />
                            {formik.touched.breed && formik.errors.breed && formik.errors.breed ? <Text position={'absolute'} bottom={'-22px'} color={'red.500'}>{formik.errors.breed}</Text> : null}
                        </FormControl>

                        <Tooltip label={photo.name} fontSize='md'>
                            <Center w="full" display={'flex'} flexDirection={'column'}>
                                <Button onClick={handleClick} w="full">Choose Photo</Button>
                                <Input onChange={handleFileChange} name={'photo'} ref={inputRef} type={'file'} display={'none'} />
                            </Center>
                        </Tooltip>

                        <Box w={'100%'} h={'20px'}>
                            {spinner && <Progress size='xs' isIndeterminate />}
                        </Box>

                        <Stack spacing={10} >
                            <Button
                                disabled={formikErrors || typeIsEmpty || !photoChosen}
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