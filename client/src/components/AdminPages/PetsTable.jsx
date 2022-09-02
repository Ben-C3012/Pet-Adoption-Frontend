import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,

} from '@chakra-ui/react'
import { useState } from 'react'

function PetsTable(props) {
    const { pets } = props

    const AdoptionStatusColor = (adoptionStatus) => {
        switch (adoptionStatus) {
            case 'Available':
                return 'green'
            case 'Fostered':
                return 'orange.400'
            case 'Adopted':
                return 'red.400'
        }
    }

    const handleClick = (event) => {
         console.log(event.currentTarget.id)
    }


    return (
        <>
            <Flex justify={'center'} >
                <TableContainer p={8} w={'50rem'}>
                    <Table size={'lg'} variant='simple'>

                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Adoption Status</Th>
                                <Th isNumeric>Breed</Th>
                            </Tr>
                        </Thead>

                        <Tbody>

                            {pets.map(pet => {
                                return <Tr key={pet._id}>
                                    <Td fontWeight={'medium'}>{pet.name}</Td>
                                    <Td  id= {pet.id} onClick={handleClick} color={AdoptionStatusColor(pet.adoptionStatus)} fontWeight={'600'}>{pet.adoptionStatus} </Td>
                                    <Td fontWeight={'medium'} isNumeric>{pet.breed}  </Td>
                                </Tr>
                            })}


                        </Tbody>


                    </Table>
                </TableContainer>

            </Flex>


        </>
    )
}

export default PetsTable