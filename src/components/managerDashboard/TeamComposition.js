import React from 'react'

function TeamComposition(props) {
    let team=props.team;
    
  return (
    <div>
        <div>
        <h2 className='text-success text-center'>Team Composition</h2>
            {
                team.length>0 ?(
                    <div>
                        
                        <table className=' ms-3 text-center table table-striped table-bordered table-hovered'>
                            <thead>
                                <tr className='table text-light' style={{background:'#4EA684'}}>
                                    <td>Id</td>
                                    <td>Project Id</td>
                                    <td>Role</td>
                                    <td>Status</td>
                                    <td>Start Date</td>
                                    <td>Billing Status</td>
                                    <td>Exposed To Customer</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    team.map((teamObj,key)=>(
                                        <tr key={key}>
                                            <td>{teamObj.id}</td>
                                            <td>{teamObj.project_id}</td>
                                            <td>{teamObj.role_in_project}</td>
                                            <td>{teamObj.status}</td>
                                            <td>{teamObj.start_date}</td>
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
                    <p> No Team allocated </p>
                )
            }
        </div>
    </div>
  )
}

export default TeamComposition