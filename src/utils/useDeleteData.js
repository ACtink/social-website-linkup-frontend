


import { useAxiosForToken } from "../hooks/useAxiosForToken";







export function useDeleteData(){

    const privateAxios = useAxiosForToken()



    const deleteData = async( url )=>{



    
    const response =  await privateAxios.delete(url , {
       headers: {
           'Content-Type': 'application/json', 
       },
   })


   console.log(response)

   return response


    }
   


    return deleteData


  

}


