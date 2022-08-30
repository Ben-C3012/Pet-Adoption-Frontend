import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Select,
    Button,
    Text,
    useColorModeValue,
    Center,
    Alert,
    AlertIcon,
    AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

export default function AdminEditForm(props) {
    const { pet } = props
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')


    const { type, name, adoptionStatus, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breed } = pet

    const formik = useFormik({
        initialValues: {
            type: type,
            name: name,
            adoptionStatus: adoptionStatus,
            height: height,
            weight: weight,
            color: color,
            bio: bio,
            hypoallergenic: hypoallergenic,
            dietaryRestrictions: dietaryRestrictions,
            breed: breed
        }
    })


    const handleFormSubmit = async () => {
        console.log(formik.values)

        try {
            const res = await axios.patch(`http://localhost:8080/api/v1/pets/${pet._id}`, formik.values, {
                headers: {
                    "content-type": "multipart/form-data"
                },
                withCredentials: true
            });

            console.log(res)
            if (res.status === 200) {
                setStatus('success')
                setMessage('Pet Successfully Updated')
            }

        } catch (err) {
            console.log(err)
            setStatus('error')
            setMessage('Something Went Wrong! Please Try Again')
        }

       
           window.location.reload()
    }



    setTimeout(() => {
        setStatus('')
        setMessage('')
    }, 3000);



    return (
        <Flex
            minH={'100vh'}

            align={'start'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} py={12} px={6}>
                <Stack align={'center'}>


                </Stack>
                <Box
                    rounded={'lg'}
                    borderRadius={'10px'}

                    p={8}>
                    <Stack spacing={4}>

                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Select onChange={formik.handleChange} value={formik.values.type ? formik.values.type : pet.type} placeholder={'Select Type'} name='type'>
                                <option value='Dog'>Dog</option>
                                <option value='Cat'>Cat</option>
                            </Select>
                        </FormControl>

                        <FormControl >
                            <FormLabel>Name</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.name} type={'text'} name='name' />
                        </FormControl>


                        <FormControl>
                            <FormLabel>Adoption Status</FormLabel>
                            <Select onChange={formik.handleChange} value={formik.values.adoptionStatus} placeholder=' Select Adoption Status' name='adoptionStatus'>
                                <option value='Available'>Available</option>
                                <option value='Fostered'>Fostered</option>
                                <option value='Adopted'>Adopted</option>
                            </Select>
                        </FormControl>

                        <FormControl >
                            <FormLabel>Height</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.height} min={0} type={'number'} name={'height'} />
                        </FormControl>


                        <FormControl>
                            <FormLabel>Weight</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.weight} min={0} type={'number'} name={'weight'} />
                        </FormControl>



                        <FormControl >
                            <FormLabel>Color</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.color} type={'text'} name={'color'} />
                        </FormControl>


                        <FormControl >
                            <FormLabel>Bio</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.bio} type={'text'} name={'bio'} />
                        </FormControl>


                        <FormLabel>Hypoallergenic</FormLabel>
                        <Select onChange={formik.handleChange} value={formik.values.hypoallergenic} name={'hypoallergenic'} placeholder=' Select Hypoallergenic Status'>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Select>

                        <FormControl >
                            <FormLabel>Dietary Restrictions</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.dietaryRestrictions} name={'dietaryRestrictions'} type={'text'} />
                        </FormControl>

                        <FormControl >
                            <FormLabel>Breed</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.breed} name={'breed'} type={'text'} />
                        </FormControl>



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
                                Edit Pet
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