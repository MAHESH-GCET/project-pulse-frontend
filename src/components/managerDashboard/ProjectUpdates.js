import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

function ProjectUpdates(props) {
    let {employee}=useSelector(state=>state.login)
    // get id from props
    let projectId=props.projectId;
    let updates=props.projectUpdates;
    let [updateStatus,setUpdateStatus]=useState(0)
    //get token
    let token=sessionStorage.getItem('token')
    
    let {
        register,
        setValue,
        getValues,
        reset
    } = useForm();
    
    //modal state
    let [showModal, setShowModal] = useState(0);
    const openModel = () => {
        setShowModal(1);
    };
    const closeModel = () => {
        setShowModal(0);
    };
    //raise update
    const raiseUpdate=()=>{
      openModel();
      setValue("project_id",projectId)
        
    }
    //save update
    const saveUpdate=async()=>{
      let updateData=getValues();
      updateData.date=new Date().toJSON().slice(0,10);
      //make req
      try{
        let response=await axios.post('http://localhost:4000/manager/project-update',updateData,{
          headers:{
            Authorization:`bearer ${token}`
         }
        })
    
        if(response.status===200){
          setUpdateStatus(1)
          props.reqs();
          setTimeout(()=>{
            reset()
            closeModel()
            setUpdateStatus(0)
            },1000)
          }
        } catch(err){
          console.log(err)
      }
    }

  return (
    <div>
        <div>
        
        <div  >
            {
                (updates!==undefined && updates.length>0) ?(
                <div>
                    <Accordion defaultActiveKey='1'>
                      <AccordionItem style={{backgroundColor:'transparent'}} eventKey='1'>
                      <AccordionHeader>
                      <h2 className='text-dark fw-bold ms-5'>PROJECT UPDATES</h2>
                      </AccordionHeader>
                      <AccordionBody>
                      {
                      employee.role==='project-manager' && (
                      <button className='float-end btn text-light d-block mb-3 me-4'
                      style={{backgroundColor:'#004c4c'}}
                      onClick={raiseUpdate}
                      >
                      Add Update </button>
                      )
                      }
                      <table className='text-center table table-striped table-bordered table-hover table-responsive m-2 bg-light'>
                      <thead className='text-center'>
                        <tr className='text-light' style={{backgroundColor:'#004c4c',fontSize:'20px'}}>
                            <td> Project Id</td>
                            <td>project Status</td>
                            <td>Date</td>
                            <td>Schedule Status</td>
                            <td>Resource Status</td>
                            <td>Quality Status</td>
                            <td>Waiting for Client I/P</td>
                        </tr>
                      </thead>
                      <tbody className='text-center'>
                            {
                                updates.map((updateObj,key)=>(
                                    <tr key={key}>
                                        <td>{updateObj.project_id}</td>
                                        <td>{updateObj.project_status}</td>
                                        <td>{moment(updateObj.date).format('YYYY-MM-DD')}</td>
                                        <td>
                                          {
                                            updateObj.schedule_status==='green' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="green" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          ) : (updateObj.schedule_status==='amber') ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="orange" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          )
                                          } 
                                        </td>
                                        <td>
                                          {
                                            updateObj.resourcing_status==='green' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="green" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          ) : (updateObj.resourcing_status==='amber') ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="orange" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          )
                                          } 
                                        </td>
                                        <td>
                                          {
                                            updateObj.quality_status==='green' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="green" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          ) : (updateObj.quality_status==='amber') ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="orange" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                          )
                                          } 
                                        </td>
                                        {
                                            updateObj.waiting_for_client_ip ?(
                                                <td>Yes</td>
                                            ) : (
                                                <td>No</td>
                                            )
                                        }
                                    </tr>
                                ))
                            }
                        
                      </tbody>
                      </table>
                      </AccordionBody>
                      </AccordionItem>
                    </Accordion>
                    
                </div>
                ) :(
                    <h4 className='text-dark text-center'> No Updates Available </h4>
                )
            }
            {/* modal */}
        <Modal show={showModal} onHide={closeModel} backdrop={"static"} className='bg-light'>
        <Modal.Header closeButton>
          <Modal.Title>Add Update</Modal.Title>
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
            {/* Date */}
            {/*<div className="mb-3">
              <label htmlFor="date" className="mb-1">
              Date
              </label>
              <input
                type="date"
                className="form-control"
                {...register("date", { required: true })}
              />
            </div>*/}
            {/* project status */}
            <div className="mb-3">
              <label htmlFor="project_status" className="mb-1">
              Project Status
              </label>
              <select className='form-control' {...register('project_status',{required:true})} defaultValue={'x'}>
            <option value={'x'} disabled>--select--</option>
            <option value='sales'>Sales</option>
            <option value='pre-sales'>Pre-Sales</option>
            <option value='client sign-off'>Client Sign Off</option>
            <option value='in-progress'>In-Progress</option>
            <option value='completed'>Completed</option>
            <option value='paused'>Paused</option>
            <option value='deferred'>Deferred</option>
            </select>
            </div>
            {/* schedule status */}
            <div className="mb-4">
                <label htmlFor="schedule_status">Schedule Status</label>
                <select name="schedule_status" {...register('schedule_status',{required:true})} id="role " className="form-control" defaultValue='x'>
                    <option value='x' disabled>--RAG Status--</option>
                    <option value='green'>Green</option>
                    <option value='amber'>Amber</option>
                    <option value='red'>Red</option>
                </select>
            </div>
            {/* resourcing status */}
            <div className="mb-4">
                <label htmlFor="resourcing_status">Resourcing Status</label>
                <select name="resourcing_status" {...register('resourcing_status',{required:true})} id="role " className="form-control" defaultValue='x'>
                    <option value='x' disabled>--RAG Status--</option>
                    <option value='green'>Green</option>
                    <option value='amber'>Amber</option>
                    <option value='red'>Red</option>
                </select>
            </div>
            {/* quality status */}
            <div className="mb-4">
                <label htmlFor="quality_status">Quality Status</label>
                <select name="quality_status" {...register('quality_status',{required:true})} id="role " className="form-control" defaultValue='x'>
                    <option value='x' disabled>--RAG Status--</option>
                    <option value='green'>Green</option>
                    <option value='amber'>Amber</option>
                    <option value='red'>Red</option>
                </select>
            </div>
            {/* waiting for client input */}
            <div className="mb-4">
                <label htmlFor="waiting_for_client_ip">Waiting For Client i/p</label>
                <select name="waiting_for_client_ip" {...register('waiting_for_client_ip',{required:true})} id="role " className="form-control" defaultValue='x'>
                    <option value='x' disabled>--RAG Status--</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModel}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdate}>
            Update
          </Button>
        </Modal.Footer>
        <div>
          {
            updateStatus===1 && (
              <p className='text-success text-center'>Updated Successfully</p>
            ) 
          }
        </div>
      </Modal>
      </div>
        </div>
    </div>
  )
}

export default ProjectUpdates