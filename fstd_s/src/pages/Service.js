import axios from '../../src/utils/axios';

// function Service () {
    // useEffect( () =>  {
      
    export async function  GetAllschedules(){
        
      const accessToken = window.localStorage.getItem('accessToken');
      let value = [];
      try {
     const response = await axios.get('/Schedule/api/V1.0/Schedule/GetSchedule',accessToken);
     value = response.data.schedulesRes
      }catch(err) {
        console.log(err)
      }
   
       
            return value;
  }
     


  export async function  GetAllTrainees(){  
   const accessToken = window.localStorage.getItem('accessToken');
     let value = [];
       try {
       const response = await axios.get('/MasterData/api/V1.0/Trainee/GetAll',accessToken);
         value = response.data.traineesRes
           }catch(err) {
      console.log(err)
    }
          return value;
}
export async function  GetAllInstructors(){
        
  const accessToken = window.localStorage.getItem('accessToken');
  let value = [];
  try {
 const response = await axios.get('/MasterData/api/V1.0/Instructor/GetAll',accessToken);
 value = response.data.instructorsRes
  }catch(err) {
    console.log(err)
  }
        return value;
}
 