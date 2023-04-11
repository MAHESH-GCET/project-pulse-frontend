import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
function RoleErrorPage() {
  return (
    <div>
        <h2 className='text-center text-danger'>No role assigned to you, Please contach super-admin</h2>
    </div>
  )
}

export default RoleErrorPage