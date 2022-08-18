import React from 'react'
import { Container, Box, Heading, Input, Select, Button, Checkbox } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const axios = require('axios').default;


function Pets() {

  const [checkbox, setCheckbox] = useState(true)
  const [selectType, setSelectType] = useState('')
  const [adoptionStatus, setAdoptionStatus] = useState('')

  const handleCheckbox = () => setCheckbox(!checkbox)
  const handleSelectType = (e) => setSelectType(e.target.value)


  const handleAdoptionStatus = (e) => {
    console.log(e.target.value)
    setAdoptionStatus(e.target.value)
  }


  const handleSearch = () => {
    axios.get(`http://localhost:8080/api/v1/pets/?type=${selectType}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }



  return (
    <>
      <Link to={'/'}>Back To Home</Link>
      <Container h={'4xl'} maxW={'3xl'} bg='linkedin.300' centerContent mt={'30'} sx={{ borderRadius: "2%" }} >
        <Box mt={4} w={'100%'} padding='4' color='black' maxW='2xl'>
          <Heading>Search For A Pet 🐶 </Heading>
          <Checkbox checked={false} size={'md'} onChange={handleCheckbox} mt={10} defaultChecked>Advanced Search</Checkbox>


          <Select onChange={handleSelectType} size='lg' mt={10} variant={'outline'} placeholder='Select Animal Type'>
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
          </Select>

          {checkbox && <Box>

            <Select onChange={handleAdoptionStatus} size='lg' mt={10} variant={'outline'} placeholder='Adoption Status'>
              <option value='available'>Available</option>
              <option value='fostered'>Fostered</option>
              <option value='adopted'>Adopted</option>
            </Select>

            <Input size='lg' type={'number'} mt={10} placeholder='Weight' />
            <Input size='lg' type={'number'} mt={10} placeholder='Height' />
            <Input size='lg' type={'number'} mt={10} placeholder='Name' />

          </Box>}

          <Button onClick={handleSearch} w={'150px'} mt={9} colorScheme='teal'>Search 🔍</Button>


        </Box>

      </Container>
    </>
  )
}

export default Pets