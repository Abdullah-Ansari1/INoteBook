import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router';
import Alert from './Alert';

const Navbar = (props) => {
    const { alert} = props;
    let history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
    }, [location]);
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} fixed-top mb-2`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/About">About</Link>
                            </li>
                        </ul>
                        <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label mx-2" htmlFor="flexSwitchCheckDefault">{`Enable ${props.mode==='light'?'DarkMode':'LightMode'}`}</label>
                    </div>
                       { !localStorage.getItem('token')?<form className="d-flex">
                            <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to='/signup' role="button">Signup</Link>
                        </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}                        
                    </div>
                </div>
            </nav>
            <nav className='fixed-top mb-2' style={{marginTop: "40px"}}><div ><Alert alert={alert}/></div></nav>
           
            
            
        </>
    )
}

export default Navbar