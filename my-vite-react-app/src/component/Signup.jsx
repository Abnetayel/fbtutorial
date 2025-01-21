import { NavLink } from "react-router-dom";


const Signup = () => {
  return (
    <div className="container">
      <h2>Signup</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p>you have acount <NavLink className="bg-warning " to="/login">Login</NavLink> </p> 
       
      </form>
    </div>
  );
};

export default Signup;