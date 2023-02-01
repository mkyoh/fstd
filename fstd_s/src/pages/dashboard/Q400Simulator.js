import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { GetAllschedules } from "../Service";
import { GetAllTrainees } from "../Service";
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import axios from '../../../src/utils/axios';
import "./DataTableDemo.css";

const Q400Simulator = () => {
  let emptySchedule = {
    id: null,
    day: "",
    date: null,
    simulatortime: null,
    instructor: "",
    trainee1: null,
    trainee2: null,
    trainingtype: null,
    lesson: "",
    trainingremark: ""
  };

  const [schedules, setSchedules] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [day, setDay] = useState(null);
  const [date3, setDate3] = useState(null);
  const [trainee1, setTrainee1] = useState(null);
  const [trainee2, setTrainee2] = useState(null);
  const [simulatortype, SetSimulatorType] = useState(null);
  const [trainingtype, setTrainingType] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [instructorss, setInstructors] = useState(null);
  const [ScheduleDialog, setScheduleDialog] = useState(false);
  const [deleteScheduleDialog, setDeleteScheduleDialog] = useState(false);
  const [deleteSchedulesDialog, setDeleteSchedulesDialog] = useState(false);
  const [schedule, setSchedule] = useState(emptySchedule);
  const [selectedSchedules, setSelectedSchedules] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const instructors = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" }
  ];
  const days = [
    { name: "Monday", code: "MON" },
    { name: "Tuesday", code: "TUE" },
    { name: "Wednesday", code: "WED" },
    { name: "Thursday", code: "THU" },
    { name: "Friday", code: "FRI" },
    { name: "Saturday", code: "SAT" },
    { name: "Sunday", code: "SUN" }
  ];
 

  const trainingtypes = [
    { name: "Initial Type Rating", code: "AU" },
    { name: "First Offiicer Transition", code: "BR" },
    { name: "Capitain Transition", code: "CN" },
    { name: "Difference (Not Avaliable)", code: "EG" },
    { name: "Requalification", code: "FR" },
    { name: "Recurrent", code: "DE" }
  ];
  const lessons = [
    { name: "FBS1" },
    { name: "FBS2" },
    { name: "FBS3" },
    { name: "FBS4" },
    { name: "FBS5" },
    { name: "FBS6" },
    { name: "FBS7" },
    { name: "FBS8" },
    { name: "FBS9" },
    { name: "FBS10" },
    { name: "FBS11" },
    { name: "FBS12" },
    { name: "FBS13" }

  ];
  const simulatortypes = [
    { name: "Q400" },
    { name: "New 737max" },
    { name: "New 737NG" },
    { name: "New 737MPS" },
    { name: "737 NG" },
    { name: "New Q400 FTD" },
    { name: "New Q400 SIM" },
  ];
  

useEffect(() =>  { 
  const scheduledata= GetAllschedules();
  // setSchedule(scheduledata);
  const traineedata=  GetAllTrainees();
  // console.log(traineedata)
  if(traineedata !== []){
  setTrainee1(trainee1);
  setTrainee2(trainee2);

}

}),[trainee1,trainee2];
  // const get = async () => {
  //   try {
   
  //   } catch (err) {
  //     console.log(err);
  //   } // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    };

    const openNew = () => {
      setSchedule(emptySchedule);
      setSubmitted(false);
      setScheduleDialog(true);
    };

    const hideDialog = () => {
      setSubmitted(false);
      setScheduleDialog(false);
    };

    const hideDeleteScheduleDialog = () => {
      setDeleteScheduleDialog(false);
    };

    const hideDeleteSchedulesDialog = () => {
      setDeleteSchedulesDialog(false);
    };

    const saveSchedule = () => {
      setSubmitted(true);
       
      if (schedule.day?.name.trim()) {
        let _schedules = { ...schedule };
        let _schedule = { ...schedule };
        if (schedule.id) {
          const index = findIndexById(schedule.id);

          // _schedule[index] = _schedule;
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Schedule Updated",
            life: 3000
          });
        } else {
          const accessToken = window.localStorage.getItem('accessToken');globalFilter
          console.log(schedule)
          // let data = new FormData();
          // axios({
          //   headers:{
          //   Authorization:`Bearer ${accessToken}`},
          //   url:"/Schedule/api/V1.0/Schedule/Create",
          //   method:'Post',
          //   body:data
          // })
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Schedule Created",
            life: 3000
          });
        }

        // setSchedules(_schedules);
        setScheduleDialog(false);
        setSchedule(emptySchedule);
      }
    };
    const onInstructorChange = (e) => {
      setInstructor(e.value);
    };
    const onDayChange = (e) => {
      setDay(e.value);
      setSchedule(
        { ...schedule, day: day.name },

      )
    };
    const onTrainee1Change = (e) => {
      setTrainee1(e.value);
    };

    const onTrainee2Change = (e) => {
      setTrainee2(e.value);
    };

    const onTrainingTypeChange = (e) => {
      setTrainingType(e.value);
    };
    const onLessonChange = (e) => {
      setLesson(e.value);
    };
    const onSimulatorTypeChange = (e) => {
      SetSimulatorType(e.value);
    };

    const editSchedule = (schedule) => {
      setSchedule({ ...schedule });
      setScheduleDialog(true);
    };

    const confirmDeleteSchedule = (schedule) => {
      setSchedule(schedule);
      setDeleteScheduleDialog(true);
    };

    const deleteSchedule = () => {
      let _schedules = schedules.filter((val) => val.id !== schedule.id);
      setSchedules(_schedules);
      setDeleteScheduleDialog(false);
      setSchedule(emptySchedule);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Schedule Deleted",
        life: 3000
      });
    };

    const findIndexById = (id) => {
      let index = -1;
      for (let i = 0; i < schedules.length; i++) {
        if (schedules[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    };

    const createId = () => {
      let id = "";
      let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    };

    const importCSV = (e) => {
      const file = e.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        const data = csv.split("\n");

        // Prepare DataTable
        const cols = data[0].replace(/['"]+/g, "").split(",");
        data.shift();

        const importedData = data.map((d) => {
          d = d.split(",");
          const processedData = cols.reduce((obj, c, i) => {
            c =
              c === "Status"
                ? "inventoryStatus"
                : c === "Reviews"
                  ? "rating"
                  : c.toLowerCase();
            obj[c] = d[i].replace(/['"]+/g, "");
            (c === "price" || c === "rating") && (obj[c] = parseFloat(obj[c]));
            return obj;
          }, {});

          processedData["id"] = createId();
          return processedData;
        });

        const _schedules = [...schedules, ...importedData];

        setSchedule(_schedules);
      };

      reader.readAsText(file, "UTF-8");
    };

    const exportCSV = () => {
      dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
      setDeleteSchedulesDialog(true);
    };

    const deleteSelectedSchedules = () => {
      let _schedules = schedules.filter((val) => !selectedSchedules.includes(val));
      setSchedules(_schedules);
      setDeleteSchedulesDialog(false);
      setSelectedSchedules(null);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "schedules Deleted",
        life: 3000
      });
    };

    const onCategoryChange = (e) => {
      let _schedule = { ...schedule };
      _schedule["category"] = e.value;
      setSchedule(_schedule);
    };

    const onInputChange = (e, name) => {
      const val = (e.target && e.target.value) || "";
      let _schedule = { ...schedule };
      _schedule[`${name}`] = val;

      setSchedule(_schedule);
    };

    const onInputNumberChange = (e, name) => {
      const val = e.value || 0;
      let _schedule = { ...schedule };
      _schedule[`${name}`] = val;

      setSchedule(_schedule);
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
            disabled={!selectedSchedules || !selectedSchedules.length}
          />
        </React.Fragment>
      );
    };

    const rightToolbarTemplate = () => {
      return (
        <React.Fragment>
          <FileUpload
            mode="basic"
            name="demo[]"
            auto
            url="https://primefaces.org/primereact/showcase/upload.php"
            accept=".csv"
            chooseLabel="Import"
            className="mr-2 inline-block"
            onUpload={importCSV}
          />
          <Button
            label="Export"
            icon="pi pi-upload"
            className="p-button-help"
            onClick={exportCSV}
          />
        </React.Fragment>
      );
    };

    const priceBodyTemplate = (rowData) => {
      return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
      return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
      return (
        <span
          className={`schedule-badge status-${rowData.inventoryStatus.toLowerCase()}`}
        >
          {rowData.inventoryStatus}
        </span>
      );
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
            onClick={() => editSchedule(rowData)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => confirmDeleteSchedule(rowData)}
          />
        </React.Fragment>
      );
    };

    const header = (
      <div className="table-header">
        <h5 className="mx-0 my-1">Manage schedules</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>
    );
    const scheduleDialogFooter = (
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
          onClick={saveSchedule}
        />
      </React.Fragment>
    );
    const deleteScheduleDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideDeleteScheduleDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={deleteSchedule}
        />
      </React.Fragment>
    );
    const deleteSchedulesDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideDeleteSchedulesDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={deleteSelectedSchedules}
        />
      </React.Fragment>
    );

    return (
      <div className="datatable-crud-demo">
        <Toast ref={toast} />

        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            selection={selectedSchedules}
            onSelectionChange={(e) => setSelectedSchedules(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} schedule"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
              exportable={false}
            ></Column>
            <Column
              field="id"
              header="Id"
              sortable
              style={{ minWidth: "1rem" }}
            >

            </Column>
            <Column
              field="day"
              header="Day"
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="name"
              header="Date"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              id="quantity"
              header="From"
              value={schedule.quantity}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
              integeronly
            ></Column>
            <Column
              id="quantity"
              header="To"
              value={schedule.quantity}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
              integeronly
            ></Column>
            <Column
              id="quantity"
              header="Duration"
              value={schedule.quantity}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
              integeronly
            ></Column>
            <Column
              field="price"
              header="Instructor"
              body={priceBodyTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="category"
              header="Trainee 1"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="rating"
              header="Trainee 2"
              body={ratingBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="simulatortype"
              header="Simulator Type"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="inventoryStatus"
              header="Training Type"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="inventoryStatus"
              header="Lesson"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="inventoryStatus"
              header="Training Remark"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={ScheduleDialog}
          style={{ width: "1000px" }}
          header="Q400 Schedule Details"
          modal
          className="p-fluid"
          footer={scheduleDialogFooter}
          onHide={hideDialog}
        >
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="name">Day</label>
              <Dropdown
                id="day"
                value={schedule.day}
                options={days}
                onChange={(e) => onInputChange(e, "day")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select days"
                required
              // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
              />
              {submitted && !schedule.day && (
                <small className="p-error">Day is required.</small>
              )}
            </div>

            <div className="field col">
              <label htmlFor="basic">Date Picker</label>
              <Calendar
                id="basic"
                value={date3}
                onChange={(e) => setDate3(e.value)}
                dateFormat="mm-dd-yy"
                required
              />
              {submitted && !schedule.date3 && (
                <small className="p-error">Date is required.</small>
              )}
            </div>
            <div className="field col">
              <label >From</label>
              <Calendar
                id="time12" value={date1}
                onChange={(e) => setDate1(e.value)}
                timeOnly hourFormat="12"
               
                required
              />
              {submitted && !schedule.simulatortime && (
                <small className="p-error">Time From is required.</small>
              )}
            </div>
            <div className="field col">
              <label>To</label>
              <Calendar id="time12" value={date2}
                onChange={(e) => setDate2(e.value)}
                timeOnly hourFormat="12"
                
                required />
              {submitted && !schedule.simulatortime && (
                <small className="p-error">TimeTo is required.</small>
              )}
            </div>

          </div>


          <div className="formgrid grid">
            <div className="field col">
              <label className="mb-3">Duration</label>
              <InputNumber
                id="quantity"
                value={schedule.quantity}
                onValueChange={(e) => onInputNumberChange(e, "quantity")}
              />
              {submitted && !schedule.simulatortime && (
                <small className="p-error">simulatortime is required.</small>
              )}
            </div>
            <div className="field col">
              <label htmlFor="price">Instructor</label>
              <Dropdown
                id="instructor"
                value={schedule.instructor}
                options={instructors}
                onChange={(e) => onInputChange(e, "instructor")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select instructors"
              // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
              />
              {submitted && !schedule.instructor && (
                <small className="p-error">Instructor is required.</small>
              )}
            </div>
            <div className="field col">
              <label htmlFor="quantity">Trainee 1</label>
              <Dropdown
                id="trainee1"
                value={schedule.trainee1}
                options={trainee1}
                onChange={(e) => onInputChange(e, "trainee1")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select Trainee1"
              // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
              />
              {submitted && !schedule.trainee1 && (
                <small className="p-error">Trainee1 is required.</small>
              )}
            </div>
            <div className="field col">
              <label htmlFor="quantity">Trainee 2</label>
              <Dropdown
                value={schedule.trainee2}
                options={trainee2}
                onChange={(e) => onInputChange(e, "trainee2")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select Trainee2"
              // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
              />
              {submitted && !schedule.trainee2 && (
                <small className="p-error">Trainee2 is required.</small>
              )}
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="quantity">Simulator Type</label>
              <Dropdown
                value={schedule.trainingtype}
                options={simulatortypes}
                onChange={(e) => onInputChange(e, "simulatortype")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select Simulator Type"
              // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
              />
              {submitted && !schedule.trainingtype && (
                <small className="p-error">Simulator type is required.</small>
              )}

            </div>
            <div className="field col">
              <label htmlFor="quantity">Training Type</label>
              <Dropdown
                value={schedule.trainingtype}
                options={trainingtypes}
                onChange={(e) => onInputChange(e, "trainingtype")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select Training Type"
              // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
              />
              {submitted && !schedule.trainingtype && (
                <small className="p-error">Training type is required.</small>
              )}

            </div>
            <div className="field col">
              <label htmlFor="quantity">Lesson</label>
              <Dropdown
                value={schedule.lesson}
                options={lessons}
                onChange={(e) => onInputChange(e, "lesson")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select Lesson"
              // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
              />
              {submitted && !schedule.lesson && (
                <small className="p-error">Lesson is required.</small>
              )}
            </div>
          </div>
          <div className="field col">
            <label htmlFor="quantity">Training Remark</label>
            <InputText
              id="name"
              value={schedule.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !schedule.name })}
            />
            {submitted && !schedule.trainingremark && (
              <small className="p-error">training remark is required.</small>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteScheduleDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteScheduleDialogFooter}
          onHide={hideDeleteScheduleDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {schedule && (
              <span>
                Are you sure you want to delete <b>{schedule.name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteSchedulesDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteSchedulesDialogFooter}
          onHide={hideDeleteSchedulesDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {schedule && (
              <span>Are you sure you want to delete the selected schedules?</span>
            )}
          </div>
        </Dialog>
      </div>
    );
  };
export default Q400Simulator;
