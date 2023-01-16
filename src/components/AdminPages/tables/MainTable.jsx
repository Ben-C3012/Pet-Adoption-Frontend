import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button
} from '@chakra-ui/react'
import axios from 'axios'
import InfoModal from '../InfoModal'

function MainTable(props) {
    const { users } = props

    




    return (
        <>


            <Table>
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => {
                        return <Tr key={user._id}>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <InfoModal id={user._id}>+</InfoModal>
                            </Td>
                        </Tr>
                    })}

                </Tbody>
            </Table>



        </>
    )
}

export default MainTable