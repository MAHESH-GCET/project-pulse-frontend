import React from 'react'
import moment from 'moment'
function TeamComposition(props) {
let team=props.team;
    
  return (
    <div>
        <div>
        <h2 className='text-secondary text-center'>TEAM COMPOSITION</h2>
            {
                team!==undefined && team.length>0 ?(
                    <div>
                        
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
                    </div>

                ) :(
                    <h4 className='text-center text-danger'> No Team allocated </h4>
                )
            }
        </div>
    </div>
  )
}

export default TeamComposition