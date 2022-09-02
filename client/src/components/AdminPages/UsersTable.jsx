import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Button,
    Link

} from '@chakra-ui/react'
import { useState } from 'react'
import InfoModal from './InfoModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




function UsersTable(props) {
    const { users } = props
    const navigate = useNavigate()

    const handleClick = (event) => {
        console.log(event.currentTarget.id)
        // navigate({ pathname: '/user', search:`?id=${event.currentTarget.id}` });

    }

    // const handleUserInfo = (event) => {
    //     console.log(event.currentTarget.id)
    //     const userId = event.currentTarget.id
    //     axios({
    //         method: 'GET',
    //         url: `http://localhost:8080/api/v1/users/${userId}`,
    //         withCredentials: true
    //     })

    //         .then(res => {
    //             console.log(res.data.data)
    //         })

    // }



    return (
        <>


            <div style={{ display: 'none' }}>
                <InfoModal />
            </div>


            <Flex justify={'center'} >
                <TableContainer p={8} w={'50rem'}>
                    <Table size={'lg'} variant='simple'>

                        <Thead>
                            <Tr>
                                <Th>UserName</Th>
                                <Th>Email</Th>
                                <Th isNumeric>Role</Th>
                                <Th isNumeric>Actions</Th>
                            </Tr>
                        </Thead>

                        <Tbody>

                            {users.map(user => {
                                return <Tr key={user._id}>
                                    <Td onClick={handleClick} fontWeight={'600'}> <Link onClick={handleClick} id={user._id}> {user.name}</Link>   </Td>
                                    <Td fontWeight={'600'}>{user.email}</Td>
                                    <Td color={user.role === 'user' ? 'green.500' : 'blue.400'} fontWeight={'bold'} isNumeric>{user.role}  </Td>
                                    <Td><Button>+</Button></Td>

                                </Tr>


                            })}


                        </Tbody>




                    </Table>
                </TableContainer>

            </Flex>


        </>
    )
}

export default UsersTable