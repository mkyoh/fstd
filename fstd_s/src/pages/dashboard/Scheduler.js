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
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);


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
              id="duration"
              header="Duration"
               sortable
              integeronly
               style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="instructor"
              header="Instructor"
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="trainee1"
              header="Trainee 1"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="trainee2"
              header="Trainee 2"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="simulatortype"
              header="Simulator Type"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="trainingtype"
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
              field="trainingremark"
              header="Training Remark"
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
      </div>
      </MotionContainer>
    );
  };
export default Scheduler;
