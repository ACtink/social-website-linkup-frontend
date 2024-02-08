



import axios from "axios"





export async function postData(url, data){
   
    axios.defaults.withCredentials = true;




    
     const response =  await axios.post(url, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json', 
        },
    })

    return response





  

}