import React, { useState } from 'react'
import "./Login.css"
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'

const Login = () => {

  const [signIn, setSignIn] = useState("Sign In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const user_auth = async (event)=>{
    event.preventDefault()
    if(signIn === "Sign In"){
      await login(email, password)
    }
    else{
      await signup(name, email, password)
    }
  }

  return (
    <div className='login'>
       <img src= {logo} alt="" className='login-logo' />
       <div className="login-form">
         <h1>{signIn}</h1>
         <form >
          {signIn==="Sign Up"?
           <input type="text" value = {name} onChange={(e)=>setName(e.target.value)} name="" id="" placeholder='Your name' />:<></>}
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="" id="" placeholder='email' />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="" id="" placeholder='password' />
            <button onClick={user_auth} type='submit'>{signIn}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox"/>
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
         </form>
         <div className="form-switch">
          {
            signIn === "Sign In" ?<p>New to Netflix <span onClick={()=>setSignIn("Sign Up")}>Sign Up Now</span></p>
            :  <p>Already have Account <span onClick={()=>setSignIn("Sign In")}>Sign In Now</span></p>
          }
          
         
         </div>
       </div>
    </div>
  )
}

export default Login
