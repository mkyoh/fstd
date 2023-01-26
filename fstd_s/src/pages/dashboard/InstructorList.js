import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import ReactDOM from "react-dom";

import React, { useState, useEffect, useReducer } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import axios from '../../../src/utils/axios';
import { isValidToken, setSession } from '../../../src/utils/jwt';

import "./DataTableDemo.css";
import { useDispatch } from "../../redux/store";

const InstructorList = () => {
  const dispatch = useDispatch();
  const [customers1, setCustomers1] = useState([]);
  const [customers2, setCustomers2] = useState(null);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    instructorid: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [loading1, setLoading1] = useState(true);



  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
    
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
    const response = await axios.get("/MasterData/api/V1.0/Instructor/GetAll");
    const masterData= response.data;
    console.log(masterData)
    response && masterData ? setLoading1(false) : null
    response && masterData.status == 1 ? setCustomers1(masterData.instructorsRes) : null
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isAuthenticated: true,
        masterData,
      },
    });
  } else {
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isAuthenticated: false,
        masterData: null,
      },
    });
  }
} catch (err) {
 
  dispatch({
    type: 'INITIALIZE',
    payload: {
      isAuthenticated: false,
      masterData: null,
    },
  });
}
};

initialize();
}, []);


  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal"
  ];

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };
  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} /> */}
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

 


 
  const header1 = renderHeader1();
  
  

  return (
    <div className="datatable-filter-demo">
      <div className="card">
        <h5>Instructor List</h5>
        {/* <p>Filters are displayed in an overlay.</p> */}
       
        <DataTable
        value={customers1}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          filters={filters1}
          filterDisplay="menu"
          loading={loading1}
          responsiveLayout="scroll"
          globalFilterFields={[
            "firstName",
            "lastName",
            "instructorId",
      
          ]}
          header={header1}
          emptyMessage="No customers found."
        >
            <Column
             field="id"
             header="Id"
            />
          <Column
            field="firstName"
            header="First Name"
            style={{ minWidth: "12rem" }}
          />
          <Column
             field="lastName"
             header="Last Name"
             style={{ minWidth: "12rem" }}
            
          />
          <Column
             field="instructorId"
             header="InstructorId"
             style={{ minWidth: "14rem" }}
          />
        </DataTable>
      </div>
        </div>
  );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<InstructorList />, rootElement);



export default InstructorList;