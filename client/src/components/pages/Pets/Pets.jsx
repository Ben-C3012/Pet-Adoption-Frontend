import React from 'react'
import { Container, Box, Heading, Input, Select, Button, Checkbox} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Pets() {
  let navigate = useNavigate();

  const [checkbox, setCheckbox] = useState(true)

  const handleCheckbox = () => setCheckbox(!checkbox)





  return (
    <>
      <Link to={'/'}>Back To Home</Link>
      <Container h={'4xl'} maxW={'3xl'} bg='linkedin.300' centerContent mt={'30'} sx={{ borderRadius: "2%" }} >
        <Box mt={4} w={'100%'} padding='4' color='black' maxW='2xl'>
          <Heading>Search For A Pet 🐶 </Heading>
          <Checkbox size={'md'} onChange={handleCheckbox} mt={10} defaultChecked>Advanced Search</Checkbox>


          <Select size='lg' mt={10} variant={'outline'} placeholder='Select Animal Type'>
            <option value='option1'>Dog</option>
            <option value='option2'>Cat</option>
          </Select>

          {checkbox && <Box>

            <Select size='lg' mt={10} variant={'outline'} placeholder='Adoption Status'>
              <option value='option1'>Available</option>
              <option value='option2'>Fostered</option>
              <option value='option2'>Adopted</option>
            </Select>

            <Input size='lg' type={'number'} mt={10} placeholder='Weight' />
            <Input size='lg' type={'number'} mt={10} placeholder='Height' />
            <Input size='lg' type={'number'} mt={10} placeholder='Name' />

          </Box>}

          <Button w={'150px'} mt={9} colorScheme='teal'>Search 🔍</Button>


        </Box>

      </Container>
    </>
  )
}

export default Pets