import React,{useEffect} from 'react'
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { userLogin } from '../../slices/loginSlice';


  function Login() {
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    // submit login details to userslice
    const onSubmit=(userCred)=>{
        dispatch(userLogin(userCred));
        reset();
    }

    //get user state
    const {employee,errorMessage,status}=useSelector(state=>state.login)
    //navigate if login success
    useEffect(()=>{
      if(status==="success"){
        if(employee.role==='super-admin'){
          navigate(`/super-admin/:${employee.employee_id}`)
        }
        else if(employee.role==='admin'){
          navigate(`/admin/:${employee.employee_id}`)
        }
        else if(employee.role==='gdo'){
          navigate(`/gdo/:${employee.employee_id}`)
        }
        else if(employee.role==='project-manager'){
          navigate(`/manager/:${employee.employee_id}`)
        }
        else{
          navigate('/role-error')
        }
      }
    },[status])
    
  return (
    <div className="container">
      
      <div className='row justify-content-center' style={{marginTop:'128px'}}>
        <div className='col col-md-6 mx-auto'>
          <div style={{marginTop:'136px'}}>
          <h1 style={{paddingBottom:'0.7rem'}}>
            <span style={{
              fontWeight:'300',
              wordSpacing:'3px',
              lineHeight:'2rem',
              paddingBottom:'0.35rem'
            }}>
            PROJECT PULSE
            </span>
          </h1>
          </div>
        </div>
        <div className='col col-md-6 mx-auto'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-start border p-3 text-light"
            style={{ borderRadius: "20px",backgroundColor:'	#008080',width:'500px'}}
          >
            <h1 className="text-center text-light  mb-3">Login</h1>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="mb-1 ms-1 fw-semibold " style={{fontSize:'20px'}}>
                Email
              </label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">Enter Email</p>
              )}
            </div>
             {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="mb-1 fw-semibold ms-1" style={{fontSize:'20px'}}>
                Password
              </label>
              <input
                type="password"
                className="form-control p-3"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-danger">Enter password</p>
              )}
            </div>
            <div>
              <button 
              className="btn btn-dark ms-1 mx-auto fs-5"
              >
              Login
              </button>
              <Link className="fw-semibold text-dark float-end fs-5" to='/register'>
              register
              </Link>
              <div className='mt-2'>
              <Link className='fw-semibold text-dark ms-1 fs-5' to='/forgot-password'>forgot password?</Link>
              </div>
              
            </div>
            <div>
            {
              status==="failed" && <p className='text-center text-warning fw-semibold'>{errorMessage}</p>
            }
            </div>
          </form>
          </div>
        </div>   
        
    </div>
  )
}

export default Login