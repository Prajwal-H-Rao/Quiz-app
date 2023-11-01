import React, { useEffect, useState } from 'react'
import "../css/Auth.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Auth(props) {
  const navigate = useNavigate()
  const [show,setShow]=useState(false)
  const [name,setName]=useState("")
  const [pwd,setPwd]=useState("")
  function handleName(event){
    setName(event.target.value)
  }
  function handlePwd(event){
    setPwd(event.target.value)
  }
    function checkCredentials(event){
      event.preventDefault()
      const post = JSON.stringify({name:name,pwd:pwd});
      axios.post("http://localhost:4000/auth",{post}).then(res=>{props.setIsAuth(res.data.res);setShow(!res.data.res);}).catch(err=>console.log(err))
    }
  useEffect(()=>{if(props.isAuth){
    console.log("navigateing")
    navigate("/admin_verified")
  }},[props,navigate])
  return (
    <div className='Auth'>
        <form className='Auth-container' onSubmit={checkCredentials}>
        <h2>Enter Your username</h2>
        <input type='text' id='username' name='name' value={name} onChange={handleName} placeholder='User-Name'/>
        <h2>Enter the password</h2>
        <input type='password' id='password' name='pWd' value={pwd} onChange={handlePwd} placeholder='Password'/>
        {show && <p>The password you entered is not correct</p>}
        <button type='submit' className='submit'>Submit</button>    
        </form>
    </div>
  )
}

export default Auth