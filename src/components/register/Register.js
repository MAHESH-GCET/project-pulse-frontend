import { set, useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './register.css'
function Register() {
  //state
  let [err, setErr] = useState("");

  //navigate hook function
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //on submit function
  const onSubmit = async (userObj) => {
    try {
      // save the user details in json server
      let response = await axios.post("http://localhost:4000/employee-registration", userObj);
     console.log(response)
      if (response.status === 201) {
        //set err state with empty
        setErr("");
        navigate('/');
      }
      else if(response.data.errMsg){
        setErr('WAL Access Denied')
      }
    } catch (err) {
      console.log(err);
      //set err state
      setErr(err.message);
    }
    reset();
  };
  return (
    <div className="container">
      <div className="row justify-content-center" style={{marginTop:'50px'}}>
      <div className='col col-md-6 mx-auto'>
          <div style={{marginTop:'220px'}}>
          <h1 style={{paddingBottom:'0.7rem'}}>
          <span className='title' style={{
              wordSpacing:'3px',
              lineHeight:'2rem',
              paddingBottom:'0.35rem',
              color: '#4ea684',
              fontSize: "60px",
            }}>
            PROJECT PULSE
            </span>
          </h1>
          </div>
      </div>
        <div className="col col-md-6  mx-auto">
          
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-start border p-3 text-light bg-dark"
            style={{ borderRadius: "20px",backgroundColor:'	#008080',width:'500px'}}
          >
            <h1 className="text-center text-light mb-3">Register</h1>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="employee_name" className="mb-1 ms-1 fw-semibold " style={{fontSize:'20px'}}>
                Name
              </label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="Enter Name"
                {...register("employee_name", { required: true })}
              />
              {/* validation error*/}
              {errors.employee_name?.type === "required" && (
                <p className="text-danger">Enter Name</p>
              )}
            </div>
            {/* Age */}
            <div className="mb-3">
                <label htmlFor="age" className="mb-1 ms-1 fw-semibold " style={{fontSize:'20px'}}>
                    Age
                </label>
                <input 
                type='number'
                className="form-control p-3"
                placeholder="Enter Age"
                {...register("age",{required:true})}
                />
                {/* validation error*/}
                {errors.age?.type==='required' && (
                    <p className="text-danger">Enter Age</p>
                )}
            </div>
            {/* Gender */}
            <div className="mb-3 fw-semibold">
                <label className="mb-1 ms-1 fw-semibold " style={{fontSize:'20px'}}>Select Gender</label>
                <div className="form-check">
                    <input type='radio' {...register('gender',{required:true})} id='gender' value='male' className="form-check-input p-1"/>
                    <label className="form-check-label" htmlFor="gender">Male</label>
                </div>
                <div className="form-check">
                    <input type='radio' {...register('gender',{required:true})} id='gender' value='female' className="form-check-input p-1"/>
                    <label className="form-check-label" htmlFor="gender">Female</label>
                </div>
                {/* validation error*/}
                {errors.gender?.type==="required" && <p className="text-danger fw-semibold">*select gender</p>}
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="mb-1 ms-1 fw-semibold " style={{fontSize:'20px'}}>
                Email
              </label>
              <input
                type="email"
                className="form-control p-3"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {/* validation error*/}
              {errors.email?.type === "required" && (
                <p className="text-danger">Enter email</p>
              )}
            </div>
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="mb-1 ms-1 fw-semibold " style={{fontSize:'20px'}}>
                Password
              </label>
              <input
                type="password"
                className="form-control p-3"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {/* validation error*/}
              {errors.password?.type === "required" && (
                <p className="text-danger">Enter password</p>
              )}
            </div>
            {err && <p className="text-danger text-center fw-semibold fs-3">{err}</p>}
            <div>
              <button className="btn btn-light ms-1 mx-auto fs-5 " style={{textAlign:'center'}}>
              Register
              </button>
              <Link className="fw-semibold text-light float-end fs-5" to='/'>
              Go back to Login?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
