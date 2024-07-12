import axios from "axios"




console.log("this is process.env" , process.env.NODE_ENV)


const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://weblinkup.online/api"
    : "http://localhost:5000/api";

axios.defaults.baseURL = baseURL;



// const baseURL = "http:localhost/5000/api"
// axios.defaults.baseURL= "https://linkup-backend-service.onrender.com/api"


// axios.defaults.withCredentials = true;







export const privateAxios = axios.create({

   
    baseURL: baseURL,


    headers: {
      Accept: 'application/json',
    },
    withCredentials: true
  });
  



