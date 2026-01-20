import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Summary = () => {
    const { user } = useAuth()
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployee = async () => {

            try {
                const response = await axios.get(`https://ems-backend-66z5.vercel.app/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                })
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }

        };

        fetchEmployee();
    }, []);

    return (
        <>{employee ? (
            <div className='p-6'>
                <div className='rounded flex bg-white'>

                    <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4`}>
                        {/* <FaUser /> */}
                        <img src={employee.userId.profileImage} alt="" className='w-full h-full object-cover rounded-full' />
                    </div>
                    <div className='pl-4 py-1'>
                        <p className='text-lg font-semibold'>Welcome Back</p>
                        <p className='text-xl font-bold'>{user.name}</p>
                    </div>
                </div >
            </div>) : <div>loading ...</div>}</>
    )
}

export default Summary