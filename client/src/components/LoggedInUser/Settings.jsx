import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { PhoneIcon, AtSignIcon, InfoIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    const res = axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/users/isloggedin',
      withCredentials: true
    })

      .then(res => {
        console.log(res.data)
        const {name , email , phoneNumber , bio } = res.data.user
        setName(name)
        setEmail(email)
        setPhoneNumber(phoneNumber)
        setBio(bio)

        console.log(name, email, phoneNumber , bio)

      })
  }, [])


  const handleHomePage = () =>  navigate('/main')
  const handleEditProfile = () => navigate('/userProfileEdit')



  return (
    <Center py={6}>
      <Button onClick={handleHomePage} position={'absolute'} top={'0.8rem'} right={'8.6rem'} colorScheme='orange' variant='solid'>
        Home Page
      </Button>
      <Box
        maxW={'700px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('teal.50', 'teal.900')}
            p={2}
            px={3}
            color={'black.500'}
            rounded={'full'}>
            Settings
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'3xl'} fontWeight={800}>
              {name}
            </Text>

          </Stack>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10} >
          <List spacing={5}>
            <ListItem>
              <InfoIcon as={''} color="green.400" mr={4} />
              Name: {name}
            </ListItem>
            <ListItem>
              <AtSignIcon as={''} color="green.400" mr={4} />
              {email}
            </ListItem>
            <ListItem>
              <PhoneIcon as={''} color="green.400" mr={4} />
              {phoneNumber}
            </ListItem>
            <ListItem>
              <InfoIcon as={''} color="green.400" mr={4} />
              {bio}
            </ListItem>
          </List>

          <Button
          onClick={handleEditProfile}
            mt={10}
            w={'full'}
            bg={'teal.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'teal.400',
            }}
            _focus={{
              bg: 'teal.600',
            }}>
            Edit
          </Button>
      



        </Box>
      </Box>
    </Center>
  );
}