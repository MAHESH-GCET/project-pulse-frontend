import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
function SuperAdminDashboard() {
  //state
  let [employees,setEmployees]=useState([]);
  let [errorMessage,setErrorMessage]=useState("");
  let [modifiedUser,setModifiedUser]=useState(employees);
  let {employee} =useSelector(state=>state.login)
  console.log(employee)
  //get token
  let token=sessionStorage.getItem('token');
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

  //edit user
  const editUser=(key)=>{
    console.log(employees[key])
    openModel();
    //set values
    setValue("employee_id",employees[key].employee_id);
    setValue("employee_name",employees[key].employee_name);
    setValue("email",employees[key].email);
    setValue("age",employees[key].age);
    setValue("gender",employees[key].gender);
    setValue("role",employees[key].role);
  }

  //save user
  const saveUser=async()=>{
    let modifiedUsers=getValues();
    closeModel()
    let reqObj=modifiedUsers
    //make http req
    try{
      let res=await axios.put('http://localhost:4000/super-admin/assign-role',reqObj,{
      headers:{
        Authorization: `bearer ${token}`
      }
    })
    setModifiedUser(res.data.payload);
    console.log(res);
    } catch(err){
      console.log(err);
      setErrorMessage(err.message)
    }
    
  }

  //make req to server to get empoloyees
  const getEmployees=async()=>{
    try{
      let response=await axios.get('http://localhost:4000/super-admin/employees',{
        headers:{
          Authorization: `bearer ${token}`
        }
      })
      setEmployees(response.data.employees)
      console.log(employees)
    } catch(err){
      console.log(err)
      setErrorMessage(err.message)
    }
  }

  useEffect(()=>{
    getEmployees();
  },[modifiedUser])

  return (
    <div>
      <div>
      <h2 className='text-center mb-4'>Employee Details</h2>
      {
        employees.length>0 && (
          <div>
            <table className='table table-bordered w-75 mx-auto table-striped'>
              <thead className='text-center'>
                <tr className='text-light' style={{backgroundColor:'#004c4c',fontSize:'20px'}}>
                  <td>Employeee Id</td>
                  <td>Employee Name</td>
                  <td>Age</td>
                  <td>Gender</td>
                  <td>Role</td>
                  <td>Action</td>
                </tr>
              </thead>

              <tbody className='text-center'>
                {
                  employees.map((employee,key)=>(
                    <tr key={key} style={{fontSize:'18px'}}>
                      <td>{employee.employee_id}</td>
                      <td>{employee.employee_name}</td>
                      <td>{employee.age}</td>
                      <td>{employee.gender}</td>
                      <td>{employee.role}</td>
                      <td><button className='btn btn-outline-dark' onClick={()=>editUser(key)}>Edit</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

        )
      }
      {/* modal */}
      <Modal show={showModal} onHide={closeModel} backdrop={"static"} className='bg-light'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="text-start   p-3 " style={{ borderRadius: "20px" }}>
            {/* employee_id */}
            <div className="mb-3">
              <label htmlFor="employee_id" className="mb-1">
              employee_id
              </label>
              <input
                type="number"
                className="form-control"
                disabled
                {...register("employee_id", { required: true })}
              />
            </div>
            {/* employee_name */}
            <div className="mb-3">
              <label htmlFor="employee_name" className="mb-1">
                Employee Name
              </label>
              <input
                type="text"
                className="form-control"
                disabled
                {...register("employee_name", { required: true })}
              />
            </div>
            {/* age */}
            <div className="mb-3">
              <label htmlFor="age" className="mb-1" >
              Age
              </label>
              <input
                type="number"
                className="form-control"
                disabled
                {...register("age", { required: true })}
              />
              
            </div>
            {/* Gender */}
            <div className="mb-3">
                <label>Select Gender</label>
                <div className="form-check">
                    <input type='radio' {...register('gender',{required:true})} id='gender' value='male' className="form-check-input" disabled/>
                    <label className="form-check-label" htmlFor="gender">Male</label>
                </div>
                <div className="form-check">
                    <input type='radio' {...register('gender',{required:true})} id='gender' value='female' className="form-check-input" disabled/>
                    <label className="form-check-label" htmlFor="gender">Female</label>
                </div>
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                disabled
                {...register("email", { required: true })}
              />
            </div>
            {/* role */}
            <div className="mb-4">
                <label htmlFor="role">Role</label>
                <select name="role" {...register('role',{required:true})} id="role " className="form-control" defaultValue='x'>
                    <option value='x' disabled>--Assign-Role--</option>
                    <option value='admin'>Admin</option>
                    <option value='gdo'>GDO</option>
                    <option value='project-manager'>Project Manager</option>
                    <option value='hr-manager'>HR-Manager</option>
                </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModel}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  )
}

export default SuperAdminDashboard