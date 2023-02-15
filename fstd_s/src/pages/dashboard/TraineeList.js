
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FilterMatchMode } from "primereact/api";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from '../../../src/utils/axios';
import { isValidToken, setSession } from '../../../src/utils/jwt';
import "./DataTableDemo.css";
import { useDispatch } from "../../redux/store";
import { GetAllTrainees } from "../Service";

const TraineeList = () => {
  let emptyTrainee = {
    id: null,
    firstName: "",
    lastName: "",
    traineeId: "",
    gender: "",

  };

  const [TraineeDialog, setTraineeDialog] = useState(false);
  const [deleteTraineeDialog, setDeleteTraineeDialog] = useState(false);
  const [deleteTraineesDialog, setDeleteTraineesDialog] = useState(false);
  const [trainee, setTrainee] = useState(emptyTrainee);
  const [trainees, setTrainees] = useState(emptyTrainee);
  const [selectedTrainees, setSelectedTrainees] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [customer, setCustomer1] = useState(false);
  const toast = useRef(null);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    traineeid: { value: null, matchMode: FilterMatchMode.IN },
    gender: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [loading1, setLoading1] = useState(true);
  const getTrainees = useCallback(async () => {

    const data = await GetAllTrainees();
    setCustomer1(data)
    setLoading1(false)
  }, [])
  useEffect(() => {

    getTrainees()

  }, [getTrainees]);

  const confirmDeleteTrainee = (trainee) => {
    setTrainee(trainee);
    setDeleteTraineeDialog(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteTraineesDialog(true);
  };
  const openNew = () => {
    setTrainee(emptyTrainee);
    setSubmitted(false);
    setTraineeDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setTraineeDialog(false);
  };

  const hideDeleteTraineeDialog = () => {
    setDeleteTraineeDialog(false);
  };

  const hideDeleteTraineesDialog = () => {
    setDeleteTraineesDialog(false);
  };
  const saveTrainee = () => {
    setSubmitted(true);

    if (trainee.firstName.trim()) {
      let _trainees = { ...trainees };
      let _trainee = { ...trainee };
      const accessToken = window.localStorage.getItem('accessToken');
      if (_trainee.id) {
        let list1 = {
          id: trainee.id,
          firstName: trainee.firstName,
          lastName: trainee.lastName,
          traineeId: trainee.traineeId,
          Gender: trainee.gender,
        }
        axios({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "put",
          url: "/MasterData/api/V1.0/Trainee/Update",
          data: list1,
        },
        );
        // setCustomers1((prev) => {...prev,response.data}),
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Trainee Updated",
          life: 3000
        });
      } else {
        let list = {
          firstName: trainee.firstName,
          lastName: trainee.lastName,
          traineeId: trainee.traineeId,
          gender: trainee.gender,
        }
        axios({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "post",
          url: "/MasterData/api/V1.0/Trainee/Create",
          data: list,
        })
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "trainee Created",
          life: 3000
        });
      }

      setTrainees(_trainees);
      setTraineeDialog(false);
      setTrainee(emptyTrainee);
    }
  };

  const editTrainee = (trainee) => {
    setTrainee({ ...trainee });
    setTraineeDialog(true);
  };

  const onInputChange = (e, firstName) => {
    const val = (e.target && e.target.value) || "";
    let _trainee = { ...trainee };
    _trainee[`${firstName}`] = val;

    setTrainee(_trainee);
  };


  const TraineeDialogFooter = (
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
        onClick={saveTrainee}
      />
    </React.Fragment>
  );
  const deleteTrainee = () => {
    let _trainees = trainees.filter((val) => val.id !== trainee.id);
    setTrainees(_trainees);
    setDeleteTraineeDialog(false);
    setTrainee(emptyTrainee);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Trainee Deleted",
      life: 3000
    });
  }; const deleteSelectedTrainees = () => {
    let _trainees = trainees.filter((val) => !selectedTrainees.includes(val));
    setTrainees(_trainees);
    setDeleteTraineesDialog(false);
    setSelectedTrainees(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "trainees Deleted",
      life: 3000
    });
  };
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
          disabled={!selectedTrainees || !selectedTrainees.length}
        />
      </React.Fragment>
    );
  };

  const deleteTraineeDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteTraineeDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteTrainee}
      />
    </React.Fragment>
  );
  const deleteTraineesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteTraineesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedTrainees}
      />
    </React.Fragment>
  );
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editTrainee(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteTrainee(rowData)}
        />
      </React.Fragment>
    );
  };


  const header1 = renderHeader1();



  return (
    <div className="datatable-filter-demo">
      <Toast ref={toast} />
      <div className="card">
        <h5>Trainee List</h5>
        {/* <p>Filters are displayed in an overlay.</p>
        */}
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
        ></Toolbar>
        <DataTable
          value={customer}
          selection={selectedTrainees}
          onSelectionChange={(e) => setSelectedTrainees(e.value)}
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
            "traineeId",
            "gender",

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
            field="traineeId"
            header="TraineeId"
            style={{ minWidth: "14rem" }}
          />
          <Column
            field="gender"
            header="Gender"
            style={{ minWidth: "14rem" }}
          />
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog visible={TraineeDialog} style={{ width: '450px' }} header="Trainees Details" modal className="p-fluid" footer={TraineeDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <InputText field="firstName" value={trainee.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !trainee.firstName })} />
          {submitted && !trainee.firstName && <small className="p-error">first Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <InputText field="lastName" value={trainee.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !trainee.lastName })} />
          {submitted && !trainee.lastName && <small className="p-error">Last Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="traineeId">Trainee Id</label>
          <InputText field="traineeId" value={trainee.traineeId} onChange={(e) => onInputChange(e, 'traineeId')} required autoFocus className={classNames({ 'p-invalid': submitted && !trainee.traineeId })} />
          {submitted && !trainee.traineeId && <small className="p-error">first Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="gender">Gender</label>
          <InputText field="gender" value={trainee.gender} onChange={(e) => onInputChange(e, 'gender')} required autoFocus className={classNames({ 'p-invalid': submitted && !trainee.gender })} />
          {submitted && !trainee.gender && <small className="p-error">first Name is required.</small>}
        </div>
      </Dialog>
      <Dialog
        visible={deleteTraineeDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteTraineeDialogFooter}
        onHide={hideDeleteTraineeDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {trainee && (
            <span>
              Are you sure you want to delete <b>{trainee.firstName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteTraineesDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteTraineesDialogFooter}
        onHide={hideDeleteTraineesDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {trainee && (
            <span>Are you sure you want to delete the selected trainees?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};


// const rootElement = document.getElementById("root");
// ReactDOM.render(<TraineeList />, rootElement);



export default TraineeList;