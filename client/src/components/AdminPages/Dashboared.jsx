import { useEffect, useState } from "react"
import axios from "axios"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Heading } from '@chakra-ui/react'
import * as React from "react";
import UsersTable from "./UsersTable";
import MainTable from "./tables/MainTable";

export default function Dashboared() {

  const [users, setUsers] = useState([])
  const [pets, setPets] = useState([])


  useEffect(() => {

    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/users/',
      withCredentials: true
    })

      .then(res => {
        console.log(res.data.data.users)
        setUsers(res.data.data.users)


      })
      .catch(err => console.log(err.message))


    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/pets/',
      withCredentials: true
    })

      .then(res => {
        // console.log('res', res.data.data.pets)
        setPets(res.data.data.pets)

      })




  }, [])







  return (
    <>


      <Tabs >
        <TabList>

          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Users</Tab>
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>Pets</Tab>

        </TabList>

        <TabPanels>
          <TabPanel>

            

            <MainTable users={users} />


          </TabPanel>



          <TabPanel>









          </TabPanel>

        </TabPanels>


      </Tabs>




    </>
  )
}



