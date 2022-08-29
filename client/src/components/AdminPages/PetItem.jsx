import React from 'react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

function PetItem(props) {
  const { name, id } = props
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({ pathname: '/pet', search: `?id=${id}` });
  }

  return (

    <>

      <Link onClick={handleClick} isExternal m={4}>
        {name} <ExternalLinkIcon mx='2px' />
      </Link>


    </>


  )
}

export default PetItem