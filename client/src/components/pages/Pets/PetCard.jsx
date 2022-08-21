import { Center, Image, Box, Text } from '@chakra-ui/react'
import { useColorModeValue, Heading, Stack } from '@chakra-ui/react';


function PetCard(props) {
    const { type, petName, adoptionStatus, bio, breed, color, dietaryRestrictions, picture } = props

    return (

        <>

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
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            {petName}
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            {breed}
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                {adoptionStatus}
                            </Text>

                        </Stack>
                        <Text>{color}</Text>
                        <Text>Hypoallergenioic</Text>
                        <Text>{dietaryRestrictions}</Text>
                        <Text>{bio}</Text>

                    </Stack>
                </Box>
            </Center>


        </>

    )


}

export default PetCard




