import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { Accordion } from 'react-bootstrap';
function AdminDashboard() {
  let navigate=useNavigate();
  //projects
  let [projects,setProjects]=useState([]);
  let [resources,setResources]=useState([]);

  //get token
  let token=sessionStorage.getItem('token');
 
  //make req to server
  const getProjects=async()=>{
    try{
      let response=await axios.get('http://localhost:4000/admin/projects',{
      headers:{Authorization: `bearer ${token}`}
      })
      setProjects(response.data.payload)
    } catch(err){
      console.log(err);
    }
    
  }

  
  // get resourcing reqs
  const getResourcingReq=async()=>{
    try{
      let response= await axios.get('http://localhost:4000/admin/project/1/resource-requests',{
        headers:{
          Authorization:`bearer ${token}`
        }
      });
      setResources(response.data.payload)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getProjects();
    getResourcingReq();
  },[])
  
  return (
    <div>
      <Accordion className='mt-5' defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header> <h2 className='ms-5'>Project Details</h2></Accordion.Header>
          <Accordion.Body>
          <div >
        {/* Project Details */}
      <button 
      className='float-end btn text-light d-block mb-3'
      style={{backgroundColor:'#004c4c'}}
      onClick={()=>{navigate('../admin/add-project')}}
      > Create Project </button>
      
      {
        projects!==undefined ? (
          <div className='mt-3'>
            <table className='text-center table table-striped table-bordered table-responsive m-2'>
              <thead className='text-center'>
                <tr className='text-light' style={{backgroundColor:'#004c4c',fontSize:'20px'}}>
                  <td> Project Id </td>
                  <td> Project Name </td>
                  <td> client </td>
                  <td> client account manager </td>
                  <td> status </td>
                  <td> project_start_date </td>
                  <td> project_end_date </td>
                  <td> project_fitness_indicator </td>
                  <td> domain </td>
                  <td> type_of_project </td>
                  <td> project_manager </td>
                  { /* <td>Edit</td>
                  <td>Delete</td> */
                  }
                 
                </tr>
              </thead>
              <tbody className='text-center'>
                {
                  projects.map((project,key)=>(
                    <tr key={key} style={{fontSize:'18px'}}>
                      <td 
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.project_id}</td>
                      <td 
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.project_name}</td>
                      <td 
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.client}</td>
                      <td 
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.client_account_manager}</td>
                      <td 
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.status}</td>
                      <td 
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{moment(project.project_start_date).format('YYYY-MM-DD')}</td>
                      <td 
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.project_end_date}</td>
                      <td
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{
                        project.project_fitness_indicator==='green' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="green" className="bi bi-circle-fill" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8"/>
                          </svg>
                      ) : (project.project_fitness_indicator==='amber') ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="orange" className="bi bi-circle-fill" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8"/>
                          </svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" className="bi bi-circle-fill" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8"/>
                          </svg>
                      )
                      }</td>
                      <td
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.domain}</td>
                      <td
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.type_of_project}</td>
                      <td
                      onClick={()=>navigate(`/project-details`,{
                        state:{
                          projectId:project.project_id
                        }
                      })}>{project.project_manager}</td>
                      
                      {/*<td><button className='btn btn-outline-warning'>Edit</button></td>
                      <td><button className='btn btn-outline-danger'>Delete</button></td>*/}
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Projects to show</p>
        )
        
      }
          </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header><h2 className='ms-5'>Resource Requests</h2></Accordion.Header>
          <Accordion.Body>
          {/* get resourcing requests */}
          <div>
        <table className='text-center table table-striped table-bordered table-hover w-50 mx-auto mt-3'>
          <thead className='table '>
            <tr  className='table text-light' style={{backgroundColor:'#004c4c',fontSize:'20px'}}>
              <td>Project Id</td>
              <td>Resource Description</td>
            </tr>
          </thead>
          <tbody>
            {
              resources.length>0 && (
                resources.map((resourceObj,key)=>(
                  <tr key={key} style={{fontSize:'18px'}}>
                    <td>{resourceObj.project_id}</td>
                    <td>{resourceObj.resource_desc}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
          </div>  
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      
    </div>
  )
}

export default AdminDashboard