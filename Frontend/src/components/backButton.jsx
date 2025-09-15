import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const BackButton = ({ destination = '/'}) => {
  return (
    <div className='flex mb-6'>
        <Link 
          to={destination} 
          className='bg-gradient-to-r from-purple-700 to-purple-500 text-white px-6 py-3 rounded-full w-fit shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold'
        >
          <BsArrowLeft className='text-xl'/>
          <span>Back</span>
        </Link>
    </div>
  )
}
