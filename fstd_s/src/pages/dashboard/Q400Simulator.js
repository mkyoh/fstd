import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { GetAllschedules } from "../Service";
import { GetAllTrainees } from "../Service";
import { GetAllInstructors } from "../Service";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MotionContainer } from '../../components/animate';
import axios from '../../../src/utils/axios';
import "./DataTableDemo.css";

const Q400Simulator = () => {
  let emptySchedule = {
    id: null,
    date: "",
    from: "",
    to: "",
    duration: 0,
    instructor: "Id",
    scheduledTraineeRequests: [
      {
        id: "",
        scheduleId: "",
        traineeId: "",

      }
    ],
    trainingType: "",
    lesson: "",
    trainingRemark: "",
    simulatorDownTime: "",
  };

  const [schedules, setSchedules] = useState(emptySchedule);
  const [instructor, setInstructor] = useState(null);
  const [trainee1, setTrainee1] = useState(null);
  const [customer2, setCustomer2] = useState(null);
  const [ScheduleDialog, setScheduleDialog] = useState(false);
  const [deleteScheduleDialog, setDeleteScheduleDialog] = useState(false);
  const [deleteSchedulesDialog, setDeleteSchedulesDialog] = useState(false);
  const [schedule, setSchedule] = useState(emptySchedule);
  const [selectedSchedules, setSelectedSchedules] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    instructor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    traineeName: { value: null, matchMode: FilterMatchMode.IN },
    simulatortype: { value: null, matchMode: FilterMatchMode.IN },
    trainingtype: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [loading1, setLoading1] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

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

  const getSchedules = useCallback(async () => {
    const data = await GetAllschedules();
    data.map((row, i) => {
      row.scheduledTraineeRes = row.scheduledTraineeRes.map((val) => {
        return val.traineeName
      }).join(",")
    })

    setLoading1(false)
    setCustomer2(data)
    console.log(data)
  }, [])
  const getTrainees = useCallback(async () => {
    const data = await GetAllTrainees();
    setTrainee1(data)

  }, [])
  const getInstructors = useCallback(async () => {
    const data = await GetAllInstructors();
    setInstructor(data)
  }, [])
  useEffect(() => {
    getSchedules()
    getTrainees()
    getInstructors()



  }, [getSchedules, getTrainees, getInstructors]);

  // const formatCurrency = (value) => {
  //   return value.toLocaleString("en-US", {
  //     style: "currency",
  //     currency: "USD"
  //   });
  // };

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
    // console.log(schedule)
    if (schedule.simulatorType?.name.trim()) {
      let _schedules = { ...schedules };
      let _schedule = { ...schedule };
      const accessToken = window.localStorage.getItem('accessToken');

      if (schedule.id) {
        // const index = findIndexById(schedule.id);
        let list = {

          date: schedule.date,
          from: schedule.from,
          to: schedule.to,
          duration: schedule.duration,
          instructorId: Number(schedule.instructor.instructorId),
          simulatortype: schedule.simulatorType.name,
          trainingtype: schedule.trainingType.name,
          lesson: schedule.lesson.name,
          trainingremark: schedule.trainingRemark,
          simulatordowntime: schedule.simulatorDownTime,
          // <    traineeId:schedule.trainee1.id>
          scheduledTraineeRequests:
          {
            id: schedule.id,
            scheduleId: schedule.scheduleId,
            traineeId: schedule.traineeId
          },

        }

        axios({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "post",
          url: "/Schedule/api/V1.0/Schedule/Update",
          data: list,

        })
        _schedule[index] = _schedule;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Schedule Updated",
          life: 3000
        });
      } else {
        let list = {
          date: schedule.date,
          from: schedule.from,
          to: schedule.to,
          duration: schedule.duration,
          instructorId: Number(schedule.instructor.instructorId),
          // trainee2:schedule.traineeId
          simulatortype: schedule.simulatorType.name,
          trainingtype: schedule.trainingType.name,
          lesson: schedule.lesson.name,
          trainingremark: schedule.trainingRemark,
          simulatordowntime: schedule.simulatorDownTime,
          scheduledTraineeRequests: schedule.scheduledTraineeRes
                                     
            [
              {
                "id": 0,
                "scheduleId": 0,
                "traineeId": 4
              },
               {
                "id": 0,
                "scheduleId": 0,
                "traineeId":5
              }
            ]
          
        }
        console.log(list)
        axios({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "post",
          url: "/Schedule/api/V1.0/Schedule/Create",
          data: list,

        })
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Schedule Created",
          life: 3000
        });
      }

      setSchedules(_schedules);
      setScheduleDialog(false);
      setSchedule(emptySchedule);
    }
  };
  // const onInstructorChange = (e) => {
  //   setInstructor(e.value);
  // };

  // const onTrainee1Change = (e) => {
  //   setTrainee1(e.value);
  // };

  // const onTrainee2Change = (e) => {
  //   setTrainee2(e.value);
  // };

  // const onTrainingTypeChange = (e) => {
  //   setTrainingType(e.value);
  // };
  // const onLessonChange = (e) => {
  //   setLesson(e.value);
  // };
  // const onSimulatorTypeChange = (e) => {
  //   SetSimulatorType(e.value);
  // };

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



  const onInputChange = (e, date) => {
    const val = (e.target && e.target.value) || "";
    let _schedule = { ...schedule };
    _schedule[`${date}`] = val;

    setSchedule(_schedule);
  };

  const onInputNumberChange = (e, duration) => {
    const val = e.value || 0;
    let _schedule = { ...schedule };
    _schedule[`${duration}`] = val;

    setSchedule(_schedule);
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
          disabled={!selectedSchedules || !selectedSchedules.length}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
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
  const header1 = renderHeader1();

  return (
    <MotionContainer>
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
            value={customer2}
            selection={selectedSchedules}
            onSelectionChange={(e) => setSelectedSchedules(e.value)}
            dataKey="id"
            paginator
            showGridlines
            rows={10}
            loading={loading1}
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
              field="date"
              header="Date"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="from"
              header="From"
              sortable
              integeronly
              style={{ minWidth: "3rem" }}
            ></Column>
            <Column
              field="to"
              header="To"
              sortable
              integeronly
              style={{ minWidth: "3rem" }}
            ></Column>
            <Column
              field="duration"
              header="Duration"
              sortable
              integeronly
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="instructorName"
              header="Instructor"
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="scheduledTraineeRes"
              header="Trainee 1"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            {/* <Column
              field="traineeName"
              header="Trainee 2"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column> */}
            <Column
              field="simulatorType"
              header="Simulator Type"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="trainingType"
              header="Training Type"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="lesson"
              header="Lesson"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="trainingRemark"
              header="Training Remark"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="simulatorDownTime"
              header="Simulator Down Time"
              style={{ minWidth: "3rem" }}
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
              <label htmlFor="date"><h4>Date Picker</h4></label>
              <Calendar
                id="date"
                value={schedule.date}
                onChange={(e) => onInputChange(e, "date")}
                dateFormat="mm-dd-yy"
                required
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.date })}
              />
              {submitted && !schedule.date && (
                <small className="p-error">Date is required.</small>
              )}
            </div>
            <div className="field col">
              <label htmlFor="from"><h4>From</h4></label>
              <Calendar
                id="from"
                value={schedule.from}
                onChange={(e) => onInputChange(e, "from")}
                timeOnly hourFormat="12"
                required
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.from })}
              />
              {submitted && !schedule.from && (
                <small className="p-error">Time From is required.</small>
              )}
            </div>
            <div className="field col">
              <label htmlFor="to"><h4>To</h4></label>
              <Calendar
                id="to"
                value={schedule.to}
                onChange={(e) => onInputChange(e, "to")}
                timeOnly hourFormat="12"
                required
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.to })} />
              {submitted && !schedule.to && (
                <small className="p-error">TimeTo is required.</small>
              )}
            </div>
          </div>


          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="duration"><h4>Duration</h4></label>
              <InputNumber
                id="duration"
                value={schedule.duration}
                onChange={(e) => onInputNumberChange(e, "duration")}
                required
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.duration })}
              />
              {submitted && !schedule.duration && (
                <small className="p-error">duration is required.</small>
              )}
            </div>
            <div className="field col">
              <label htmlFor="instructor"><h4>Instructor</h4></label>
              <Dropdown
                id="instructor"
                value={schedule.instructor}
                options={instructor}
                onChange={(e) => onInputChange(e, "instructor")}
                optionLabel="firstName"
                filter
                showClear
                filterBy="firstName"
                placeholder="Select instructors"
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.instructor })}
              // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
              />
              {submitted && !schedule.instructor && (
                <small className="p-error">Instructor is required.</small>
              )}
            </div>
            <div className="field col">
              <label htmlFor="trainee1"><h4>Add Trainees</h4></label>
              <MultiSelect
                id="scheduledTraineeRes"
                value={schedule.scheduledTraineeRes}
                options={trainee1}
                onChange={(e) => onInputChange(e, "scheduledTraineeRes")}
                optionLabel="firstName"
                filter
                maxSelectedLabels={2}
                showClear
                filterBy="firstName"
                placeholder="Select Trainee1"
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.scheduledTraineeRes })}
              />
              {submitted && !schedule.scheduledTraineeRes && (
                <small className="p-error">Trainee1 is required.</small>
              )}
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="simulatorType"><h4>Simulator Type</h4></label>
              <Dropdown
                id="simulatorType"
                value={schedule.simulatorType}
                options={simulatortypes}
                onChange={(e) => onInputChange(e, "simulatorType")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select Simulator Type"
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.simulatorType })}
              />
              {submitted && !schedule.simulatorType && (
                <small className="p-error">Simulator type is required.</small>
              )}

            </div>
            <div className="field col">
              <label htmlFor="trainingType"><h4>Training Type</h4></label>
              <Dropdown
                id="trainingType"
                value={schedule.trainingType}
                options={trainingtypes}
                onChange={(e) => onInputChange(e, "trainingType")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select Training Type"
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.trainingType })}
              />
              {submitted && !schedule.trainingType && (
                <small className="p-error">Training type is required.</small>
              )}

            </div>
            <div className="field col">
              <label htmlFor="lesson"><h4>Lesson</h4></label>
              <Dropdown
                id="lesson"
                value={schedule.lesson}
                options={lessons}
                onChange={(e) => onInputChange(e, "lesson")}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Select Lesson"
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.lesson })}
              />
              {submitted && !schedule.lesson && (
                <small className="p-error">Lesson is required.</small>
              )}
            </div>
          </div>
          <div className="form grid">
            <div className="field col">
              <label htmlFor="trainingRemark"><h4>Training Remark</h4></label>
              <InputText
                id="trainingRemark"
                value={schedule.trainingRemark}
                onChange={(e) => onInputChange(e, "trainingRemark")}
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.trainingRemark })}
              />
            </div>
            <div className="field col">
              <label htmlFor="simulatorDownTime"><h4>Simulator Down Time</h4></label>
              <InputText
                id="simulatorDownTime"
                value={schedule.simulatorDownTime}
                onChange={(e) => onInputChange(e, "simulatorDownTime")}
                autoFocus
                className={classNames({ 'p-invalid': submitted && !schedule.simulatorDownTime })}
              />
            </div>
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
                Are you sure you want to delete <b>{schedule.date}</b>?
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
    </MotionContainer>
  );
};
export default Q400Simulator;
