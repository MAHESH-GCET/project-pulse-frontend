import React, { useEffect } from 'react';
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function AddProject() {
    //form to add projects
  let {register,handleSubmit,formState: { errors }}=useForm();
  let [project,setProject]=useState(0)
  let [message,setMessage]=useState("")
  let {employee}=useSelector(state=>state.login)
  let navigate=useNavigate()
    //get token
  let token=sessionStorage.getItem('token');
  //add new project
  const addNewProject=async(projectObj)=>{
    try{
      let response=await axios.post('http://localhost:4000/admin/add-project',projectObj,{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      console.log(response)
      if(response.status===201){
        setProject(1);
        setMessage("Project created")
        setTimeout(()=>{
            navigate(`/admin/${employee.employee_id}`)
        },3000)
      }
    } catch(err){
      console.log(err)
    }
  }
 useEffect(()=>{
    addNewProject()
 },[setProject])
  return (
    <div className='container'>
        {/* add new project */}
      <div className='row justify-content-center' style={{marginTop:'50px'}}>
        <div className='col col-md-6 mx-auto'>
        <form
          onSubmit={handleSubmit(addNewProject)}
          className="text-start border p-3 text-light"
          style={{ borderRadius: "20px",backgroundColor:'#004c4c',width:'500px'}}
        >
          <h2 className='text-center text-light mb-3'>Add Project</h2>
          {/* project name */}
          <div className='mb-3'>
            <label htmlFor='project_name' className="mb-1 ms-1 fw-semibold ">
              Project Title
            </label>
            <input
            type='text'
            className='form-control p-1'
            placeholder='Enter Project Title'
            {...register("project_name",{required:true})} 
            />
            {errors.project_name?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* client */}
          <div className=' mb-3'>
            <label htmlFor='client' className="mb-1 ms-1 fw-semibold ">
              Client
            </label>
            <input
            type='text'
            className='form-control p-1'
            placeholder='Enter Client Name'
            {...register("client",{required:true})} 
            />
            {errors.client?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* client account manager */}
          <div className='mb-3'>
            <label htmlFor='client_account_manager' className="mb-1 ms-1 fw-semibold ">
              Client Account Manager
            </label>
            <input
            type='number'
            className='form-control p-1'
            placeholder='Enter Client Account Manager Id'
            {...register("client_account_manager",{required:true})} 
            />
            {errors.client_account_manager?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* status */}
          <div className='mb-3'>
            <label htmlFor='status' className="mb-1 ms-1 fw-semibold ">
              Project Status
            </label>
            <input
            type='text'
            className='form-control p-1'
            placeholder='Status of project'
            {...register("status",{required:true})} 
            />
            {errors.status?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* project start date */}
          <div className=' mb-3'>
            <label htmlFor='project_start_date' className="mb-1 ms-1 fw-semibold ">
              Project Start Date
            </label>
            <input
            type='date'
            className='form-control p-1'
            placeholder='Start Date'
            {...register("project_start_date",{required:true})} 
            />
            {errors.project_start_date?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* project fitness indicator */}
          <div className='mb-3'>
            <label htmlFor='project_fitness_indicator' className="mb-1 ms-1 fw-semibold ">
              Project Fitness
            </label>
            <input
            type='text'
            className='form-control p-1'
            placeholder='Project Fitness'
            {...register("project_fitness_indicator",{required:true})} 
            />
            {errors.project_fitness_indicator?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* domain */}
          <div className='mb-3'>
            <label htmlFor='domain' className="mb-1 ms-1 fw-semibold ">
              Domain
            </label>
            <input
            type='text'
            className='form-control p-1'
            placeholder='Project Domain'
            {...register("domain",{required:true})} 
            />
            {errors.domain?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* type */}
          <div className='mb-3'>
            <label htmlFor='type_of_project' className="mb-1 ms-1 fw-semibold ">
              Type
            </label>
            <input
            type='text'
            className='form-control p-1'
            placeholder='Project Type'
            {...register("type_of_project",{required:true})} 
            />
            {errors.type_of_project?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* gdo id */}
          <div className=' mb-3'>
            <label htmlFor='gdo_head' className="mb-1 ms-1 fw-semibold ">
              GDO Head
            </label>
            <input
            type='number'
            className='form-control p-1'
            placeholder='Enter GDO Id'
            {...register("gdo_head",{required:true})} 
            />
            {errors.gdo_head?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* manager */}
          <div className='mb-3'>
            <label htmlFor='project_manager' className="mb-1 ms-1 fw-semibold ">
              Project Manager
            </label>
            <input
            type='number'
            className='form-control p-1'
            placeholder='Enter Manager Id'
            {...register("project_manager",{required:true})} 
            />
            {errors.project_manager?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          <div className='text-center'>
          <button className='btn btn-dark'>Add</button>
          </div>
          
            {
                project===1 ? (
                    <p className='text-center text-dark'>Project Added</p>
                ) : (
                    <p className='text-center text-danger'>{message}</p>
                )
            }
          
        </form>
        </div>
        </div>
    </div>
  )
}

export default AddProject