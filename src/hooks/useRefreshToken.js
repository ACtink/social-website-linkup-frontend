

// import axios from 'axios'

import { privateAxios } from '../api/axios';


export const useRefreshToken = ()=>{
    
    // axios.defaults.withCredentials = true;


    const refresh = async ()=>{



        try{

        const response = await privateAxios.post("/auth/refresh")

        return response


        }catch(error){

            return error

            

        }



    }

 return refresh


}