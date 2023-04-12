import React, { useEffect } from 'react';
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function AddProject() {
    //form to add projects
  let {register,handleSubmit,formState: { errors },reset}=useForm();
  let [project,setProject]=useState(0)
  let [message,setMessage]=useState("")
  let [employeeList,setEmployeeList]=useState([])
  let {employee}=useSelector(state=>state.login)
  let navigate=useNavigate()
    //get token
  let token=sessionStorage.getItem('token');
  
  //get all employees
  const getEmployees=async()=>{
    try{
      let response=await axios.get('http://localhost:4000/admin/employees',{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      setEmployeeList(response.data.payload)
    } catch(err){
      console.log(err)
    }
  }

  // filter gdo from employee list
  let gdoList=employeeList.filter(employeeObj=>employeeObj.role==='gdo')

  //filter project-manager from employee list
  let managerList=employeeList.filter(employeeObj=>employeeObj.role==='project-manager')
  
  //add new project
  const addNewProject=async(projectObj)=>{
    try{
      let response=await axios.post('http://localhost:4000/admin/add-project',projectObj,{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      if(response.status===201){
        setProject(1);
        setMessage("Project created")
        setTimeout(()=>{
            navigate(`/admin/${employee.employee_id}`)
        },3000)
      }
      else if(response.status===200 && response.data.errMsg==='Validation error'){
        setMessage('Manager is already assigned to project')
      }
    } catch(err){
      console.log(err)
    }
  }
 useEffect(()=>{
    getEmployees()
    addNewProject()
 },[setProject])
  return (
    <div className='container'>
        {/* add new project */}
      <div className='row justify-content-center' style={{marginTop:'50px'}}>
        <div className='col col-md-6 mx-auto'>
        <form
          onSubmit={handleSubmit(addNewProject)}
          className="text-start border p-3 text-light w-100 mb-5"
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
            className='form-control p-2'
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
            className='form-control p-2'
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
            className='form-control p-2'
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
            <select className='form-control p-2' {...register('status',{required:true})}>
            <option selected disabled>--select--</option>
            <option value='sales'>Sales</option>
            <option value='pre-sales'>Pre-Sales</option>
            <option value='client sign-off'>Client Sign Off</option>
            <option value='in-progress'>In-Progress</option>
            <option value='completed'>Completed</option>
            <option value='paused'>Paused</option>
            <option value='deferred'>Deferred</option>
            </select>
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
            className='form-control p-2'
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
            <select className='form-control p-2' {...register('project_fitness_indicator',{required:true})}>
            <option selected disabled>--select--</option>
            <option value='red'>Red</option>
            <option value='amber'>Amber</option>
            <option value='green'>Green</option>
            </select>
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
            className='form-control p-2'
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
            <select className='form-control p-2' {...register('type_of_project',{required:true})}>
            <option selected disabled>--select--</option>
            <option value='development'>Development</option>
            <option value='devops'>DevOps</option>
            <option value='test-automation'>Test Automation</option>
            <option value='performance testing'>Performance Testing</option>
            <option value='security'>Security</option>
            <option value='sustenance engineering'>Sustaenance Engineering</option>
            <option value='mobility'>Mobility</option>
            <option value='storage'>Storage</option>
            </select>
            {errors.type_of_project?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* gdo id */}
          <div className=' mb-3'>
            <label htmlFor='gdo_head' className="mb-1 ms-1 fw-semibold ">
              GDO Head
            </label>
            <select className='form-control p-2' {...register('gdo_head',{required:true})}>
            <option value="">
            --select--
            </option>
            {
                gdoList.map((gdo,key)=>(
                    <option key={key} value={gdo.employee_id}>
                        {gdo.employee_id} - {gdo.employee_name}
                    </option>
                ))
            }
            </select>
            {errors.gdo_head?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          {/* manager */}
          <div className='mb-3'>
            <label htmlFor='project_manager' className="mb-1 ms-1 fw-semibold ">
              Project Manager
            </label>
            <select className='form-control p-2' {...register('project_manager',{required:true})}>
            <option selected disabled>
            --select--
            </option>
            {
                managerList.map((manager,key)=>(
                    <option key={key} value={manager.employee_id}>
                        {manager.employee_id} - {manager.employee_name}
                    </option>
                ))
            }
            </select>
            {errors.project_manager?.type === "required" && (
                <p className="text-danger">Enter Title</p>
            )}
          </div>
          <div className='text-center'>
          <button className='btn btn-dark'>Add</button>
          
          </div>
          
            {
                project===1 ? (
                    <p className='text-center text-danger'>Project Added</p>
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