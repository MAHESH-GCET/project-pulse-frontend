import React from 'react'
import moment from 'moment'
import { Accordion } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
function TeamComposition(props) {
let team=props.team;
    
  return (
    <div>
        <div>
        
            {
                team!==undefined && team.length>0 ?(
                    <div>
                        <Accordion defaultActiveKey='0'>
                            <AccordionItem eventKey='0' style={{backgroundColor:'transparent'}}>
                               <AccordionHeader>
                               <h2 className='text-dark  fw-bold text-center ms-5'>TEAM COMPOSITION</h2>
                               </AccordionHeader>
                                <AccordionBody>
                                <table  className='bg-light text-center table table-striped table-bordered table-hover table-responsive m-2 mt-4'>
                                <thead className='text-center'>
                                <tr className='text-light' style={{backgroundColor:'#004c4c',fontSize:'20px'}}>
                                    <td>Id in Team</td>
                                    <td>Project Id</td>
                                    <td>Role</td>
                                    <td>Status</td>
                                    <td>Start Date</td>
                                    <td>Billing Status</td>
                                    <td>Exposed To Customer</td>
                                </tr>
                                </thead>
                                <tbody className='text-center'>
                                {
                                    team.map((teamObj,key)=>(
                                        <tr key={key}>
                                            <td>{teamObj.id}</td>
                                            <td>{teamObj.project_id}</td>
                                            <td>{teamObj.role_in_project}</td>
                                            <td>{teamObj.status}</td>
                                            <td>{moment(teamObj.start_date).format('YYYY-MM-DD')}</td>
                                            <td>{teamObj.billing_status}</td>
                                            {
                                                teamObj.exposed_to_customer ?(
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
                    <h4 className='text-center text-dark'> No Team Allocated </h4>
                )
            }
        </div>
    </div>
  )
}

export default TeamComposition