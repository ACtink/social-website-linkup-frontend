import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function SignOut({isLoggedIn, setIsLoggedIn}) {

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
  
    axios.defaults.withCredentials = true;
  
    try {
      const response = await axios.post("/auth/signout");
  
      if (response.data) {
        localStorage.clear()
        setIsLoggedIn(false)

        const data = await response.data;
        console.log("Data from the server:", data);
        navigate("/")

      }
  
    } catch (err) {
      console.error("Error:", err.response ? err.response.status : err.message);
    }
  };




  return (
    <div className='flex justify-center h-screen '>

        <div className='bg-green-400 my-16 h-16 w-40 '>
            
            <form action="#" onSubmit={handleSubmit}>

                <button type='submit'>Submit</button>

            </form>          
        </div>



    </div>
  )
}

export default SignOut