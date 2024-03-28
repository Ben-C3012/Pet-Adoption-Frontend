import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../App';


export default function SplitScreen() {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [name, setName] = useState('')

    console.log('User:', user ? user.name : 'User not logged in');

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleSearchClick = () => navigate('/pets', { replace: true })
 
    return (
        <Stack minH={'60vh'} direction={{ base: 'column', md: 'row' }}>

            <Flex p={8} flex={1} align={'center'} justify={'center'}>

                <Stack spacing={6} w={'full'} maxW={'lg'}>

                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <br />{' '}
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'blue.400',
                                zIndex: -1,
                            }}>
                            {name}
                        </Text>

                        <br />{' '}
                        <Text color={'teal.400'} as={'span'}>
                            Welcome Back
                        </Text>{' '}

                    </Heading>

                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        Adopt Your Next Best Friend Or Save One For Later.
                    </Text>

                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>

                        <Button onClick={handleSearchClick}
                            rounded={'full'}
                            bg={'teal.400'}
                            color={'white'}
                            _hover={{
                                bg: 'teal.500',
                            }}>
                            Search For Pets
                        </Button>

                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>

                <Image
                    mt={'240px'}
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Dog_re_fijp.svg'
                    }
                />

            </Flex>
        </Stack>
    );
}