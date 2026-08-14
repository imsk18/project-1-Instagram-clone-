import axios from 'axios'

const api = ({
    baseUrl:"http:localhost:3000/auth/api",
    withCredentials:true
})
export async function register(username,email,password){
    try{
        const response = await axios.api("/register",{
            username,
            email,
            password
        })

        console.log(response.data)

    }
    catch(err){
        throw err
    }

}

export async function login(username,password){
    try{
         const response = await axios.api("/login",{
        username,
        password
    })
    console.log(response.data)
    } 
    catch(err){
        throw err
    }

   

}