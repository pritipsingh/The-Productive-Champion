import React from 'react'

interface CustomTimeInputProps {
    label: string,
    timeValue: string;
    handleTimeChange: (e: any) => void;
}

const CustomTimeInput = ({ label ,timeValue ,handleTimeChange}: CustomTimeInputProps) => {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">{label}</label>
            <input type="time" value={timeValue} id="startTime" onChange={(e) => handleTimeChange(e)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
    )
}

export default CustomTimeInput