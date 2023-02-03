import React, {useState} from 'react'
import Input from '../Components/Input'
import TextArea from '../Components/TextArea'
import Button from '../Components/Button'
import axios from 'axios'

const Landing = () => {
  const [formSubmited, setFormSubmited] = useState(false);
  const [file, setFile] = useState('');

  const [values, setValues] = useState({
    fullname: '',
    email: '',
    city: '',
    streetAddress: '',
    phoneNumber: '',
    about: ''
  });

  const inputChangeHandler = (e) => {
    setValues(prev => {
      return {...prev, [e.target.name] : e.target.value}
    });
  }

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  }

  const formData = new FormData();
  formData.append('fullname', values.fullname);
  formData.append('email', values.email);
  formData.append('city', values.city);
  formData.append('streetAddress', values.streetAddress);
  formData.append('phoneNumber', values.phoneNumber);
  formData.append('about', values.about);
  formData.append('CV',file)
  const formSubmitHandler = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/user/application',formData)
      .then(res => {
        setFormSubmited(!formSubmited);
      }).catch(err => console.log(err));
  }

  const handleClick = () => {
    setFormSubmited(!formSubmited);
  }
  return (
    <>
      {!formSubmited ? 
      <div className='h-screen w-full overflow-hidden bg-violet-100 flex items-center justify-center'>
        <div className='h-[720px] w-[620px] my-3 bg-white rounded-md flex justify-center'>
          <form className='w-[320px] flex py-2 flex-col mt-10'  onSubmit={formSubmitHandler} method='POST'>
            <Input label='Fullname' onChange={inputChangeHandler} type='text' name='fullname' placeholder='Jhon Doe'/>
            <Input label='Email' onChange={inputChangeHandler} type='email' name='email' placeholder='you@example.com'/>
            <Input label='City' onChange={inputChangeHandler} type='text' name='city' placeholder='ex - Monastir'/>
            <Input label='Street Address' onChange={inputChangeHandler} type='text' name='streetAddress'/>
            <Input label='Phone Number' onChange={inputChangeHandler} type='text' name='phoneNumber' placeholder='xx xxx xxx'/>
            <TextArea onChange={inputChangeHandler} name='about'/>
            <label htmlFor="CV" className='my-3 block text-sm font-medium text-gray-700'>Please upload your Resume here<span className='text-red-600'>*</span></label>
            <input onChange={fileChangeHandler} type="file" name="CV" id="CV"/>
            <div className='mx-auto my-10'>
              <Button text='Submit Form' type='submit'/>
            </div>
          </form>
        </div>
      </div> : 
      <div className='h-screen w-full bg-violet-100 flex items-center justify-center'>
        <div className='h-[230px] w-[400px] my-3 py-3 bg-white rounded-md flex items-center justify-center flex-col'>
          <h1 className='flex justify-center items-center text-lg font-bold'>Thanks!</h1>
          <div className='w-20 my-4'>
            <Button text='Return' handleClick = {handleClick}/>
          </div>
        </div>
      </div>}
    </>
    
  )
}

export default Landing