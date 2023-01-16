import { Tabs, TabList, TabPanels, Tab, TabPanel, Center } from '@chakra-ui/react'
import * as React from "react";
import Stats from './Stats';
import AGPetTable from "./tables/AGPetTable";
import AGUserTable from "./tables/AGUserTable";

export default function Dashboared() {

  return (
    <>

      <Tabs >
        <TabList>

          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Users</Tab>
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>Pets</Tab>
          <Tab _selected={{ color: 'white', bg: 'purple.500' }}>Stats</Tab>


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

          <TabPanel>

            <Center>

              <Stats />

            </Center>

          </TabPanel>

        </TabPanels>


      </Tabs>








    </>
  )
}



