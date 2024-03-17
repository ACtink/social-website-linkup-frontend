

import { useEffect } from "react"
import { privateAxios } from "../api/axios"
import { useRefreshToken } from "./useRefreshToken"


export const useAxiosForToken = ()=>{



    const refresh = useRefreshToken()
    privateAxios.defaults.withCredentials = true;


    useEffect(()=>{


      const responseInterceptor =  privateAxios.interceptors.response.use(function(response){


            return response
        
        }, async function(error){

            const previousRequest = error?.config

            console.log(error)


            if(error.response?.status===403 && !previousRequest.sent){

               await refresh()  

               previousRequest.sent = true
               console.log("sending previous request")

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






