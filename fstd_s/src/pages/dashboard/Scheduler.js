import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState, useEffect, useRef,useCallback } from "react";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import {  GetAllschedules } from "../Service";
import { GetAllTrainees } from "../Service";
import { GetAllInstructors } from "../Service";
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MotionContainer} from '../../components/animate';
import axios from '../../../src/utils/axios';
import "./DataTableDemo.css";

const Scheduler = () => {
  

  const [schedules, setSchedules] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const getSchedules = useCallback(async () => {
    const data = await GetAllschedules();
    setCustomer(data)
    setLoading1(false)
    console.log(data)
  }, [])
  useEffect(() => {
    getSchedules()

  }, [getSchedules]);

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
    return (
     <MotionContainer>
      <div className="datatable-crud-demo">
        {/* <Toast ref={toast} /> */}

        <div className="card">
          <Toolbar
            className="mb-4"
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={customer}
            selection={selectedSchedules}
            onSelectionChange={(e) => setSelectedSchedules(e.value)}
            dataKey="id"
            showGridlines
            loading1
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
              field="instructorName"
              header="Instructor"
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="traineeName"
              header="Trainee 1"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
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
              header="Training Remark"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
      </MotionContainer>
    );
  };
export default Scheduler;
