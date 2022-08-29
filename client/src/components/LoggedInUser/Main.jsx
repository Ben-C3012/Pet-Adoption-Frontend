import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SplitScreen() {
    const navigate = useNavigate()

    const [name, setName] = useState('')


    useEffect(() => {
        const res = axios({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/users/isloggedin',
            withCredentials: true
        })


            .then(res => {
                setName(res.data.user.name)
            })
    }, [])


    const handleSearchClick = () => {
        navigate('/pets', { replace: true })
    }





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
                        <Button rounded={'full'}>How It Works</Button>
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