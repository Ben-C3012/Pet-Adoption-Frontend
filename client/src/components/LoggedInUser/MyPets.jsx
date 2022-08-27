import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function MyPets() {

  const [currentPets, setCurrentPets] = useState('')
  const [savedPets, setSavedPets] = useState('')

   

  useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/users/isloggedin',
      withCredentials: true
    })

      .then(res => {
        console.log('Current Pets', res.data.user.currentPets)
        console.log('Saved Pets', res.data.user.savedPets)

      })
      .catch(err => console.log(err.message))
  }, [])




  return (
    <>

      <Alert status='info'>
        <AlertIcon />
        Chakra is going live on August 30th. Get ready!
      </Alert>

    </>
  )
}

export default MyPets