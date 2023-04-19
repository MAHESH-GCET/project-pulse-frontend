import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forgotPassword.css'
function ForgotPassword() {
    let navigate=useNavigate()

    // react hook form
    let {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    // maintain local state
    let [otpStatus,setOtpStatus]=useState(false);
    let [checkOtp,setCheckOtp]=useState("");
    let [email,setEmail]=useState("");
    let [newPassword,setNewPassword]=useState("");
    
    // check email and send otp
    const onSubmit=async(userObj)=>{
        setEmail(userObj.email)
        try{
            let response=await axios.post('http://localhost:4000/forgot-password',userObj)
            if(response.status===200){
                setOtpStatus(true)
                
            }
        } catch(err){
            console.log(err)
        }
    }
    
    //check otp
    const onOtpSubmit=async(userCred)=>{
        try{
        let response=await axios.put(`http://localhost:4000/reset-password/${userCred.email}`,userCred);
        if(response.status===200){
            setNewPassword("password reset successsful")
            setTimeout(()=>{
                navigate("/")
            },3000)
        }
        else{
            setCheckOtp(response.data.message)
        }
        }
        catch(err){
            console.log(err);
        }
        
    }
  return (
    <div className='container'>
        <div  className='row justify-content-center' style={{marginTop:'128px'}} >
        <div className='col col-md-6 mx-auto'>
          <div style={{marginTop:'178px'}}>
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
        <div className='col col-md-6 mx-auto'>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-start border p-3 text-light bg-dark"
            style={{ borderRadius: "20px",backgroundColor:'	#008080',width:'500px'}}
            >
            <h1 className="text-center text-light mb-3">Reset Password</h1>
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
              {errors.username?.type === "required" && (
                <p className="text-danger">Enter Email</p>
              )}
            </div>
            {/* OTP Button */}
            <div className='text-center'>
            <button 
              className="btn btn-light ms-1 mx-auto fs-5"
              >
              Get OTP
              </button>
            </div>
            </form>
            
                {
                otpStatus===true &&(   
                    <div>
                    <form
                    onSubmit={handleSubmit(onOtpSubmit)}
                    className="text-start border p-3 text-light bg-dark"
                    style={{ borderRadius: "20px",backgroundColor:'	#008080',width:'500px'}}
                    >
                    {/* OTP Input */}
                    <div className="mb-3">
                        <label htmlFor="otp" className="mb-1 ms-1 fw-semibold " style={{fontSize:'20px'}}>
                        OTP
                        </label>
                        <input
                        type="number"
                        className="form-control p-3"
                        placeholder="Enter otp"
                        {...register("otp", { required: true })}
                        />
                        {errors.username?.type === "required" && (
                        <p className="text-danger">Enter OTP</p>
                        )}        
                    </div> 
                    {checkOtp && <p className='text-danger'>{checkOtp}</p>}
                    {/* New Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="mb-1 ms-1 fw-semibold " style={{fontSize:'20px'}}>
                        New Password
                        </label>
                        <input
                        type="text"
                        className="form-control p-3"
                        placeholder="Enter New Password"
                        {...register("password", { required: true })}
                        />
                        {errors.username?.type === "required" && (
                        <p className="text-danger">Enter Password</p>
                        )}    
                    </div> 
                    {/* submit button */}
                    <div className='text-center'>
                    <button className='btn btn-light ms-1 mx-auto fs-5'> Change Password</button>
                    </div>
                    {newPassword && (
                        <p className='text-success text-center'>{newPassword} ... redirecting to login page</p>
                    )}                    
                    </form>  
                    </div>      
                )}
                </div>
            </div>
        
        
    </div>
  )
}

export default ForgotPassword