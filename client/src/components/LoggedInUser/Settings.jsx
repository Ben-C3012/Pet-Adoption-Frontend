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
import { AiOutlinePlus } from 'react-icons/ai'

import { PhoneIcon, AtSignIcon, InfoIcon } from '@chakra-ui/icons'


export default function Settings() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    const res = axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/users/isloggedin',
      withCredentials: true
    })


      .then(res => {
        console.log(res.data)
        const name = res.data.user.name
        setName(name)
        const email = res.data.user.email
        setEmail(email)
        const phoneNumber = res.data.user.phoneNumber
        setPhoneNumber(phoneNumber)

        console.log(name , email , phoneNumber)

      })
  }, [])





  return (
    <Center py={6}>
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
            Profile
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
              All features
            </ListItem>
          </List>

          <Button
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