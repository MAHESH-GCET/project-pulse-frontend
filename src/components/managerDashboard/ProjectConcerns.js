import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Accordion } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
function ProjectConcerns(props) {
    //get concerns from props
    let projectId=props.projectId;
    let concerns=props.projectConcerns
    let [concernRaised,setConcernRaised]=useState(0);
    let {employee}=useSelector(state=>state.login)
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
    //raise concern
    const raiseConcern=()=>{
        openModel();
        setValue("project_id",projectId)
        setValue("concern_raised_by",employee.role)
    }
    //save concern
    const saveConcern=async()=>{
        let concernData=getValues();
        concernData.concern_raised_on_date=new Date().toJSON().slice(0,10);
        console.log(concernData)
        //make req
        try{
            let response=await axios.post('http://localhost:4000/manager/project-concern',concernData,{
                headers:{
                    Authorization:`bearer ${token}`
                }
            })
            if(response.status===201){
                setConcernRaised(1)
                props.reqs();
                setTimeout(()=>{
                    reset();
                    closeModel();
                    setConcernRaised(0);
                },1000)
            }
        } catch(err){
            console.log(err)
        }
    }
  return (
    <div>
      <div>
            {
                concerns!==undefined && concerns.length>0 ?(
                    <div>
                        <Accordion defaultActiveKey='1'>
                          <AccordionItem style={{backgroundColor:'light'}} eventKey='1'>
                            <AccordionHeader>
                            <h2 className='fw-bold text-dark text-center ms-5'>PROJECT CONCERNS</h2>
                            </AccordionHeader>
                            <AccordionBody>
                            {
                            employee.role==='project-manager' && (
                            <button 
                            className='float-end btn text-light d-block mb-3 me-4'
                            style={{backgroundColor:'#004c4c'}} 
                            onClick={raiseConcern}
                            >Raise Concern
                            </button>
                            )
                            }
                            <table className='text-center table table-striped table-bordered table-hover table-responsive m-2 bg-light'>
                            <thead className='text-center'>
                                <tr className='text-light' style={{backgroundColor:'#004c4c',fontSize:'20px'}}>
                                    <td>Project Id</td>
                                    <td>Concern Description</td>
                                    <td>Concern Raised By</td>
                                    <td>Concern Raised On</td>
                                    <td>Is Concern Raised By Client?</td>
                                    <td>Severity of Concern</td>
                                    <td>Status of Concern</td>
                                    <td>Concern Mitigation Date</td>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    concerns?.map((concernObj,key)=>(
                                        <tr key={key}>
                                            <td>{concernObj.project_id}</td>
                                            <td>{concernObj.concern_desc}</td>
                                            <td>{concernObj.concern_raised_by}</td>
                                            <td>{moment(concernObj.concern_raised_on_date).format('DD-MM-YYYY')}</td>
                                            {
                                                concernObj.concern_raised_by_client ?(
                                                    <td>Yes</td>
                                                ) : (
                                                    <td>No</td>
                                                )
                                            }
                                            <td>{concernObj.severity_of_concern}</td>
                                            <td>{concernObj.status_of_concern}</td>
                                            <td></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </table>
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion>
                        
                    </div>
                ):(
                    <h4 className='text-dark text-center'> No Concerns Available</h4>
                )
            }
            {/* modal */}
        <Modal show={showModal} onHide={closeModel} backdrop={"static"} className='bg-light'>
        <Modal.Header closeButton>
          <Modal.Title>Raise Concern</Modal.Title>
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
            {/* concern desc */}
            <div className="mb-3">
              <label htmlFor="concern_desc" className="mb-1">
              Concern Description
              </label>
              <input
                type="text"
                className="form-control"
                {...register("concern_desc", { required: true })}
              />
            </div>
            {/* concern raised on */}
            {/*<div className="mb-3">
              <label htmlFor="concern_raised_on_date" className="mb-1">
              Concern Raised On
              </label>
              <input
                type="date"
                className="form-control"
                {...register("concern_raised_on_date", { required: true })}
              />
            </div>*/}
            {/* concern raised by */}
            <div className="mb-3">
              <label htmlFor="concern_raised_by" className="mb-1">
              Concern Raised By
              </label>
              <input
                type="text"
                className="form-control"
                disabled
                {...register("concern_raised_by", { required: true })}
              />
            </div>
            {/* Severity of concern */}
            <div className="mb-4">
                <label htmlFor="severity_of_concern">Severity</label>
                <select name="severity_of_concern" {...register('severity_of_concern',{required:true})} id="role " className="form-control" defaultValue='x'>
                    <option value='x' disabled>--SELECT--</option>
                    <option value='high'>High</option>
                    <option value='medium'>Medium</option>
                    <option value='low'>Low</option>
                </select>
            </div>
            {/*  status */}
            <div className="mb-4">
                <label htmlFor="status_of_concern">Status</label>
                <select name="status_of_concern" {...register('status_of_concern',{required:true})} id="role " className="form-control"  defaultValue='raised'>
                    <option disabled>--RAG Status--</option>
                    <option value='raised'>Raised</option>
                    <option value='remediation suggested'>Remediation Suggested</option>
                    <option value='mitigated'>Mitigated</option>
                </select>
            </div>
            {/* concern raised by cllient */}
            <div className="mb-4">
                <label htmlFor="concern_raised_by_client">Concern Raised By Client</label>
                <select name="concern_raised_by_client" {...register('concern_raised_by_client',{required:true})} id="role " className="form-control" defaultValue={'x'}>
                    <option value={'x'} disabled>--SELECT--</option>
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
          <Button variant="primary" onClick={saveConcern}>
            Raise
          </Button>
        </Modal.Footer>
        <div>
          {
            concernRaised===1 && (
              <p className='text-success text-center'>Concern Raised Successfully</p>
            ) 
          }
        </div>
        </Modal>
        </div>
    </div>
  )
}

export default ProjectConcerns