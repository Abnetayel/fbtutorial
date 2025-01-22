import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

const Signup = () => {
  const [name,setName]=useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]=useState('')
   const hundlesubmit = async(e)=>{
    e.preventDefault()
    if(!name || !email || !password){
      alert('please set all information')
      return;
    }
    try{
const response = await axios.post('http://127.0.0.1:5173/api/v1/auth/signup',{
  name,
  email,
  password
})
console.log(response.data);
setName('')
setEmail('')
setPassword('')
    }
    catch(error){
      alert(error)
    }
    }
  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={hundlesubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter username" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p>you have acount <NavLink className="bg-warning " to="/login">Login</NavLink> </p> 
      
      </form>
    </div>
  );
};

export default Signup;