



import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export function useSignOut({isLoggedIn, setIsLoggedIn}) {

  const navigate = useNavigate()

  const signOut = async()=>{

  
    axios.defaults.withCredentials = true;
  
    try {
      const response = await axios.post("/auth/signout");
  
      if (response?.data) {
        console.log("running in signout.......if conditon ");
        localStorage.clear()
        // setIsLoggedIn(false)

        console.log("is logged in ka value after signout", isLoggedIn);

        console.log("after signout out console hai ye", response?.data);
         window.location.reload();
      }
  
    } catch (err) {
      // console.log("Error:", err.response ? err.response.status : err.message);
    }
  };


            return signOut

}