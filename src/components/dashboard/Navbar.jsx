import React from 'react'
import { useAuth } from '../../context/authContext'
// bg-teal-500
// bg-teal-700
const Navbar = () => {
    const { user, logout } = useAuth()
    return (
        <div className='flex items-center text-white justify-between h-12 bg-blue-500  px-5'>
            <p>Welcome {user.name} </p>
            <button className='px-4 py-1 bg-blue-900 hover:bg-blue-800' onClick={logout} >Logout</button>
        </div>
    )
}

export default Navbar