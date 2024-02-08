import React from "react";
import "../styles/register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate()

   

    const [formDetails , setFormDetails] = useState({
        name:"",
        email:"",
        password:""
    })


    const onChangeName = (e)=>{
      const name = e.target.value
        setFormDetails({...formDetails,name:name})
    
    }

    const onChangeEmail = (e)=>{
        const email = e.target.value
        setFormDetails({...formDetails,email:email})
    }
    const onChangePassword = (e)=>{
        const password = e.target.value
        setFormDetails({...formDetails,password:password})
    }





    const register = async (e)=>{
       
        e.preventDefault()

        try{

        
        const data = await axios.post("http://localhost:5000/api/auth/register", JSON.stringify(formDetails), {
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        console.log(data.data.message)

        if(data.data.message){
            navigate("/login")
            
        }
       
      }
      catch(err){
        console.log(err)

      }
    }









  return (
    <div className="register-form-container">
      <form action="#" className="register-form" onSubmit={register}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={onChangeName} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" onChange={onChangeEmail}  required/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={onChangePassword} required />
        </div>
        <div><button>Register</button></div>
      </form>
    </div>
  );
}

export default Register;
