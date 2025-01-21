import { NavLink } from 'react-router-dom';

const NavLink1 = () => {
    return (
        <nav>
            <ul className='nav bg-dark text-light p-3 rounded space-between justify-content-end'>
                <li className='nav-item p-2'>
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className='nav-item p-2'>
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
                <li className='nav-item p-2'>
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>
                <li className='nav-item p-2'>
                   <NavLink to="/tour" className="nav-link">tour</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavLink1;