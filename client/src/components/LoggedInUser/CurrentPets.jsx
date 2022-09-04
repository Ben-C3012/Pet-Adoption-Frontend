import {
    Heading,
    Box,
    Center,
    Image,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'

export default function CurrentPets(props) {
    const { name, adoptionStatus, photo, id } = props
    const navigate = useNavigate()

    const handleClick = (event) => {
        console.log(event.currentTarget.id)
        navigate({ pathname: '/pet', search: `?id=${id}` });
    }
    
    return (
        <Center py={6}>
            <Box
                maxW={'500px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>

                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        photo
                    }
                    objectFit={'cover'}
                />

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'}>{adoptionStatus}</Text>
                    </Stack>

                    <Button
                      onClick={handleClick}
                        w={'full'}
                        mt={8}
                        bg={useColorModeValue('gray.900', 'teal.400')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}>
                        Read More
                    </Button>
                    
                </Box>
            </Box>
        </Center>
    );
}