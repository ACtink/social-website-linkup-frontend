


import { useAxiosForToken } from "../hooks/useAxiosForToken";







export function usePostData(){

    const privateAxios = useAxiosForToken()



    const postData = async( url , data )=>{



        console.log(url , data)

    privateAxios.defaults.withCredentials = true;

    
    const response =  await privateAxios.post(url, data, {
       headers: {
           'Content-Type': 'application/json', 
       },
   })


   console.log(response)

   return response


    }
   


    return postData


  

}


