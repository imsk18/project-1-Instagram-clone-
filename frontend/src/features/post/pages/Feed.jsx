import React, { useEffect, useEffectEvent } from 'react'
import { usePost } from '../hooks/use.post'
import Post from '../components/Post'
import '../styles/feed.scss'
import Navbar from '../../shared/components/Navbar'

const Feed = () => {
    const{handleGetFeed,loading,feed} = usePost()
    useEffect(()=>{
        handleGetFeed()


    },[])
    if(loading  || !feed){
        return(
            <main><h1>feed is loading</h1></main>
        )
    }
  return (
    <main className='feed-page'>
        <Navbar/>
        <div className="feed">
            <div className="posts">
                {feed.map(post =>{
                    if (!post) return null
                    return <Post key={post.id} user = {post.user} post = {post}/>
                })}
               
              
            </div>
        </div>
    </main>
  )
}

export default Feed