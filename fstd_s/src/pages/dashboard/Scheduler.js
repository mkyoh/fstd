import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AdminPanelSettings } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'day',
    headerName: 'Day',
    width: 150,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    editable: true,
  },
  {
    field: 'flighthours',
    headerName: 'Flight duration',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'instructor',
    headerName: 'Instructor',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: true,
  },
  {
    field: 'trainees',
    headerName: 'Trainees',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: true,
  },
  {
    field: 'trainingType',
    headerName: 'Training Type',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: true,
  },
  {
    field: 'lesson',
    headerName: 'Lesson',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: true,
  },
  {
    field: 'trainingremark',
    headerName: 'Training Remark',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: true,
  },
];

const rows = [
  { id: 1, day: 'Monday', date: '12/11/2022', flighthours: 4, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  { id: 2, day: 'Tuesday', date: '12/11/2022', flighthours: 4, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  { id: 3, day: 'Monday', date: '12/11/2022', flighthours: 2, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  { id: 4, day: 'Monday', date: '12/11/2022', flighthours: 2, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  { id: 5, day: 'Monday', date: '12/11/2022', flighthours: 2, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  { id: 6, day: 'Monday', date: '12/11/2022', flighthours: 2, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  { id: 7, day: 'Monday', date: '12/11/2022', flighthours: 2, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  { id: 8, day: 'Monday', date: '12/11/2022', flighthours: 2, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  { id: 9, day: 'Monday', date: '12/11/2022', flighthours: 2, instructor:'Fitsum.A', trainees:'khalid.A and AdminPanelSettings.A',trainingType:'ggg', lesson:'kkk',trainingremark:'fff'},
  
];

export default function SchedulerForm() {
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
