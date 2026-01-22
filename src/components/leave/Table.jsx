import React from 'react'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns, LeaveButton } from '../../utils/LeaveHelper';
import axios from 'axios';


const Table = () => {
    const [leaves, setLeaves] = useState(null)
    const [filteredLeave, setFilteredLeave] = useState(null)

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },

            });
            if (response.data.success) {

                let sno = 1;
                const data = await response.data.leaves.map((leave) => (
                    {
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeId,
                        name: leave.employeeId.userId.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department.dep_name,
                        days:
                            new Date(leave.endDate).getDate() -
                            new Date(leave.startDate).getDate(),
                        status: leave.status,
                        action: (<LeaveButton Id={leave._id} />)
                    }
                ))
                setLeaves(data);
                setFilteredLeave(data)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    useEffect(() => {
        fetchLeaves()
    }, [])

    const filterByInput = (e) => {
        const data = leaves.filter((leave) => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredLeave(data)
    }

    const filterByButton = (status) => {
        const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()))
        setFilteredLeave(data)
    }


    return (
        <>
            {filteredLeave ? (
                <div className='p-6' >
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold'>Manage Leave</h3>
                    </div>
                    <div className='flex justify-between items-center'>
                        <input
                            type="text"
                            placeholder='Search By Emp Id'
                            className='px-4 py-0.5 border-neutral-50 bg-white'
                            onChange={filterByInput}
                        />
                        <div className='space-x-3'>
                            <button className='px-2 py-1 bg-teal-600 rounded text-white hover:bg-teal-700'
                                onClick={() => filterByButton("Pending")}
                            >
                                Pending</button>
                            <button className='px-2 py-1 bg-teal-600 rounded text-white hover:bg-teal-700'
                                onClick={() => filterByButton("Approved")}
                            >Approved</button>
                            <button className='px-2 py-1 bg-teal-600 rounded text-white hover:bg-teal-700'
                                onClick={() => filterByButton("Rejected")}
                            >Rejected</button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <DataTable columns={columns} data={filteredLeave} pagination />
                    </div>
                </div >
            ) : <div> Loading .....</div>}
        </>
    )
}

export default Table