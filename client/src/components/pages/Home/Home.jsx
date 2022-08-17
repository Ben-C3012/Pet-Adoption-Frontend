
import { Center, Box, Heading, Flex, Text } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import './Home.css'
import NavBar from '../../UI/NavBar'
function Home() {

const imgURL = 'https://cdn.pixabay.com/photo/2016/07/21/14/18/dog-1532627_960_720.png'


  return (
    <>
      <NavBar />
      <Center bg={'teal.400'} h='200px' color='white' mt={100}>
        <Flex direction={'column'}>
          <Heading>Pet Adoption Site</Heading>
          <Text mt={2} fontSize='lg'>Find Your Next Pet Today!</Text>
        </Flex>
      </Center>
 

      <Center  bgImage={imgURL} bgRepeat = {'no-repeat'}   bgPosition="center"  h='600px' color='white'>
        <Flex direction={'column'}>
         
    
        </Flex>
      </Center>



    </>
  )
}

export default Home


