import { Link } from "react-router-dom";


const Login = () => {
  return (
    <div className="container mt-1">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p>new for this site   <Link className="btn btn-outline-bg-secondary" to="/signup">Signup</Link> </p>
       
      </form>
    </div>
  );
};

export default Login;