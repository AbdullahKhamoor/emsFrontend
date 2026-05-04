import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { BeatLoader } from "react-spinners";

import { useEffect, useState } from 'react';
// import axios from 'axios';
import API from '../../api/api';
import { useAuth } from '../../context/authContext';


const List = () => {
    const [leaves, setLeaves] = useState(null)
    let sno = 1;
    const { id } = useParams()
    const { user } = useAuth()

    const fetchLeaves = async () => {

        try {
            const response = await API.get(`/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            if (response.data.success) {
                console.log(leaves)
                setLeaves(response.data.leaves)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }

    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    if (!leaves) {
        return (<div className='my-50 flex items-center justify-center  outline-none   '>
            <BeatLoader
                size={20}
                color="blue"
            />
        </div>
        )
    }

    return (
        <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Leave</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input
                    type="text"
                    placeholder='Search By Dep Name'
                    className='px-4 py-0.5'
                />
                {user.role === 'employee' && (
                    <Link to="/employee-dashboard/add-leave" className='px-4 py-1  bg-blue-800 hover:bg-blue-500 rounded text-white' >
                        Add New Leave </Link>
                )}
            </div>
            <table className='w-full text-sm text-left text-gray-500 mt-6'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                    <tr>
                        <th className='px-6 py-3'>SNO</th>
                        <th className='px-6 py-3'>Leave Type</th>
                        <th className='px-6 py-3'>From</th>
                        <th className='px-6 py-3'>To</th>
                        <th className='px-6 py-3'>Description</th>
                        <th className='px-6 py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => (

                        <tr
                            key={leave._id}
                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                        >
                            <td className='px-6 py-3'>{sno++}</td>
                            <td className='px-6 py-3'>{leave.leaveType}</td>
                            <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className='px-6 py-3'>{leave.reason}</td>
                            <td className='px-6 py-3'>{leave.status}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List