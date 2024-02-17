

import axios from 'axios'


export const useRefreshToken = ()=>{
    
    axios.defaults.withCredentials = true;


    const refresh = async ()=>{



        try{

        const response = await axios.post("/auth/refresh")

        return response


        }catch(error){

            return error

            

        }



    }

 return refresh


}