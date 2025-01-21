// import {Router, Route} from "react-router-dom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import NavLink from "./component/NavLink1";
import Addtour from "./component/Addtour";
function App() {
  return (
    
    <Router>
      <NavLink/>
      <div className="app bg-primary  rounded shadow ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tour" element={<Addtour/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
