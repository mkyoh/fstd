import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import ReactDOM from "react-dom";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import axios from '../../../src/utils/axios';
import { isValidToken, setSession } from '../../../src/utils/jwt';
import "./DataTableDemo.css";
import { useDispatch } from "../../redux/store";
import { GetAllInstructors } from "../Service";


const InstructorList = () => {
  let emptyInstructor = {
    firstName: "",
    lastName: "",
    instructorId: "",

  };

  const [InstructorDialog, setInstructorDialog] = useState(false);
  const [deleteInstructorDialog, setDeleteInstructorDialog] = useState(false);
  const [deleteInstructorsDialog, setDeleteInstructorsDialog] = useState(false);
  const [instructor, setInstructor] = useState(emptyInstructor);
  const [instructors, setInstructors] = useState(emptyInstructor);
  const [selectedInstructors, setSelectedInstructors] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [customers1, setCustomers1] = useState([]);
  const toast = useRef(null);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    instructorid: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [loading1, setLoading1] = useState(true);
  const getInstructors = useCallback(async () => {
    const data = await GetAllInstructors();
    setCustomers1(data)
  
    setLoading1(false)
  }, [])
  useEffect(() => {

    getInstructors()

  }, [getInstructors]);
  const confirmDeleteInstructor = (instructor) => {
    setInstructor(instructor);
    setDeleteInstructorDialog(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteInstructorsDialog(true);
  };
  const openNew = () => {
    setInstructor(emptyInstructor);
    setSubmitted(false);
    setInstructorDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setInstructorDialog(false);
  };

  const hideDeleteInstructorDialog = () => {
    setDeleteInstructorDialog(false);
  };

  const hideDeleteInstructorsDialog = () => {
    setDeleteInstructorsDialog(false);
  };
  const onInputChange = (e, firstName) => {
    const val = (e.target && e.target.value) || "";
    let _instructor = { ...instructor };
    _instructor[`${firstName}`] = val;

    setInstructor(_instructor);
  };
  const saveInstructor = () => {
    setSubmitted(true);
    console.log(instructor)
    if (instructor.firstName.trim()) {
      let _instructors = { ...instructors };
      let _instructor = { ...instructor };
      const accessToken = window.localStorage.getItem('accessToken');
      if (_instructor.id) {
        let list1 = {
          id: instructor.id,
          firstName: instructor.firstName,
          lastName: instructor.lastName,
          instructorId: instructor.instructorId,
        }
       axios({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "put",
          url: "/MasterData/api/V1.0/Instructor/Update",
          data: list1,
        },
        );
       // setCustomers1((prev) => {...prev,response.data}),
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Schedule Updated",
          life: 3000
        });
      } else {
        let list = {
          firstName: instructor.firstName,
          lastName: instructor.lastName,
          instructorId: instructor.instructorId,
        }
        axios({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "post",
          url: "/MasterData/api/V1.0/Instructor/Create",
          data: list,
        })
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "instructor Created",
          life: 3000
        });
      }

      setInstructors(_instructors);
      setInstructorDialog(false);
      setInstructor(emptyInstructor);
    }
  };


  const editInstructor = (instructor) => {
    setInstructor({ ...instructor });
    setInstructorDialog(true);
  };
  const InstructorDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveInstructor}
      />
    </React.Fragment>
  );
  const deleteInstructor = () => {
    let _instructors = instructors.filter((val) => val.id !== instructor.id);
    setInstructors(_instructors);
    setDeleteInstructorDialog(false);
    setInstructor(emptyInstructor);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Instructor Deleted",
      life: 3000
    });
  }; const deleteSelectedInstructors = () => {
    let _instructors = schedules.filter((val) => !selectedInstructors.includes(val));
    setInstructors(_instructors);
    setDeleteInstructorsDialog(false);
    setSelectedInstructors(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "instructors Deleted",
      life: 3000
    });
  };

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const accessToken = window.localStorage.getItem('accessToken');

  //       if (accessToken && isValidToken(accessToken)) {
  //         setSession(accessToken);
  //         const response = await axios.get("/MasterData/api/V1.0/Instructor/GetAll");
  //         const masterData = response.data;
  //         console.log(masterData)
  //         response && masterData ? setLoading1(false) : null
  //         response && masterData.status == 1 ? setCustomers1(masterData.instructorsRes) : null
  //         dispatch({
  //           type: 'INITIALIZE',
  //           payload: {
  //             isAuthenticated: true,
  //             masterData,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: 'INITIALIZE',
  //           payload: {
  //             isAuthenticated: false,
  //             masterData: null,
  //           },
  //         });
  //       }
  //     } catch (err) {

  //       dispatch({
  //         type: 'INITIALIZE',
  //         payload: {
  //           isAuthenticated: false,
  //           masterData: null,
  //         },
  //       });
  //     }
  //   };

  //   initialize();
  // }, []);


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


  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedInstructors || !selectedInstructors.length}
        />
      </React.Fragment>
    );
  };

  const deleteInstructorDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteInstructorDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteInstructor}
      />
    </React.Fragment>
  );
  const deleteInstructorsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteInstructorsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedInstructors}
      />
    </React.Fragment>
  );
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editInstructor(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteInstructor(rowData)}
        />
      </React.Fragment>
    );
  };

  const header1 = renderHeader1();



  return (
    <div className="datatable-filter-demo">
      <Toast ref={toast} />
      <div className="card">
        <h5>Instructor List</h5>
        {/* <p>Filters are displayed in an overlay.</p> */}
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
        ></Toolbar>
        <DataTable
          value={customers1}
          selection={selectedInstructors}
          onSelectionChange={(e) => setSelectedInstructors(e.value)}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="firstName"
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
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
          
             header= 'Id'
             field="id"
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
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog visible={InstructorDialog} style={{ width: '450px' }} header="Instructors Details" modal className="p-fluid" footer={InstructorDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <InputText id="firstName" value={instructor.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !instructor.firstName })} />
          {submitted && !instructor.firstName && <small className="p-error">first Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <InputText id="lastName" value={instructor.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !instructor.lastName })} />
          {submitted && !instructor.lastName && <small className="p-error">Last Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="instructorId">InstructorId</label>
          <InputText id="instructorId" value={instructor.instructorId} onChange={(e) => onInputChange(e, 'instructorId')} required autoFocus className={classNames({ 'p-invalid': submitted && !instructor.instructorId })} />
          {submitted && !instructor.instructorId && <small className="p-error">first Name is required.</small>}
        </div>
      </Dialog>
      <Dialog
        visible={deleteInstructorDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteInstructorDialogFooter}
        onHide={hideDeleteInstructorDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {instructor && (
            <span>
              Are you sure you want to delete <b>{instructor.instructorId}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteInstructorsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteInstructorsDialogFooter}
        onHide={hideDeleteInstructorsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {instructor && (
            <span>Are you sure you want to delete the selected instructors?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<InstructorList />, rootElement);



export default InstructorList;