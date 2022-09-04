import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Text, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios';
import CurrentPets from './CurrentPets'
import SavedPets from './SavedPets'
import { useState, useEffect } from 'react';
import { BiBone } from 'react-icons/bi'
import { GiHearts } from 'react-icons/gi'
function MyPets() {

  // Pet Data 
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [adoptionStatus, setAdoptionStatus] = useState('')

  // Pet Arrays
  const [savedPets, setSavedPets] = useState([])
  const [currentPets, setCurrentPets] = useState([])



  useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/users/isloggedin',
      withCredentials: true
    })

      .then(res => {
        setCurrentPets(res.data.user.currentPets)
        setSavedPets(res.data.user.savedPets)
        console.log(currentPets)
      })
      .catch(err => console.log(err.message))
  }, [])



  return (

    <Center>
      <Tabs w={'1200px'} p={'4rem'} mt={'3rem'} variant='soft-rounded' >
        <TabList>
          <Tab>Saved Pets  &nbsp;  <GiHearts /> </Tab>
          <Tab>Current Pets &nbsp;  <BiBone  /></Tab>
        </TabList>
        <TabPanels>
          <TabPanel>

            {savedPets.length === 0 ? <Text>You Don't have Any Pets Saved Pets</Text> : ''}
            {savedPets.map(pet => {
              return <SavedPets key={pet._id} id={pet._id} name={pet.name} adoptionStatus={pet.adoptionStatus} photo={pet.photo} />
            })}


          </TabPanel>
          <TabPanel>

            {currentPets.length === 0 ? <Text>You Don't have Any Pets</Text> : ''}
            {currentPets.map(pet => {
              return <SavedPets key={pet._id} id={pet._id} name={pet.name} adoptionStatus={pet.adoptionStatus} photo={pet.photo} />
            })}


          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  )
}

export default MyPets