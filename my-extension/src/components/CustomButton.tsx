import React from 'react'

interface CustomButtonProps {
    label: string;
    onClick: () => void;
}

const CustomButton = ({label, onClick}: CustomButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="text-white w-[40vw] bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2">{label}</button>
  )
}

export default CustomButton