import axios from '../../src/utils/axios';

// function Service () {
    // useEffect( () =>  {

 export const GetAllschedules = () =>
 {
    const accessToken = window.localStorage.getItem('accessToken');
let value = [];
    axios({
        headers:{
        Authorization:`Bearer ${accessToken}`
    },
        url:"/Schedule/api/V1.0/Schedule/GetSchedule",
        method:'GET',
      
        }).then((response) => {
          console.log(response.data)
          response.data && response.data.scheduleRes ? 
          // setSchedule(response.data.scheduleRes) 
          value = response.data.scheduleRes
          : null
          
        })
        .catch((err) => console.log(err))
      return value;
 }
 
       export function  GetAllTrainees(){
        
    const accessToken = window.localStorage.getItem('accessToken');
    let value = [];
    // const response = axios.get("/MasterData/api/V1.0/Trainee/GetAll",accessToken)
    // console.log(response)
    axios({
            headers:{
            Authorization:`Bearer ${accessToken}`},
            url:"/MasterData/api/V1.0/Trainee/GetAll",
            method:'GET',
          
            }).then((response) => {
              console.log(response.data)
            return  response.data && response.data.traineesRes ? 
              response.data.traineesRes
              : null
              
            });
            // console.log(value)
          return value;
}
   