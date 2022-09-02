import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckIcon } from '@chakra-ui/icons'
import { BiBone } from 'react-icons/bi'


export default function UserCard(props) {
    const { id, user, currentPets } = props
    // const [user, setUser] = useState('')
    console.log(user)



    // const [currentPets, setcurrentPets] = useState([])

    console.log(currentPets)





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
                        user.photo
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
                    {user.name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {user.email}
                </Text>
                <Text
                    textAlign={'center'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}>

                    Bio
                </Text>

                <Text mt={4} textAlign={'start'} decoration={'underline'}>Current Pets</Text>

                <Stack align={'start'} justify={'start'} direction={'row'} mt={6}>

                    {currentPets.length < 1 ? <Text>No Current Pets</Text> : currentPets.map(pet => {
                        return <Link>{pet.name}</Link>
                    })}    
                </Stack>

                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _focus={{
                            bg: 'gray.200',
                        }}>
                        Message
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
                        Follow
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}