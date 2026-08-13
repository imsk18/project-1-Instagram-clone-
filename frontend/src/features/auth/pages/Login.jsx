import React, { useState } from 'react'
import {Link} from 'react-router'
import '../style/form.scss'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault()


    // console.log(username);
    await axios.post("http://localhost:3000/api/auth/login",{
      username,
      password
    },
  {
    withCredentials:true
  })
  .then(res =>{
    console.log(res.data);
    

  })
    
  }
  return (
    <main>
      
      <div className="form-container">
        <h1>login</h1>
        <form onSubmit={handleSubmit} >
          <input 
          onChange={(e)=>{setUsername(e.target.value)}}
          type="text" 
          name='username'
          placeholder='enter your email'
          />
          <input 
          onChange={(e)=>{setPassword(e.target.value)}}
          type="password" 
          name='password'
          placeholder='enter password'
           />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an Account <Link className='toggle-form' to="/register">register</Link></p>
      </div>
    </main>
  )
}

export default Login