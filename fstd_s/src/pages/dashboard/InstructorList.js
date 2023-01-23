import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'instructor_id',
    headerName: 'Instructor Id',
    type: 'number',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', instructor_id: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', instructor_id: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', instructor_id: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', instructor_id: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', instructor_id: 54 },
  { id: 6, lastName: 'Melisandre', firstName: null, instructor_id: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara',instructor_id: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', instructor_id: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', instructor_id: 65 },
];

export default function InstructorList() {
  return (
    <Box sx={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10000}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
