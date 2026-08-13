import React, { useState } from 'react'
import {Link} from 'react-router'
import axios from 'axios'


const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

   async function handleSubmit(e){
     e.preventDefault()
  

   const response = await axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
      },
      {
        withCredentials:true

      })

    //     console.log(username);
    //  console.log(email);
    //  console.log(password);
      console.log(response.data)
     

  }

  return (
    <main>
      
      <div className="form-container">
        <h1>Register</h1>
        <form  onSubmit={handleSubmit}>
          <input 
          onChange={(e)=>{setUsername(e.target.value)}}
          type="text" 
          name='username'
          placeholder='enter your email'
          />
          <input 
          onChange={(e)=>{setEmail(e.target.value)}}
          type="email" name="email" placeholder='enter email'/>

          <input
          onChange={(e)=>{setPassword(e.target.value)}}
           type="password" 
          name='password'
          placeholder='enter password'
           />
          <button >Register</button>
        </form>
        <p>Already have an Account <Link className='toggle-form' to="/login">Login</Link></p>
        
      </div>
    </main>
  )
}

export default Register