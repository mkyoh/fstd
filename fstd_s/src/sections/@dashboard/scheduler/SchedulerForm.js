// const SchedularForm= ()=>{
//     return(
// <Dialog
// visible={ScheduleDialog}
// style={{ width: "1000px" }}
// header="Q400 Schedule Details"
// modal
// className="p-fluid"
// footer={scheduleDialogFooter}
// onHide={hideDialog}
// >
// <div className="formgrid grid">
//   <div className="field col">
//     <label htmlFor="name">Day</label>
//     <Dropdown
//       id="day"
//       value={schedule.day}
//       options={days}
//       onChange={(e) => onInputChange(e, "day")}
//       optionLabel="name"
//       filter
//       showClear
//       filterBy="name"
//       placeholder="Select days"
//       required
//     // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
//     />
//     {submitted && !schedule.day && (
//       <small className="p-error">Day is required.</small>
//     )}
//   </div>

//   <div className="field col">
//     <label htmlFor="basic">Date Picker</label>
//     <Calendar
//       id="basic"
//       value={date3}
//       onChange={(e) => setDate3(e.value)}
//       dateFormat="mm-dd-yy"
//       showClear
//       required

//     />
//     {submitted && !schedule.simulatortime && (
//       <small className="p-error">simulatortime is required.</small>
//     )}
//   </div>
//   <div className="field col">
//     <label >From</label>
//     <Calendar
//       id="time12" value={date1}
//       onChange={(e) => setDate1(e.value)}
//       timeOnly hourFormat="12"
//       showClear
//       required
//     />
//     {submitted && !schedule.simulatortime && (
//       <small className="p-error">Time From is required.</small>
//     )}
//   </div>
//   <div className="field col">
//     <label>To</label>
//     <Calendar id="time12" value={date2}
//       onChange={(e) => setDate2(e.value)}
//       timeOnly hourFormat="12"
//       showClear
//       required />
//     {submitted && !schedule.simulatortime && (
//       <small className="p-error">TimeTo is required.</small>
//     )}
//   </div>

// </div>


// <div className="formgrid grid">
//   <div className="field col">
//     <label className="mb-3">Duration</label>
//     <InputNumber
//       id="quantity"
//       value={schedule.quantity}
//       onValueChange={(e) => onInputNumberChange(e, "quantity")}
//     />
//     {submitted && !schedule.simulatortime && (
//       <small className="p-error">simulatortime is required.</small>
//     )}
//   </div>
//   <div className="field col">
//     <label htmlFor="price">Instructor</label>
//     <Dropdown
//       id="instructor"
//       value={schedule.instructor}
//       options={instructors}
//       onChange={(e) => onInputChange(e, "instructor")}
//       optionLabel="name"
//       filter
//       showClear
//       filterBy="name"
//       placeholder="Select instructors"
//     // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
//     />
//     {submitted && !schedule.instructor && (
//       <small className="p-error">Instructor is required.</small>
//     )}
//   </div>
//   <div className="field col">
//     <label htmlFor="quantity">Trainee 1</label>
//     <Dropdown
//       id="trainee1"
//       value={schedule.trainee1}
//       options={trainees}
//       onChange={(e) => onInputChange(e, "trainee1")}
//       optionLabel="name"
//       filter
//       showClear
//       filterBy="name"
//       placeholder="Select Trainee1"
//     // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
//     />
//     {submitted && !schedule.trainee1 && (
//       <small className="p-error">Trainee1 is required.</small>
//     )}
//   </div>
//   <div className="field col">
//     <label htmlFor="quantity">Trainee 2</label>
//     <Dropdown
//       value={schedule.trainee2}
//       options={trainees}
//       onChange={(e) => onInputChange(e, "trainee2")}
//       optionLabel="name"
//       filter
//       showClear
//       filterBy="name"
//       placeholder="Select Trainee2"
//     // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
//     />
//     {submitted && !schedule.trainee2 && (
//       <small className="p-error">Trainee2 is required.</small>
//     )}
//   </div>
// </div>
// <div className="formgrid grid">
//   <div className="field col">
//     <label htmlFor="quantity">Simulator Type</label>
//     <Dropdown
//       value={schedule.trainingtype}
//       options={simulatortypes}
//       onChange={(e) => onInputChange(e, "simulatortype")}
//       optionLabel="name"
//       filter
//       showClear
//       filterBy="name"
//       placeholder="Select Simulator Type"
//     // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
//     />
//     {submitted && !schedule.trainingtype && (
//       <small className="p-error">Simulator type is required.</small>
//     )}

//   </div>
//   <div className="field col">
//     <label htmlFor="quantity">Training Type</label>
//     <Dropdown
//       value={schedule.trainingtype}
//       options={trainingtypes}
//       onChange={(e) => onInputChange(e, "trainingtype")}
//       optionLabel="name"
//       filter
//       showClear
//       filterBy="name"
//       placeholder="Select Training Type"
//     // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
//     />
//     {submitted && !schedule.trainingtype && (
//       <small className="p-error">Training type is required.</small>
//     )}

//   </div>
//   <div className="field col">
//     <label htmlFor="quantity">Lesson</label>
//     <Dropdown
//       value={schedule.lesson}
//       options={lessons}
//       onChange={(e) => onInputChange(e, "lesson")}
//       optionLabel="name"
//       filter
//       showClear
//       filterBy="name"
//       placeholder="Select Lesson"
//     // va    lueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
//     />
//     {submitted && !schedule.lesson && (
//       <small className="p-error">Lesson is required.</small>
//     )}
//   </div>
// </div>
// <div className="field col">
//   <label htmlFor="quantity">Training Remark</label>
//   <InputText
//     id="name"
//     value={schedule.name}
//     onChange={(e) => onInputChange(e, "name")}
//     required
//     autoFocus
//     className={classNames({ "p-invalid": submitted && !schedule.name })}
//   />
//   {submitted && !schedule.trainingremark && (
//     <small className="p-error">training remark is required.</small>
//   )}
// </div>
// </Dialog>

// <Dialog
// visible={deleteScheduleDialog}
// style={{ width: "450px" }}
// header="Confirm"
// modal
// footer={deleteScheduleDialogFooter}
// onHide={hideDeleteScheduleDialog}
// >
// <div className="confirmation-content">
//   <i
//     className="pi pi-exclamation-triangle mr-3"
//     style={{ fontSize: "2rem" }}
//   />
//   {schedule && (
//     <span>
//       Are you sure you want to delete <b>{schedule.name}</b>?
//     </span>
//   )}
// </div>
// </Dialog>

// <Dialog
// visible={deleteSchedulesDialog}
// style={{ width: "450px" }}
// header="Confirm"
// modal
// footer={deleteSchedulesDialogFooter}
// onHide={hideDeleteSchedulesDialog}
// >
// <div className="confirmation-content">
//   <i
//     className="pi pi-exclamation-triangle mr-3"
//     style={{ fontSize: "2rem" }}
//   />
//   {schedule && (
//     <span>Are you sure you want to delete the selected schedules?</span>
//   )}
// </div>
// </Dialog>
//     );
// };
// export default CalendarForm;
