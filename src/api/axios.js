import axios from "axios"


// const baseURL = "http:localhost/5000/api"
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;



export const privateAxios = axios.create({
    headers: {
           Accept: 'application/json',
      }

})

