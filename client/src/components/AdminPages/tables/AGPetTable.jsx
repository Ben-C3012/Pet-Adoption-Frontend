import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useNavigate } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
import { appUrl } from '../../../config';


const AGPetTable = (props) => {
  const navigate = useNavigate()

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'name' },
    { field: 'adoptionStatus' },
    { field: 'breed' },
    { field: 'type', sortable: true, filter: true }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    // console.log('cellClicked', event);
    console.log(event.data._id)
    const id = event.data._id
    navigate({ pathname: '/pet', search: `?id=${id}` });

  }, []);

  // Example load data from sever
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${appUrl}/api/v1/pets/`,
    })
      .then(res => {
        console.log(res.data.data.pets)
        setRowData(res.data.data.pets)
      })


  }, []);

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>

      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Clear Selection</button>

      {/* On div wrAGPetTableing Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: 830, height: 800, alignContent: 'center' }}>



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

export default AGPetTable;