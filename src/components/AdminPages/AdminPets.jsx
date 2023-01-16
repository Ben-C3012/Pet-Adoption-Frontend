import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';

function AdminPets(props) {

    const { name, adoptionStatus, breed, color, photo, bio, hypoallergeni, dietaryRestrictions } = props

    return (
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">


                <Image
                    src={photo}
                    alt={`Picture of ${name}`}
                    roundedTop="lg"
                />

                <Box p="6">
                    <Box d="flex" alignItems="baseline">

                        <Badge m={2} rounded="full" px="2" fontSize="0.8em" colorScheme="blue">
                            {breed}
                        </Badge>
                        <Badge m={2} rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                            {adoptionStatus}
                        </Badge>
                        <Badge m={2} rounded="full" px="2" fontSize="0.8em" colorScheme="white">
                            {color}
                        </Badge>



                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {name}
                        </Box>

                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">

                        <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                            {bio}
                        </Box>
                    </Flex>
                </Box>


            </Box>
        </Flex>
    );
}

export default AdminPets;