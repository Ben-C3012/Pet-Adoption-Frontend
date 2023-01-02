import { Center, Image, Box, Text } from '@chakra-ui/react'
import { useColorModeValue, Heading, Stack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function PetCard(props) {
    const navigate = useNavigate()
    const { petName, adoptionStatus, breed, picture, id } = props

    const handleClick = (event) => {
        console.log(event.currentTarget.id)
        navigate({ pathname: '/pet', search: `?id=${id}` });
    }

    const ToggleColor = useColorModeValue('gray.800', 'white')


    return (

        <>
            <motion.div
                animate={{ y: -10, transition: { duration: 0.5 }, opacity: 1 }}
                initial={{ scale: 1, opacity: 0 }}
            >

                <Center py={12}>
                    <Box
                        role={'group'}
                        p={6}
                        maxW={'330px'}
                        w={'full'}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'2xl'}
                        rounded={'lg'}
                        pos={'relative'}
                        zIndex={1}>

                        <Box
                            rounded={'lg'}
                            mt={-12}
                            pos={'relative'}
                            height={'230px'}
                            _after={{
                                transition: 'all .3s ease',
                                content: '""',
                                w: 'full',
                                h: 'full',
                                pos: 'absolute',
                                top: 5,
                                left: 0,
                                backgroundImage: `url(${picture})`,
                                filter: 'blur(15px)',
                                zIndex: -1,
                            }}
                            _groupHover={{
                                _after: {
                                    filter: 'blur(20px)',
                                },
                            }}>

                            <Image
                                rounded={'lg'}
                                height={230}
                                width={282}
                                objectFit={'cover'}
                                src={picture}
                            />

                        </Box>
                        <Stack pt={10} align={'center'}>

                            <Text color={'gray.500'} fontSize={'lg'}>
                                {petName}
                            </Text>

                            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={ToggleColor}>
                                {breed}
                            </Heading>

                            <Stack direction={'row'} align={'center'}>

                                <Text fontWeight={300} fontSize={'xl'} color={ToggleColor}>
                                    {adoptionStatus}
                                </Text>

                            </Stack>

                            <Button

                                bg={useColorModeValue('gray.800', 'blue.400')}
                                onClick={handleClick}
                                _hover={{ bg: 'gray.600' }}
                            >Read More
                            </Button>

                        </Stack>
                    </Box>

                </Center>

            </motion.div>

        </>
    )
}

export default PetCard

