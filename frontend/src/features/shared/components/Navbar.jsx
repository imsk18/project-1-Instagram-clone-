import React from 'react'
import { useNavigate } from 'react-router'
import '../nav.scss'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <nav className="nav-bar">
          <p>Instagram</p>
    <button className='button primary-button'
    onClick={()=>{navigate("/create-post")}}
    >create new post</button>
    </nav>
  
  )
}

export default Navbar