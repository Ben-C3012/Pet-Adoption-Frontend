import { useEffect, useState } from 'react'
import axios from 'axios';
import { Flex, Center, Text, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai'
import { GiSittingDog } from 'react-icons/gi'


function Stats() {

  const [users, setUsers] = useState([])
  const [pets, setPets] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/users/',
      withCredentials: true
    })
      .then(res => {
        const users = res.data.data.users
        setUsers(users)
      })

    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/pets/',
      withCredentials: true
    })

      .then(res => {
        const pets = res.data.data.pets
        setPets(pets)
      })
  }, []);




  return (
    <>

      <Flex direction={'column'} mt={'10rem'} width={'50vw'} borderRadius={'10px'}>

        <Center>
          <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'
            m={'1rem'}
          >
            {users.length}
          </Text>
          <AiOutlineUser size={50} />
        </Center>

        <Center>
          <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'
            m={'1rem'}
          >
            {pets.length}
          </Text>

          <GiSittingDog size={48} />

        </Center>
      </Flex>


    </>
  )
}

export default Stats