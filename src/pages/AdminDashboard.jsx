
// import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'



const AdminDashboard = () => {

    return (
        <div className='flex'>
            <AdminSidebar />
            <div className='flex-1 ml-64 bg-blue-100 h-screen'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard