import Navbar from "../components/dashboard/Navbar"
import Sidebar from "../components/employeeDashboard/Sidebar"
import { Outlet } from "react-router-dom"


const EmployeeDashboard = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1 ml-64 bg-gray-100 h-screen'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default EmployeeDashboard