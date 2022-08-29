import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    AccordionIcon,
    Text
} from '@chakra-ui/react'


import React from 'react'
import PetItem from './PetItem'

function Acordion(props) {
    const { savedPets, currentPets } = props


   

    return (
        <Accordion defaultIndex={[0]} allowMultiple w={'25rem'}>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            Saved Pets
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} >
                    {savedPets.length === 0 && <Text>No Saved Pets</Text>}

                    {savedPets.map(pet => {
                        return <PetItem key={pet._id} name={pet.name} id={pet._id} />
                    })}

                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            Current Pets
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {currentPets.length === 0 && <Text>No Current Pets</Text>}

                    {currentPets.map((pet , index) => {
                        return <PetItem key={index} name={pet.name} id={pet._id} />
                    })}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default Acordion