import { Container, Box, Heading, Input, Select, Button, Checkbox, FormLabel } from '@chakra-ui/react'

import './pets.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PetCard from './PetCard'
const axios = require('axios').default;


function Pets() {
  const [pets, setPets] = useState([])
  const [checkbox, setCheckbox] = useState(false)

  // Form States
  const [type, setType] = useState('')
  const [adoptionStatus, setAdoptionStatus] = useState('')
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')


  // Handlers
  const handleCheckbox = () => setCheckbox(!checkbox)

  const handleType = (e) => setType(e.target.value)
  const handleAdoptionStatus = (e) => setAdoptionStatus(e.target.value)
  const handleWeight = (e) => setWeight(e.target.value)
  const handleHeight = (e) => setHeight(e.target.value)
  const handleName = (e) => setName(e.target.value)



  // Search Handlers
  const handleSearch = () => {
    axios.get(`http://localhost:8080/api/v1/pets/?type=${type}`)
      .then(res => {
        console.log(res.data.data.pets)
        setPets(res.data.data.pets)
      })
      .catch(err => console.log(err))
  }

  const handleAdvancedSearch = () => {
    axios.get(`http://localhost:8080/api/v1/pets/?type=${type}&adoptionStatus=${adoptionStatus}&name=${name}&weight=${weight}&height=${height}`)
      .then(res => {
        console.log(res.data.data.pets)
        setPets(res.data.data.pets)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Link to={'/'}>Back To Home</Link>
      <Container h={'100%'} maxW={'3xl'} bg='linkedin.300' centerContent mt={'30'} sx={{ borderRadius: "10px" }} >
        <Box mt={4} w={'100%'} padding='4' color='black' maxW='2xl'>
          <Heading>Search For A Pet 🐶 </Heading>
          <Checkbox onChange={handleCheckbox} mt={10} defaultChecked={false}>Advanced Search</Checkbox>


          <Select onChange={handleType} size='lg' mt={10} variant={'outline'} placeholder='Select Animal Type'>
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
          </Select>

          {!!checkbox && <Box>


            <Select onChange={handleAdoptionStatus} size='lg' mt={10} variant={'outline'} placeholder='Adoption Status'>
              <option value='available'>Available</option>
              <option value='fostered'>Fostered</option>
              <option value='adopted'>Adopted</option>
            </Select>

            <FormLabel mt={5} color={'black'}>Weight</FormLabel>
            <Input onChange={handleWeight} size='lg' type={'number'} />
            <FormLabel mt={5} color={'black'}>Height</FormLabel>
            <Input onChange={handleHeight} size='lg' type={'number'} />
            <FormLabel mt={5} color={'black'}>Name</FormLabel>
            <Input onChange={handleName} size='lg' type={'text'} />

          </Box>}

          {!checkbox && <Button onClick={handleSearch} w={'150px'} mt={9} colorScheme='teal'>Search 🔍</Button>}
          {checkbox && <Button onClick={handleAdvancedSearch} w={'150px'} mt={9} colorScheme='teal'>Search 🔍</Button>}



        </Box>

        {pets && pets.map(pet => {
          return <PetCard key={pet._id} type={pet.type} petName={pet.name} adoptionStatus={pet.adoptionStatus} bio={pet.bio}
            breed={pet.breed} color={pet.color} dietaryRestrictions={pet.dietaryRestrictions} picture={pet.photo} />
        })}


      </Container>



    </>
  )
}

export default Pets