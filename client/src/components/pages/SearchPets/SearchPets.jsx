import { useState, useContext, useRef, useEffect } from 'react';
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
    Progress
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../App';
import PetCard from '../Pets/PetCard';
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

    const buttonRef = useRef(null)

    const formik = useFormik({
        initialValues: {
            type: '',
            adoptionStatus: '',
            weight: '',
            height: '',
            name: ''
        }
    })

    useEffect(() => {
        localStorage.getItem('pets') && setPets(JSON.parse(localStorage.getItem('pets')))
    }, [])

    // Basic Search
    const handleSearch = () => {
        const dogOrCatSearchString = `${baseURL}/api/v1/pets/?type=${formik.values.type}`
        const allSearchString = `${baseURL}/api/v1/pets`

        setSpinner(true)
        axios.get(formik.values.type === 'All' ? allSearchString : dogOrCatSearchString)
            .then(res => {
                const data = res.data.data.pets
                setPets(data)
                setSpinner(false)
                localStorage.setItem('pets', JSON.stringify(data))
            })
            .catch(err => console.log(err))
    }

    //  Advanced Search
    const handleAdvancedSearch = () => {
        setSpinner(true)

        const type = formik.values.type !== 'All' ? `type=${formik.values.type}` : ''
        const adoptionStatus = formik.values.adoptionStatus ? `&adoptionStatus=${formik.values.adoptionStatus}` : ''
        const weight = formik.values.weight ? `&weight=${formik.values.weight}` : ''
        const height = formik.values.height ? `&height=${formik.values.height}` : ''
        const name = formik.values.name ? `&name=${formik.values.name}` : ''

        const searchString = `${baseURL}/api/v1/pets?${type}${adoptionStatus}${weight}${height}${name}`
  
        console.log(searchString)
        console.log('Type: ', formik.values.type)

        axios.get(searchString)
            .then(res => {
                setPets(res.data.data.pets)
                localStorage.setItem('pets', JSON.stringify(res.data.data.pets))
                setSpinner(false)
            })
            .catch(err => console.log(err))

    }

    return (

        <>

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
                                <Select onChange={formik.handleChange} value={formik.values.type} name='type' >
                                    <option value='All'>All</option>
                                    <option value='Dog'>Dog</option>
                                    <option value='Cat'>Cat</option>

                                </Select>
                            </FormControl>


                            {checkbox &&

                                <>

                                    <FormControl onChange={formik.handleChange} value={formik.values.adoptionStatus} name='adoptionStatus' >
                                        <FormLabel>Adoption Status</FormLabel>
                                        <Select placeholder=' Select Adoption Status' name='adoptionStatus'  >
                                            <option value='Available'>Available</option>
                                            <option value='Fostered'>Fostered</option>
                                            <option value='Adopted'>Adopted</option>
                                        </Select>
                                    </FormControl>



                                    <FormControl>
                                        <FormLabel>Weight</FormLabel>
                                        <Input onChange={formik.handleChange} value={formik.values.weight} min={0} type={'number'} name={'weight'} />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Height</FormLabel>
                                        <Input onChange={formik.handleChange} value={formik.values.height} min={0} type={'number'} name={'height'} />
                                    </FormControl>


                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input onChange={formik.handleChange} value={formik.values.name} type={'text'} name='name' />
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


            </Flex>

        </>

    );
}