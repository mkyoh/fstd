import axios from 'axios';
// function Service () {
    // useEffect( () =>  {

 export function GetAllschedules ()
 {
    const accessToken = window.localStorage.getItem('accessToken');
let value = [];
    axios({
        headers:{
        Authorization:`Bearer ${accessToken}`},
        url:"/Schedule/api/V1.0/Schedule/GetSchedule",
        method:'GET',
      
        }).then((response) => {
          console.log(response.data)
          response.data && response.data.scheduleRes ? 
          // setSchedule(response.data.scheduleRes) 
          value = response.data.scheduleRes
          : null
          
        });
      return value;
 }
 
       export function  GetAllTrainees(){
        
    const accessToken = window.localStorage.getItem('accessToken');
    let value = [];
        axios({
            headers:{
            Authorization:`Bearer ${accessToken}`},
            url:"/MasterData/api/V1.0/Trainee/GetAll",
            method:'GET',
          
            }).then((response) => {
              console.log(response.data)
              response.data && response.data.scheduleRes ? 
              // setSchedule(response.data.scheduleRes) 
              value = response.data.scheduleRes
              : null
              
            });
          return value;
}
   