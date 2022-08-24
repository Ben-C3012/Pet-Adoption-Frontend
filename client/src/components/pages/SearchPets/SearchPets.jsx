import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,

} from '@chakra-ui/react';



import { useState } from 'react';

export default function SearchPets() {

    const [checkbox, setCheckbox] = useState(true)
    const handleCheckbox = () => setCheckbox(!checkbox)

    // Form info

    const [fromInfo, setFormInfo] = useState('')

    // const handleFormInfo = (e) => {
    //     setFormInfo({ ...noteInfo, [e.target.name]: e.target.value })
    // }


    return (

        <>
            

            <Flex
                minH={'100vh'}
                align={'start'}
                justify={'start'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'xl '} width={'xl'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Search For Pets</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>

                            <Checkbox onChange={handleCheckbox}>Advanced Search</Checkbox>


                            <FormControl>
                                <FormLabel>Type</FormLabel>
                                <Select placeholder=' Select Type'>
                                    <option value='available'>Dog</option>
                                    <option value='adopted'>Cat</option>
                                </Select>
                            </FormControl>


                            {checkbox &&

                                <>

                                    <FormControl>
                                        <FormLabel>Adoption Status</FormLabel>
                                        <Select placeholder=' Select Adoption Status'>
                                            <option value='available'>Available</option>
                                            <option value='fostered'>Fostered</option>
                                            <option value='adopted'>Adopted</option>
                                        </Select>
                                    </FormControl>



                                    <FormControl>
                                        <FormLabel>Weight</FormLabel>
                                        <Input type={'number'} />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Height</FormLabel>
                                        <Input min={0} type={'number'} />
                                    </FormControl>


                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input type={'name'} />
                                    </FormControl>
                                </>
                            }



                            <Stack spacing={10}>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Search
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>

    );
}