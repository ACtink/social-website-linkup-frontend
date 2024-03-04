



import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export function useSignOut({isLoggedIn, setIsLoggedIn}) {

  const navigate = useNavigate()

  const signOut = async()=>{

  
    axios.defaults.withCredentials = true;
  
    try {
      const response = await axios.post("/auth/signout");
  
      if (response?.data) {
        console.log("running in signout.......if conditon ")
        localStorage.clear()
        setIsLoggedIn(!isLoggedIn)

        console.log(isLoggedIn)


        console.log("Data from the server:", response?.data);
        navigate("/")

      }
  
    } catch (err) {
      // console.log("Error:", err.response ? err.response.status : err.message);
    }
  };


            return signOut

}