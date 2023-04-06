import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {store} from '../../store'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProjectUpdates from './ProjectUpdates';
import ProjectConcens from './ProjectConcerns';
import TeamComposition from './TeamComposition';
function ProjectDetails(props) {
    console.log(props)
    let location=useLocation();
    let {employee}=useSelector(state=>state.login)
    let projectId=props.projectId

    //get data from props
    if(employee.role!=='project-manager'){
        projectId=location.state.projectId;
    }
    //get token
    let token=sessionStorage.getItem('token')
   //employee state
   

   //local states
   
    let [concerns,setConcerns]=useState([])
    let [updates,setUpdates]=useState([])
    let [team,setTeam]=useState([])
    let [details,setDetails]=useState({})
    console.log(employee)
    
   //make reqs
   const reqs=async()=>{
    if(employee!==null && projectId!==undefined){
        //check employee role and re direct to its dashboard
        if(employee.role==='project-manager'){
            try{
                let response=await axios.get(`http://localhost:4000/manager/project/${projectId}`,{
                    headers:{
                        Authorization:`bearer ${token}`
                    }
                })
                console.log("pro manager")
                setConcerns(response.data.payload.project_concerns)
                setDetails(response.data.payload)
                setTeam(response.data.payload.team_compositions)
                setUpdates(response.data.projectUpdates)
                
            } catch(err){
                console.log(err)
            }
           
        }
        else if(employee.role==='gdo'){
            try{
                let response=await axios.get(`http://localhost:4000/gdo/project/${projectId}`,{
                    headers:{
                        Authorization:`bearer ${token}`
                    }
                })
                console.log("gdo")
                setConcerns(response.data.payload.project_concerns)
                setDetails(response.data.payload)
                setTeam(response.data.payload.team_compositions)
                setUpdates(response.data.projectUpdates)
            } catch(err){
                console.log(err)
            }
           
        }
        else if(employee.role==='admin'){
            try{
                let response=await axios.get(`http://localhost:4000/admin/project/${projectId}`,{
                headers:{
                    Authorization:`bearer ${token}`
                }
                
            })
            console.log("admin")
                setConcerns(response.data.payload.project_concerns)
                setDetails(response.data.payload)
                setTeam(response.data.payload.team_compositions)
                setUpdates(response.data.projectUpdates)
            } catch(err){
                console.log(err)
            }
            
        }
       }
   }
   useEffect(()=>{
    reqs()
   },[projectId])

  return (
    <div>
        <div className='d-flex justify-content-around' style={{}}>
        <div>
            <h2 className='text-success'>Team Count: {team.length}</h2>
        </div>
        <div>
            <p className='text-success'>Project Fitness {details.project_fitness_indicator}</p>
        </div>
        <div>
            <h2 className='text-success'>Concerns Indicator {concerns.length}</h2>
        </div>
        </div>
        <div className='row'>
        <h2 className='text-center'>Project details</h2>
        <div className='col mx-auto'>
        <table className='text-center table table-striped table-bordered table-hover table-responsive m-2'>
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
                  <td>Team Size</td>
                  <td>GDO Head</td>
                  <td> project_manager </td>
                </tr>
              </thead>
              <tbody className='text-center'>
                <tr>
                    <td>{details.project_id}</td>
                    <td>{details.project_name}</td>
                    <td>{details.client}</td>
                    <td> {details.client_account_manager}</td>
                    <td>{details.status}</td>
                    <td>{details.project_start_date}</td>
                    <td>{details.project_end_date}</td>
                    <td>{details.project_fitness_indicator}</td>
                    <td>{details.domain}</td>
                    <td>{details.type_of_project}</td>
                    <td>{team.length}</td>
                    <td>{details.gdo_head}</td>
                    <td> {details.project_manager}</td>
                </tr>
              </tbody>
        </table>
        </div>
        </div>
        <div>
        <ProjectUpdates projectId={projectId} reqs={reqs} projectUpdates={updates}/>
        </div>  
        <div>
        <ProjectConcens projectId={projectId} reqs={reqs} projectConcerns={concerns}/>
        </div> 
        <div>
        <TeamComposition team={team}/>
        </div>
    </div>
  )
}

export default ProjectDetails