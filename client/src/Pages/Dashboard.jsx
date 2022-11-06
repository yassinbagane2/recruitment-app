import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Application from '../Components/Application'
import Button from '../Components/Button'
const Dashboard = () => {
    const Navigate = useNavigate();
    if (!window.localStorage.getItem("token")) {
        Navigate('/admin/login', { replace: true })
    }
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/user/applications')
            .then(res => {
                console.log(res.data.applications);
                setApplications(res.data.applications);
            })
            .catch(err => {console.log(err)})
    },[]);
  return (
    <div className='min-h-screen bg-cyan-50 w-full flex items-center justify-center'>
        <div className='w-[720px] min-h-[800px] bg-white shadow-md rounded-md flex flex-col items-center'>
            {applications.map((application, i) => (
                <Application key={i} CV={application.CV} fullname={application.fullname} email={application.email} city={application.city} streetAddress={application.streetAddress} phoneNumber={application.phoneNumber} about={application.about}/>
            ))}
          
        </div>
        <div className='absolute top-3 right-10'><Link to='/admin/login'><Button text={'Logout'}/></Link></div>
    </div>
  )
}

export default Dashboard