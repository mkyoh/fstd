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
    field: 'trainee_id',
    headerName: 'Trainee Id',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];
// const post = async (firstName, lastName,Gender) => {
//   // console.log(userName + "gggg"+password)
//   const response = await axios({
//     url: '/MasterData/api/V1.0/Trainee/Create',
//     method:"post",
//     // headers: {
//     //   "Access-control-Allow-Credentials": true,
//     // },
//      data: {
//       firstName,
//       password,
//     },
  
    
//   });
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', trainee_id: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', trainee_id: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', trainee_id: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', trainee_id: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', trainee_id: 54 },
  { id: 6, lastName: 'Melisandre', firstName: null, trainee_id: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', trainee_id: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', trainee_id: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', trainee_id: 65 },
];

export default function TraineeList() {
  return (
    <Box sx={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
