import React, { useState } from 'react'
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import AssignTeam from '../AssignTeam/AssignTeam';
import { useForm } from "react-hook-form";
function GdoDashboard() {

  let navigate=useNavigate();
  // projects local state
  let [projects,setProjects]=useState([]);

  //get token
  let token=sessionStorage.getItem('token')
  // get projects under gdo
  const getProjects=async()=>{
    try{
      let response=await axios.get('http://localhost:4000/gdo/projects',{
        headers:{
          Authorization: `bearer ${token}`
        }
      })
      setProjects(response.data.payload)
    } catch(err){
      console.log(err)
    }
  }

  //for modal form
  let {
    register,
    setValue,
    getValues
  } = useForm();

  //modal state
  let [showModal, setShowModal] = useState(0);
  const openModel = () => {
    setShowModal(1);
  };
  const closeModel = () => {
    setShowModal(0);
  };

  let [reqRaised,setReqRaised]=useState(0);
  //raise resource req
  const raiseResourceReq=(projectId)=>{
    console.log(projectId)
    openModel();

    //set values
    setValue("project_id",projectId)
  }

  //save resource request
  const saveReq=async()=>{
    let resourceReq=getValues();
    let projectIdFromForm=resourceReq.project_id;
    //make http req
    try{
      let response=await axios.post(`http://localhost:4000/gdo/project/${projectIdFromForm}/resource-request`,resourceReq,{
      headers:{
        Authorization:`bearer ${token}`
      }})
      console.log(response)
      if(response.status===201){
        setReqRaised(1);
      }
    } catch(err){
      console.log(err)
    }
    
  }
  // re render when projects are fetched
  useEffect(()=>{
    getProjects()
  },[])

  return (
    <div>
    <div className='row'>
    <h2 className='text-center'>Project details</h2>
      {
        projects.length!==undefined ? (
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
                  <td> project_manager </td>
                  <td>Raise Resource Request</td>
                </tr>
              </thead>
              <tbody className='text-center'>
                {
                  projects.map((project,key)=>(
                    <tr key={key} style={{fontSize:'18px'}}>
                      <td onClick={()=>navigate(`/project-details`,{
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
                      })}>{project.project_start_date}</td>
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
                      })}>{project.project_fitness_indicator}</td>
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
                      <td>
                        <button className='btn btn-outline-success' onClick={()=>raiseResourceReq(project.project_id)}>Raise Resource Request</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) :(
          <p>No Projects to show</p>
        )
      }
      </div>
      {/* Resource Request */}
      {/* modal */}
      <Modal show={showModal} onHide={closeModel} backdrop={"static"} className='bg-light'>
        <Modal.Header closeButton>
          <Modal.Title>Resource Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="text-start   p-3 " style={{ borderRadius: "20px" }}>
            {/* Project Id */}
            <div className="mb-3">
              <label htmlFor="project_id" className="mb-1">
              Project Id
              </label>
              <input
                type="text"
                className="form-control"
                disabled
                {...register("project_id", { required: true })}
              />
            </div>
            {/* Resource Desc */}
            <div className="mb-3">
              <label htmlFor="resource_desc" className="mb-1">
              Resource Description
              </label>
              <input
                type="text"
                className="form-control"
                {...register("resource_desc", { required: true })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModel}>
            Close
          </Button>
          <Button variant="primary" onClick={saveReq}>
            Request
          </Button>
        </Modal.Footer>
        <div>
          {
            reqRaised===1 && (
              <p className='text-success text-center'>Request Raised Successfully</p>
            )
          }
        </div>
      </Modal>
      <div>
        <AssignTeam projects={projects}/>
      </div>
    
    </div>
  )
}

export default GdoDashboard