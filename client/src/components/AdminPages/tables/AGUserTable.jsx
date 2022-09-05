import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import InfoModal from '../InfoModal';
import UserCard from './UserCard';



const AGUserTable = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalRef = useRef()
  const [user, setUser] = useState('')

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'name' },
    { field: 'email' },
    { field: 'role' }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    console.log('Event Data', event.data)
    setUser(event.data)
    modalRef.current.click()



  }, []);

  // Example load data from sever
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/users/',
      withCredentials: true
    })
      .then(res => {
        console.log(res.data.data.users)
        setRowData(res.data.data.users)
      })


  }, []);

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      <Button
        ref={modalRef}
        display={'none'}
        onClick={() => { onOpen() }}>

        +</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>


            <UserCard user={user} />



          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>



      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

      {/* On div wrAGUserTableing Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: 650, height: 800, borderRadius: '30px' }}>



        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API

          rowData={rowData} // Row Data for Rows

          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties

          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows

          onCellDoubleClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>

  );
};

export default AGUserTable;