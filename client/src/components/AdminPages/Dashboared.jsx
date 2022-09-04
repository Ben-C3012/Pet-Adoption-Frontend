import { Tabs, TabList, TabPanels, Tab, TabPanel, Center } from '@chakra-ui/react'
import * as React from "react";
import AGPetTable from "./tables/AGPetTable";
import AGUserTable from "./tables/AGUserTable";

export default function Dashboared() {

  return (
    <>

      <Tabs >
        <TabList>

          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Users</Tab>
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>Pets</Tab>

        </TabList>

        <TabPanels>
          <TabPanel>

            <Center>
              <AGUserTable />
            </Center>

          </TabPanel>

          <TabPanel>

            <Center>
              <AGPetTable />
            </Center>

          </TabPanel>

        </TabPanels>


      </Tabs>








    </>
  )
}



