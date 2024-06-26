



import { useAxiosForToken } from "../hooks/useAxiosForToken";






export function usePostFormData(){

    const privateAxios = useAxiosForToken()


    const postFormData = async( url , data )=>{


    
     const response =  await privateAxios.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    })

    return response


    }

    

    return postFormData




  

}