import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { motion } from "framer-motion"
import { ClipLoader } from "react-spinners";
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa'
// import axios from 'axios'
import API from '../../api/api.js'

const AdminSummary = () => {

    const [summary, setSummary] = useState(null)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await API.get('/api/dashboard/summary', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setSummary(summary.data)
                console.log(summary)
                console.log(localStorage.getItem("token"))
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error)
                }
                console.log(error.message)
            }
        }

        fetchSummary()
    }, [])

    if (!summary) {
        // return <motion.div animate={{ opacity: [0.3, 1, 0.3] }}
        //     transition={{ repeat: Infinity, duration: 1 }}>
        //     Loading ...
        // </motion.div>
        return (
            <div className='my-50 flex items-center justify-center mx-auto'>
                <ClipLoader
                    size={100}
                    color="blue"
                    cssOverride={{
                        borderWidth: "8px"
                    }} />
            </div>
        )
    }

    return (
        <div className='p-6 '>
            <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <SummaryCard icon={<FaUser />} text="Total Employees" number={summary.totalEmployess} color="bg-blue-600" />
                <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600" />
                <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary} color="bg-red-600" />
            </div>
            <div className='mt-12'>
                <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-blue-600" />
                    <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-600" />
                    <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-yellow-600" />
                    <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-600" />



                </div>
            </div>
        </div>

    )
}

export default AdminSummary