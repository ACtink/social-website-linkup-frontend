
// import axios from "axios"

import { useEffect } from "react"
import { privateAxios } from "../api/axios"
import { useRefreshToken } from "./useRefreshToken"


export const useAxiosForToken = ()=>{


    const refresh = useRefreshToken()


    useEffect(()=>{


      const responseInterceptor =  privateAxios.interceptors.response.use(function(response){


            return response
        
        }, async function(error){

            const previousRequest = error?.config


            if(error.response.status===403 && !previousRequest.sent){

               await refresh()  

               previousRequest.sent = true

            return  await privateAxios(previousRequest)


            }

        
            return Promise.reject(error)
        })


         return ()=>{

            privateAxios.interceptors.response.eject(responseInterceptor)


         }
         
         

    }, [])
  

return privateAxios




}






