


import { useAxiosForToken } from "../hooks/useAxiosForToken";







export function useGetData(){

    const privateAxios = useAxiosForToken()



    const getData = async( url , data={} )=>{


    
    const response =  await privateAxios.get(url)


   console.log(response)

   return response


    }
   


    return getData


  

}


