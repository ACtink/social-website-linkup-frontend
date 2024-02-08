import React from "react";
import "../styles/register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login({isLoggedIn, setIsLoggedIn}) {

    const navigate = useNavigate()

    const [error, setError]  = useState("")
  
    const [formDetails , setFormDetails] = useState({
        email:"",
        password:""
    })

    const onChangeEmail = (e)=>{
      if(error){
        setError("")
      }
        const email = e.target.value
        setFormDetails({...formDetails,email:email})
    }
    const onChangePassword = (e)=>{
      if(error){
        setError("")
      }
        const password = e.target.value
        setFormDetails({...formDetails,password:password})
    }





    const login = async (e)=>{
       
        e.preventDefault()

        try {
          const resp = await fetch("http://localhost:5000/api/auth/login", {
            method:"POST",
            mode:"cors",
           
        cache:"no-cache",
        credentials:"include",
            headers: {
              'Content-Type': 'application/json',
            
            },
            body: JSON.stringify(formDetails),
            redirect:"follow",
        referrerPolicy: "no-referrer",
          });

          const jsonResponse = await resp.json();

        
          if (resp.ok) {
            console.log(jsonResponse);
            setIsLoggedIn(true)
            localStorage.setItem("isLoggedIn", "true")
            navigate("/allposts")
          } else {
            console.log(jsonResponse.error.message)
            setError(jsonResponse.error.message)
            
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
       

    }







  return (
    <div className="register-form-container">
    {error && <h1>{error}</h1>}
      <form action="#" className="register-form" onSubmit={login}>
       
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" onChange={onChangeEmail} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={onChangePassword} />
        </div>
        <div><button>Login</button></div>
      </form>
    </div>
  );
}

export default Login;
