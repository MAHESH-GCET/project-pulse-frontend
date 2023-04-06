import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearState } from "../../slices/loginSlice";
function Navbar() {
  //get status from login
  const {employee,status}=useSelector(state=>state.login)
  let dispatch=useDispatch();
  // if logout is clicked, remove token
  const handleLogout=()=>{
    //clear token
    sessionStorage.removeItem("token")
    //dispatch
    dispatch(clearState());
  }
  return (
    <div>
      <nav className='navbar bg-body-tertiary'>
        <Link className='navbar-brand' to='#'>
          <img
          src='https://www.westagilelabs.com/wp-content/uploads/2022/10/wal_logo-1.png'
          alt='logo'
          className='d-inline-block align-text-top'
          />
        </Link>
      
        <ul className="nav justify-content-end">
        {status==="success" && (
            <>
            <h5 className='mt-3'>Hi, {employee.employee_name}</h5>
            <li className="nav-item">
            <NavLink className="nav-link" to="/" onClick={handleLogout}>
              <button className='btn text-light' style={{backgroundColor:'#004c4c'}}>Logout</button>
            </NavLink>
            </li>
            </>
          )
        }
        </ul>
      </nav>
    </div>
  )
}

export default Navbar