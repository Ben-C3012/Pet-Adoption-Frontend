import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    useColorModeValue,
    List,
    ListItem,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons'
import { BiBone } from 'react-icons/bi'
import { GiHearts } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';

export default function UserCard(props) {
    const { user } = props
    const { name, email, photo, role, currentPets, savedPets, phoneNumber, bio } = user

    const navigate = useNavigate()

    const handleClick = (event) => {
        const id = event.currentTarget.id
        navigate({ pathname: '/pet', search: `?id=${id}` });
    }

    return (
        <Center py={6}>
            <Box
                maxW={'100%'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.700')}
                // boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>

                <Avatar
                    size={'xl'}
                    src={
                        photo
                    }
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />

                <Heading fontSize={'2xl'} fontFamily={'body'}>

                </Heading>

                <Text fontWeight={500} fontSize={'lg'} color={useColorModeValue('gray.700', 'gray.400')} mb={2}>
                    {name}
                </Text>

                <Text fontWeight={600} color={'gray.500'} mb={3}>
                    {email}
                </Text>

                <Text
                    textAlign={'center'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}>
                    {bio}
                </Text>

                <Stack align={'center'} justify={'center'} direction={'row'}>

                    <List spacing={5} mt={2}>
                        <ListItem>
                            <PhoneIcon as={' '} color="blue.500" mr={2} />
                            {phoneNumber}
                        </ListItem>

                    </List>

                </Stack>

                <Stack align={'start'} justify={'start'} direction={'row'} mt={6}>

                    <List spacing={5} mt={2}>

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
                            Current Pets
                        </Button>
                        {currentPets.length < 1 ? <Text>No Current Pets</Text> : currentPets.map(pet => {
                            return <>
                                <ListItem key={pet._id} display={'flex'} flexDirection={'row'}>
                                    <BiBone as={' '} color="blue.600" m={2} />
                                    <Link id={pet._id} color='blue.500' onClick={handleClick} key={pet._id}>{pet.name}</Link>
                                </ListItem>
                            </>
                        })}

                        <Button
                        mr={1}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'gray.600'}
                            color={'white'}
                            boxShadow='dark-lg'
                            _hover={{
                                bg: 'gray.500',
                            }}
                            _focus={{
                                bg: 'gray.500',
                            }}>
                            Saved Pets
                        </Button>
                        {savedPets.length < 1 ? <Text>No Saved Pets</Text> : savedPets.map(pet => {
                            return <>
                                <ListItem key={pet._id} display={'flex'} flexDirection={'row'}>
                                    <GiHearts as={' '} color="blue.600" m={2} />
                                    <Link id={pet._id} color='blue.500' onClick={handleClick} key={pet._id}>{pet.name}</Link>
                                </ListItem>
                            </>
                        })}

                    </List>

                </Stack>

            </Box>
        </Center>
    );
}