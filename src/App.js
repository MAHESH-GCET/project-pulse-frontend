import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootLayout from './components/RootLayout';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login/Login';
import Register from './components/register/Register';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import GdoDashboard from './components/gdoDashboard/GdoDashboard';
import SuperAdminDashboard from './components/superAdiminDashboard/SuperAdminDashboard';
import ManagerDashboard from './components/managerDashboard/ManagerDashboard';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ProjectDetails from './components/managerDashboard/ProjectDetails';
import AddProject from './components/adminDashboard/AddProject';
import RoleErrorPage from './components/RoleErrorPage';
function App() {

  //get user obj 
  const {employee}=useSelector(state=>state.login)
  //create browser router object
  const browserRouterObj= createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'/',
          element:<Login/>,
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/forgot-password',
          element:<ForgotPassword/>
        },
        {
          path:`/super-admin/:${employee.employee_id}`,
          element:<SuperAdminDashboard/>
        },
        {
          path:`/admin/:${employee.employee_id}`,
          element:<AdminDashboard/>
        },
        {
          path:'/admin/add-project',
          element:<AddProject/>
        },
        {
          path:`/gdo/:${employee.employee_id}`,
          element:<GdoDashboard/>
        },
        {
          path:`/manager/:${employee.employee_id}`,
          element:<ManagerDashboard/>
        },
        {
          path:'/project-details',
          element:<ProjectDetails/>
        },
        {
          path:'/role-error',
          element:<RoleErrorPage/>
        }
      ]
    }
  ]

  )
  return (
    <div className="App">
      {/* return browser router object */}
      <RouterProvider router={browserRouterObj}></RouterProvider>
    </div>
  );
}

export default App;
