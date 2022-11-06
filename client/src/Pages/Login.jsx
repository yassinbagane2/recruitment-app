import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
		name: '',
		password: ''
	});
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null)
    const inputChangeHandler = (e) => {
        setValues(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    const loginHandler = (e) => {
		e.preventDefault();
        axios.post('http://localhost:8080/auth/admin',values)
            .then(res => {
                console.log(res.data);
                if (!res.data.status) return setErrorMessage(res.data.msg);
                localStorage.setItem('token',res.data.token);
                setErrorMessage(null);
                navigate('/dashboard', { replace: true });

            }).catch(error => {
                console.log(error);
            })
    }
  return (
    <div className='w-full h-screen bg-blue-200 flex items-center justify-center'>
        <div className="form-container bg-white h-[530px] w-[720px] rounded-md shadow-sm">
            <div className='flex items-center justify-center flex-col'>
                <h1 className='mt-10 text-lg font-bold'>Admin Dashboard</h1> 
                <p className='my-6 text-gray-400'>Login to see Applicants</p>
                <form className='flex flex-col h-36 w-96' onSubmit={loginHandler}>
                    <div className='flex flex-col'>
                        <label htmlFor="username" className='sr-only'>Email</label>
                        <input type="email" onChange={inputChangeHandler} name='email' className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm' placeholder='Email...'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='sr-only'>Password</label>
                        <input type="password" onChange={inputChangeHandler} name='password' className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm' placeholder='Password'/>
                    </div>
                    {errorMessage ? <p className='w-full mt-3 py-2 text-center text-white rounded-md bg-red-400'>{errorMessage}</p>: ''}
                    <button type='submit' className='relative block w-full bg-indigo-600 hover:bg-indigo-500 duration-200 rounded-md mt-4 py-2 text-white'>Sign in</button>
                </form>
                
            </div>   
        </div>
    </div>
  )
}

export default Login