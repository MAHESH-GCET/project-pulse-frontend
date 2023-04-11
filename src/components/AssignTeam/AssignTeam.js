import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
function AssignTeam(props) {
  // get projects from props
  let projects=props.projects
  let [teamAssigned,setTeamAssigned]=useState(0)

  //form to assign team
  let {register,handleSubmit,formState: { errors }}=useForm();
  //token
  let token = sessionStorage.getItem('token')
  //assign team
  const assignTeam=async(teamDetails)=>{
    try{
        let response=await axios.post('http://localhost:4000/gdo/assign-team',teamDetails,{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
       
        if(response.status===201){
            setTeamAssigned(1)
            
        }
    } catch(err){
        console.log(err)
    }
    

  }
  useEffect(()=>{

  },[])
  return (
    <div className='container'>
        <div className='row justify-content-center mt-5 mx-auto'>
        <div className='col col-md-6'>
        <form
        onSubmit={handleSubmit(assignTeam)}
        className="text-start border p-3 text-light"
        style={{ borderRadius: "20px",backgroundColor:'#004c4c',width:'500px'}}
        >
        <h2 className='text-center text-light mb-3'>Assign Team</h2>
        {/* project id */}
        <div>
            <label htmlFor='project_id' className="mb-1 ms-1 fw-semibold ">
                Select Project
            </label>
            <select
            className='form-control'
            {...register('project_id',{required:true})}
            >
            <option selected disabled>
            --select--
            </option>
            {
                projects.map((project,key)=>(
                    <option key={key} value={project.project_id}>
                        {project.project_id} - {project.project_name}
                    </option>
                ))
            }
            </select>
        </div>
        {/* role */}
        <div className='mb-2'>
            <label htmlFor='role_in_project' className="mb-1 ms-1 fw-semibold ">
                Role
            </label>
            <select className='form-control' {...register('role_in_project',{required:true})}>
            <option selected disabled>--select--</option>
            <option value='QA'>QA</option>
            <option value='dev'>Dev</option>
            <option value='management'>Management</option>
            <option value='devops'>DevOps</option>
            <option value='product'>Product</option>
            </select>
            {errors.role_in_project?.type==='required' && (
                <p className='text-danger'>Enter Role</p>
            )
            }
        </div>
        {/* start date */}
        <div className='mb-2'>
            <label htmlFor='start_date' className="mb-1 ms-1 fw-semibold ">
                Start Date
            </label>
            <input
                type='date'
                className='form-control'
                placeholder='date of joining project'
                {...register('start_date',{required:true})}
            />
            {errors.start_date?.type==='required' && (
                <p className='text-danger'>Enter date</p>
            )
            }
        </div>
        {/* status */}
        <div className='mb-2'>
            <label htmlFor='status' className="mb-1 ms-1 fw-semibold ">
                Status
            </label>
            <select className='form-control' {...register('status',{required:true})}>
            <option selected disabled>--select--</option>
            <option value='active'>Active</option>
            <option value='in-active'>In-Active</option>
            </select>
        </div>
         {/* billling status */}
         <div className='mb-2'>
            <label htmlFor='billing_status' className="mb-1 ms-1 fw-semibold ">
                Billing Status
            </label>
            <select className='form-control' {...register('billing_status',{required:true})}>
            <option selected disabled>--select--</option>
            <option value='billed'>Billed</option>
            <option value='buffered'>Buffered</option>
            </select>
        </div>
        {/* exposed to customer*/}
        <div className='mb-2'>
            <label htmlFor='exposed_to_customer' className="mb-1 ms-1 fw-semibold ">
                Exposed to Customer
            </label>
            <select className='form-control' {...register('exposed_to_customer',{required:true})}>
            <option selected disabled>--select--</option>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
            </select>
        </div>
        {/* Allocation Type */}
        <div className='mb-2'>
            <label htmlFor='allocation_type' className="mb-1 ms-1 fw-semibold ">
                Allocation Type
            </label>
            <select className='form-control' {...register('allocation_type',{required:true})}>
            <option selected disabled>--select--</option>
            <option value='temporary'>Temporary</option>
            <option value='permanent'>Permanent</option>
            </select>
        </div>
        <div className='text-center'>
            <button className='btn btn-dark'>Create</button>
        </div>
        <div>
        {
            teamAssigned===1 && (
                <p className='text-center text-danger'>Team Assigned</p>
            )
        }
        </div>
        </form>
        </div>
        </div>   
    </div>
  )
}

export default AssignTeam