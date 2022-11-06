import axios from 'axios'
import React, { useState } from 'react'
import fileDownload from 'js-file-download'
import { IoClose } from 'react-icons/io5'
const Application = ({fullname, email, city, streetAddress, phoneNumber, about, CV}) => {
    const [showInfo, setShowInfo] = useState(false);
    const DownloadCV = () => {
        axios.get(`http://localhost:8080/download/:${CV}`, {
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data,'downloaded.pdf');
        })
    }
  return (
    <>
        <div className='flex items-center justify-around my-4 w-[80%] h-20 bg-cyan-100 rounded-md'>
            <div className='text-lg font-bold'>{fullname}</div>
            <div>
                <button onClick={() => {setShowInfo(!showInfo)}} className='inline-flex text-lime-600 hover:scale-105 items-center bg-cyan-50 px-4 py-2 border border-transparent text-sm font-medium rounded-md'>View</button>
            </div>
        </div>
        {showInfo ? 
        <div className='w-[590px] h-[520px] bg-teal-200 fixed inset-0 m-auto rounded-md'>
            <div className='absolute top-2 right-2' onClick={() => {setShowInfo(!showInfo)}}>
                <IoClose style={{fontSize: '22px', cursor: 'pointer'}}/>
            </div>
            <div className='ml-10 mt-10'>
                <p className='my-4'><span className='font-bold'>Fullname: </span>{fullname}</p>
                <p className='my-4'><span className='font-bold'>Email: </span>{email}</p>
                <p className='my-4'><span className='font-bold'> City: </span>{city}</p>
                <p className='my-4'><span className='font-bold'>Street Address: </span>{streetAddress}</p>
                <p className='my-4'><span className='font-bold'>Phone Number: </span>+216 {phoneNumber}</p>
                <p className='my-4'><span className='font-bold'>About: </span>{about}</p>
                <p className='my-4'><span className='font-bold'>CV: </span><button onClick={DownloadCV} className='ml-5 inline-flex text-lime-600 hover:scale-105 items-center bg-cyan-50 px-4 py-2 border border-transparent text-sm font-medium rounded-md'>Download</button></p>
            </div>
        </div>: ''}
    </>
  )
}

export default Application