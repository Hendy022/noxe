import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'


export default function Login({saveUserData}) {

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let validation = Yup.object({
    email: Yup.string().required('email is required').email('email invalid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with cpital letter')
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validationSchema: validation, onSubmit: sendLoginData
  })

  async function sendLoginData(values) {

    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
      setApiError(err.response.data.message)
      setLoading(false)
    })

    if (data.message === 'success') {
      localStorage.setItem('userToken' , data.token)
      saveUserData()
      setLoading(false)
      navigate('/');
    }
  }

  return <>
    <div className='w-75 '>
      <h3>Login Now</h3>
      <form onSubmit={formik.handleSubmit}>
        {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}

        <label htmlFor="email">email</label>
        <input onChange={formik.handleChange} className='form-control my-2' onBlur={formik.handleBlur} value={formik.values.email} name='email' id='email' type="email" />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}


        <label htmlFor="password">password</label>
        <input onChange={formik.handleChange} className='form-control my-2' onBlur={formik.handleBlur} value={formik.values.password} name='password' id='password' type="password" />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}


        <button className='btn btn-info' type='submit'>
          {loading? <i className='fas fa-spinner fa-spin'></i> :"Login"}
        </button>
      </form>
    </div>

  </>
}
