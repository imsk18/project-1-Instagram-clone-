import { getFeed ,CreatePost} from "../services/post.api";
// import  from '../pages/CreatePost'
import { useContext, useEffect } from "react";
import { postContext } from "../post.context";

export const usePost = ()=>{
    const context = useContext(postContext)
    const {loading,setLoading,feed,setFeed} = context

    const handleGetFeed = async()=>{
        
        setLoading(true)
       const data = await getFeed()
       
       setFeed(data.posts)
       setLoading(false)
    }

    const handleCreatePost = async(imgFile,caption)=>{
        setLoading(true)
        const data = await CreatePost(imgFile,caption)
        setFeed([data.post,...feed])
        setLoading(false)
    }

    useEffect(()=>{
        handleGetFeed()

    },[])
    return{feed,handleGetFeed,loading,handleCreatePost}
}