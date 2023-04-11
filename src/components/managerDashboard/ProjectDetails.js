import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProjectUpdates from './ProjectUpdates';
import ProjectConcens from './ProjectConcerns';
import TeamComposition from './TeamComposition';
import { Card } from 'react-bootstrap';
import moment from 'moment';
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
            console.log(response.data)
            setConcerns(response.data.payload.project_concerns)
            setDetails(response.data.payload)
            setTeam(response.data.payload.team_compositions)
            setUpdates(response.data.payload.project_updates)
            } catch(err){
                console.log(err)
            }
            
        }
       }
   }
   let billedCount=0;
   let billedCountCheck=team.map(team=>{
    if(team.billing_status==='billed')
    billedCount++
   })
   console.log(billedCountCheck)
   console.log(billedCount)
   useEffect(()=>{
    reqs()
   },[projectId])

  return (
    <div>
        <div className='d-flex justify-content-around'>
       <Card style={{width:'13rem'}}>
        <Card.Body>
            <Card.Title className='text-center'>Team Size</Card.Title>
            <Card.Text className='text-center'>{billedCount}</Card.Text>
        </Card.Body>
       </Card>
       <Card style={{width:'13rem'}}>
        {
            details.project_fitness_indicator==='red' ? (
            <Card.Body>
            <Card.Title className='text-center'>Project Fitness</Card.Title>
            <Card.Text className='text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8"/>
            </svg>
            </Card.Text>
            </Card.Body>
            ) : details.project_fitness_indicator==='amber' ? (
                <Card.Body>
                <Card.Title className='text-center'>Project Fitness</Card.Title>
                <Card.Text className='text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/>
                </svg>
                </Card.Text>
                </Card.Body>
            ): (
                <Card.Body>
                <Card.Title className='text-center'>Project Fitness</Card.Title>
                <Card.Text className='text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/>
                </svg>
                </Card.Text>
                </Card.Body>
            )
        }
        
       </Card>
       <Card style={{width:'13rem'}}>
       
            {
                (concerns.length===0) ? (
                    <Card.Body className='bg-success'>
                    <Card.Title className='text-center text-light'>Concern Indicator</Card.Title>
                    <Card.Text className='text-center text-light' style={{fontSize:'25px'}}>{concerns.length}</Card.Text>
                    </Card.Body>
                ) : (concerns.length>0 && concerns.length<5) ? (
                    <Card.Body className='bg-warning'>
                    <Card.Title className='text-center text-light'>Concern Indicator</Card.Title>
                    <Card.Text className='text-center text-light' style={{fontSize:'25px'}}>{concerns.length}</Card.Text>
                    </Card.Body>
                ) : (
                    <Card.Body className='bg-danger'>
                    <Card.Title className='text-center text-light'>Concern Indicator</Card.Title>
                    <Card.Text className='text-center text-light' style={{fontSize:'25px'}}>{concerns.length}</Card.Text>
                    </Card.Body>
                )
            }
            
        
       </Card>
        </div>
        <div className='row mt-5'>
        <h2 className='text-center text-secondary'>PROJECT DETAILS</h2>
        <div className='col  mx-auto'>
        <table className='text-center table table-striped bg-light table-bordered table-hover table-responsive m-2'>
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
                </tr>
              </thead>
              <tbody className='text-center'>
                <tr>
                    <td>{details.project_id}</td>
                    <td>{details.project_name}</td>
                    <td>{details.client}</td>
                    <td> {details.client_account_manager}</td>
                    <td>{details.status}</td>
                    <td>{moment(details.project_start_date).format('YYYY-MM-DD')}</td>
                    <td>{
                        details.project_end_date!==null && <td>{moment(details.project_end_date).format('YYYY-MM-DD')}</td>
                        }
                    </td>
                    <td>
                        {
                            details.project_fitness_indicator==='green' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="green" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                                </svg>
                            ) : (details.project_fitness_indicator==='amber') ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="orange" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                                </svg>
                            )
                        }
                    </td>
                    <td>{details.domain}</td>
                    <td>{details.type_of_project}</td>
                    <td>{team.length}</td>
                </tr>
              </tbody>
        </table>
        </div>
        </div>
        <div className='mt-5'>
        <ProjectUpdates projectId={projectId} reqs={reqs} projectUpdates={updates}/>
        </div>  
        <div className='mt-5'> 
        <ProjectConcens projectId={projectId} reqs={reqs} projectConcerns={concerns}/>
        </div> 
        <div className='mt-5'>
        <TeamComposition team={team}/>
        </div>
    </div>
  )
}

export default ProjectDetails