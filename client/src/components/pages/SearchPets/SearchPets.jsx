import { useState, useContext, useEffect } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,
    Center,
    Progress,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../App';
import PetCard from '../Pets/PetCard';
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { searchAllPetsURL } from '../../../utils/url';

const axios = require('axios').default;

export default function SearchPets() {
    const value = useContext(Context)
    const { loggedIn } = value
    const navigate = useNavigate()
    const handleHome = () => loggedIn ? navigate('/main') : navigate('/')
    const baseURL = `http://localhost:8080`

    const [checkbox, setCheckbox] = useState(false)
    const handleCheckbox = () => setCheckbox(!checkbox)

    const [pets, setPets] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);

    // react-hook-form
    const form = useForm()
    const { register, control, getValues } = form

    const handleSearch = async () => {
        setSpinner(true)
        const type = getValues('type')
        if (type === 'All') {
            const res = await axios.get(searchAllPetsURL)
            setPets(res.data.data.pets)
            setSpinner(false)
            return
        }

        const res = await axios.get(`${baseURL}/api/v1/pets?type=${type}`)
        setPets(res.data.data.pets)
        setSpinner(false)
    }

    const handleAdvancedSearch = async () => {
        setSpinner(true)
        const type = getValues('type');
        const adoptionStatus = getValues('adoptionStatus');
        const weight = getValues('weight');
        const height = getValues('height');
        const name = getValues('name');


        const params = { type, adoptionStatus, weight, height, name };
        const queryString = generateQueryString(params);
        console.log(queryString);

        const res = await axios.get(`${baseURL}/api/v1/pets?${queryString}`)
        setPets(res.data.data.pets)
        setSpinner(false)
    }


    const generateQueryString = (params) => {
        return Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');
    }

    return (

        <>
            <FormControl >
                <Flex
                    minH={'100vh'}
                    align={'start'}
                    justify={'start'}
                    direction={'column'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack spacing={8} mx={'auto'} maxW={'xl '} width={'xl'} py={12} px={6}>
                        <Stack align={'center'}>

                            <Heading fontSize={'4xl'}>Search For Pets</Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                To enjoy all of our cute  <Link color={'blue.400'}>animals</Link> 🐶
                            </Text>

                            <Button onClick={handleHome} position={'absolute'} top={'1'} right={'8.6rem'} colorScheme='orange' variant='solid'>
                                Back To Home
                            </Button>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>


                            <Box w={'100%'} h={'1vh'}>
                                {spinner && <Progress size="xs" isIndeterminate />}
                            </Box>



                            <Stack spacing={4}>

                                <Checkbox onChange={handleCheckbox}>Advanced Search</Checkbox>


                                <FormControl>
                                    <FormLabel>Type</FormLabel>
                                    <Select id='type' {...register("type")} >
                                        <option value='All'>All</option>
                                        <option value='Dog'>Dog</option>
                                        <option value='Cat'>Cat</option>

                                    </Select>
                                </FormControl>


                                {checkbox &&

                                    <>

                                        <FormControl>
                                            <FormLabel>Adoption Status</FormLabel>
                                            <Select id='adoptionStatus' {...register("adoptionStatus", {
                                                required: 'This is required'
                                            })}
                                                placeholder=' Select Adoption Status'    >
                                                <option value='Available'>Available</option>
                                                <option value='Fostered'>Fostered</option>
                                                <option value='Adopted'>Adopted</option>
                                            </Select>
                                        </FormControl>



                                        <FormControl>
                                            <FormLabel>Weight</FormLabel>
                                            <Input {...register('weight')} id='weight' min={0} type={'number'} />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Height</FormLabel>
                                            <Input {...register('height')} id='height' min={0} type={'number'} />
                                        </FormControl>


                                        <FormControl>
                                            <FormLabel>Name</FormLabel>
                                            <Input  {...register('name')} id='name' type={'text'} name='name' />
                                        </FormControl>

                                    </>
                                }

                                <Stack spacing={10}>

                                    <Button
                                        onClick={!checkbox ? handleSearch : handleAdvancedSearch}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Search
                                    </Button>

                                </Stack>
                            </Stack>
                        </Box>

                    </Stack>

                    <Flex justify={'center'} color='white' w={'100%'} wrap='wrap'>

                        {pets.length === 0 && <Text fontSize={'xl'} color={'gray.600'}>No Pets Found</Text>}

                        {pets && pets.map(pet => {

                            return <Center key={pet._id} w='500px' h={'500px'} >
                                <PetCard type={pet.type} petName={pet.name} adoptionStatus={pet.adoptionStatus} bio={pet.bio}
                                    breed={pet.breed} color={pet.color} dietaryRestrictions={pet.dietaryRestrictions} picture={pet.photo} id={pet._id} />
                            </Center>
                        })}

                    </Flex>

                    <DevTool control={control} />


                </Flex>

            </FormControl>

        </>

    );
}