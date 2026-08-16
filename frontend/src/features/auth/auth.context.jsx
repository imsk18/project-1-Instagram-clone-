import { createContext,useState,useEffect } from "react";
import { login , register } from "./services/auth.api";

export const AuthContext = createContext()


export  function AuthProvider({children}) {
  const [user,setUser]= useState(null)
const [loading, setLoading] = useState(false)

  async function handleLogin(username,password) {

    setLoading(true)
    try{
      const response = await login(username,password)
      setUser(response)
      console.log(response);
      
    }
    catch(err){
      throw err
    }
    finally{
      setLoading(false)
    }
    
  }


  async function handleRegister(username,email,password) {

    setLoading(true)
    try{
      const response = await register(username,email,password)
      setUser(response)
      console.log(response);
      
    }
    catch(err){
      throw err
    }
    finally{
      setLoading(false)
    }
    
  }


  return(
    <AuthContext.Provider value={{user,loading,handleLogin,handleRegister}}>
      {children}
    </AuthContext.Provider>
  )

}