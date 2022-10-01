
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Tweet() {
    return (
        <Center py={5} mt = {10}>
            <Box
                maxW={'500px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>

                <Stack >

                    <Stack  direction={'row'} spacing={4} align={'center'}>
                        <Avatar
                            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                            alt={'Author'}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>Achim Rolle</Text>
                            <Text color={'gray.500'}>Feb 08, 2021</Text>
                        </Stack>
                        
                    </Stack>
                   
                    <Text color={useColorModeValue('gray.900' , 'white')}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                        et ea rebum.
                    </Text>

                </Stack>

            </Box>
        </Center>
    );
}