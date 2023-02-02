import axios from '../../src/utils/axios';
async function GetAllschedules()
{
   const accessToken = window.localStorage.getItem('accessToken');
   console.log(accessToken)
  const response = await axios.get('/Schedule/api/V1.0/Schedule/GetSchedule',accessToken) 
  return await response.data.schedulesRes;
}
export {
  GetAllschedules
}
async function GetAllTrainees()
{
   const accessToken = window.localStorage.getItem('accessToken');
   console.log(accessToken)
  const response = await axios.get('/MasterData/api/V1.0/Trainee/GetAll',accessToken) 
  return await response.data.traineesRes;
}
export {
  GetAllTrainees
}
async function GetAllInstructors()
{
   const accessToken = window.localStorage.getItem('accessToken');
   console.log(accessToken)
  const response = await axios.get('/MasterData/api/V1.0/Instructor/GetAll',accessToken) 
  return await response.data.instructorsRes;
}
export {
  GetAllInstructors
}


 
//     export async function  GetAllschedules(){
        
//       const accessToken = window.localStorage.getItem('accessToken');
//       let value = [];
//       try {
//      const response = await axios.get('/Schedule/api/V1.0/sSchedule/GetSchedule',accessToken);
//      value = response.data.schedulesRes
//       }catch(err) {
//         console.log(err)
//       }

//             return value;
//   }
     


//   export async function  GetAllTrainees(){  
//    const accessToken = window.localStorage.getItem('accessToken');
//      let value = [];
//        try {
//        const response = await axios.get('/MasterData/api/V1.0/Trainee/GetAll',accessToken);
//          value = response.data.traineesRes
//          console.log(value);
//            }catch(err) {
//       console.log(err)
//     }
//           return value;
// }
// export async function  GetAllInstructors(){
        
//   const accessToken = window.localStorage.getItem('accessToken');
//   let value = [];
//   try {
//  const response = await axios.get('/MasterData/api/V1.0/Instructor/GetAll',accessToken);
//  value = response.data.instructorsRes
//        console.log(value);
//   }catch(err) {
//     console.log(err)
//   }
//         return value;
// }
 