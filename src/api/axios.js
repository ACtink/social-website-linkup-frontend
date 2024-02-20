import axios from "axios"


// const baseURL = "http:localhost/5000/api"
axios.defaults.baseURL = 'http://localhost:5000/api';
// axios.defaults.baseURL= "https://linkup-backend-service.onrender.com/api"


// axios.defaults.withCredentials = true;






// export const privateAxios = axios.create({
   
//     headers: {
//            Accept: 'application/json',
           
//       },
//       withCredentials: true 

// })
export const privateAxios = axios.create({

    // baseURL: "https://linkup-backend-service.onrender.com/api",
    baseURL: "http://localhost:5000/api",


    headers: {
      Accept: 'application/json',
    },
    withCredentials: true
  });
  



