import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
const axios = require('axios').default;

export default function Pet() {
    const navigate = useNavigate()
    const [pet, setPet] = useState({})

    useEffect(() => {

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        let petId = params.id;

        console.log(petId)

        axios.get(`http://localhost:8080/api/v1/pets/${petId}`)
            .then(res => {
                console.log(res.data.data.pet)
                const data = res.data.data.pet
                setPet(data)

            })
            .catch(err => console.log(err))
    }, [])


    const handleBackToSearch = () => {
        navigate('/pets', { replace: true })
    }



    return (
        <Center py={6}>
            <Button onClick={handleBackToSearch} position={'absolute'} top={'3'} right={'10rem'}>Back To Search</Button>
            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '450px' }}
                height={{ sm: '700px', md: '45rem' }}
                direction={{ base: 'column', md: 'column' }}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                padding={4}>
                <Flex flex={1} bg="blue.200">
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={
                            pet.photo
                        }
                    />
                </Flex>
                <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {pet.name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                        {pet.breed}
                    </Text>
                    <Text
                        textAlign={'center'}
                        color={useColorModeValue('gray.700', 'gray.400')}
                        px={3}>
                        {pet.bio}
                    </Text>
                    <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'400'} fontSize={'md'}>
                            {pet.height}cm
                        </Badge>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'400'} fontSize={'md'}>
                            {pet.weight}kg
                        </Badge>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'400'} fontSize={'md'}>
                            {pet.color}
                        </Badge>
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'400'} fontSize={'md'}>
                            {pet.dietaryRestrictions === false ? 'No Diet Restrictions' : pet.dietaryRestrictions}
                        </Badge>
                    </Stack>

                    <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                        >
                            Foster
                        </Button>
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                                bg: 'blue.500',
                            }}
                            _focus={{
                                bg: 'blue.500',
                            }}>
                            Adpot
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Center>
    );
}