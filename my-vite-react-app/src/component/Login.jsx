import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
// import { set } from "mongoose";
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPssword]=useState("");
  const hundlesubmit=async(e)=>{
    e.preventDefault()
    
      if(!email || !password){
        alert("email and password are required")
        return;
      }
      try{
      const response=await axios.post('http://127.0.0.1:5173/api/v1/auth/login',{
        email,
        password
      })
      console.log(response.data)
      setEmail("");
      setPssword("");
    }
  catch(error){
    console.error("There was an error adding the tour!", error);
    alert(`There was an error adding the tour: ${error.response ? error.response.data.message : error.message}`);
  }
  }
  return (
    <div className="container mt-1">
      <h2>Login</h2>
      <form onSubmit={hundlesubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e)=>setPssword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p>new for this site   <Link className="btn btn-outline-bg-secondary" to="/signup">Signup</Link> </p>
      </form>
    </div>
  );
};

export default Login;