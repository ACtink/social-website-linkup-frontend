



import axios from "axios"





export async function postData(url, data){
   
    axios.defaults.withCredentials = true;




    
     const response =  await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json', 
        },
    })

    return response





  

}



export async function postFormData(url, data){
   
    axios.defaults.withCredentials = true;




    
     const response =  await axios.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    })

    return response





  

}