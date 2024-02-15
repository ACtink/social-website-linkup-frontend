

import axios from 'axios'


export const useRefreshToken = ()=>{
    
    axios.defaults.withCredentials = true;


    const refresh = async ()=>{



        try{

        const response = await axios.post("http://localhost:5000/api/auth/refresh")

        return response


        }catch(error){

            return error

            

        }



    }

 return refresh


}