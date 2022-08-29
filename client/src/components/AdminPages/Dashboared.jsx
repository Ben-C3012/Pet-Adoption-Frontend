import { Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import User from "./User"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AdminPets from "./AdminPets"
import { SchemaTypeOptions } from "mongoose"
function Dashboared() {

  const [users, setUsers] = useState([])
  const [pets, setPets] = useState([])


  useEffect(() => {

    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/users/',
      withCredentials: true
    })

      .then(res => {
        setUsers(res.data.data.users)
        // console.log('users', users)

      })
      .catch(err => console.log(err.message))


    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/pets/',
      withCredentials: true
    })

      .then(res => {
        console.log('res', res.data.data.pets)
        setPets(res.data.data.pets)

      })




  }, [])



  return (
    <>
      <Tabs>
        <TabList>

          <Tab>Users</Tab>
          <Tab>Pets</Tab>

        </TabList>

        <TabPanels>
          <TabPanel>


            <Heading textAlign={'center'} mt={2} as="h1" fontSize="4xl">
              Users
            </Heading>

            {users.map(user => {
              return <User key={user._id} id={user._id} name={user.name} email={user.email} phoneNumber={user.phoneNumber} photo={user.photo} role={user.role} savedPets={user.savedPets} currentPets={user.currentPets} />
            })}

          </TabPanel>

          <Heading textAlign={'center'} mt={2} as="h1" fontSize="4xl">
            Pets
          </Heading>

          {/* <AdminPets  /> */}
          {pets.map(pet => {
            return <AdminPets key = {pet._id} name={pet.name} adoptionStatus  = {pet.adoptionStatus} breed = {pet.breed} color = {pet.color} photo = {pet.photo} bio = {pet.bio} hypoallergenic = {pet.hypoallergenic} dietaryRestrictions = {pet.dietaryRestrictions}  />
          })}



          <TabPanel>





          </TabPanel>

        </TabPanels>
      </Tabs>



    </>
  )
}

export default Dashboared