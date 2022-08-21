import { Text } from '@chakra-ui/react'
import './Home.css'
import NavBar from '../../UI/NavBar'

function Home() {

  return (
    <>
      <NavBar />

      <div className="home-container">
        <Text mt={4} bgGradient='linear(to-l, #023047, #1d3557)' bgClip='text' fontSize='4xl' fontWeight='extrabold'> Discover Your Next Pet </Text>
      </div>


      <Text>Search For a Pet 🐕</Text>
      <Text>Adopt 😀</Text>
      <Text>Enjoy 🧫</Text>



    </>
  )
}

export default Home

