import React,{useState,useRef} from 'react'
import "../styles/createPost_form.scss"
import { usePost } from '../hooks/use.post'
import {useNavigate }from 'react-router'

const CreatePost = () => {
  const [caption, setCaption] = useState("")
  const postImgInputFieldRef = useRef()
  const {loading,handleCreatePost} = usePost()
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    const file = postImgInputFieldRef.current.files[0]
    await handleCreatePost(file,caption)

    navigate("/")

  }
  if(loading){
      return <main><h1>creating post</h1></main>
    }
  return (
    <main>
        <div className="post-form-container">
            <form onSubmit={handleSubmit}>
                <label className ="select-img-label"  htmlFor='postImage'>select img</label>
                <input ref={postImgInputFieldRef} hidden type="file" id='postImage' name='postImage'/>
                <br />
                <input 
                value={caption}
                onChange={(e)=>{setCaption(e.target.value)}}
                type="text" name='caption' id='caption' placeholder='enter caption'/>
                <button className='button primary-button'>create post</button>

            </form>
        </div>
    </main>
  )
}

export default CreatePost