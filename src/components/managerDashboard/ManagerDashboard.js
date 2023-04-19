import React, { useEffect,useState } from 'react'
import axios from 'axios'
import ProjectDetails from './ProjectDetails';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function ManagerDashboard() {
  let navigate=useNavigate()
  let {status}=useSelector(state=>state.login)

  //project Id state
  const [projectId,setProjectId]=useState()
  //get token
  let token=sessionStorage.getItem('token');
  //make req to server
  const getSpecificProject=async()=>{
    try{
      let response=await axios.get('http://localhost:4000/manager/projects',{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      let projectId=response.data.payload[0].project_id
      setProjectId(projectId)
    } catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getSpecificProject();
    if(status==='idle'){
      navigate('/')
    }
  },[]);
  return (
    <div>
      {
        status==='success' ? (
          <div>
          <ProjectDetails projectId={projectId}/>
          </div>
        ) : (
          navigate('/')
        )
      }
    
    
    </div>

  )
}

export default ManagerDashboard