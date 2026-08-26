import { Children } from "react";
import { createContext, useState } from "react";

export const postContext = createContext()
export  const PostContextProvider = ({children})=>{
    const [loading, setLoading] = useState(false)
    const [feed, setFeed] = useState(null)
    const [post,setPost] = useState(null)
    

   return(
    <postContext.Provider value={{loading , setLoading , feed , setFeed , post,setPost}}>
        {children}
    </postContext.Provider>
   )


}

