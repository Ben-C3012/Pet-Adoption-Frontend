import React from 'react'
import Login from './Login'
import Register from './Register'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function ToggleRegister() {
  
    return (
        <Tabs>
            <TabList>
                <Tab>Login</Tab>
                <Tab>Register</Tab>

            </TabList>

            <TabPanels>
                <TabPanel>

                    <Login />

                </TabPanel>
                <TabPanel>

                    <Register />

                </TabPanel>

            </TabPanels>
        </Tabs>
    )
}

export default ToggleRegister