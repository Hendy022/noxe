import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'


export default function Register() {

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let validation = Yup.object({
    name: Yup.string().required('name is required').min(3, 'minimum name is 3 letters').max(15, 'maximum name is 15 letters'),
    email: Yup.string().required('email is required').email('email invalid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with cpital letter'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'rePassword dont match'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}/, 'phone must be egyptian number')
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema: validation, onSubmit: sendRegisterData
  })

  async function sendRegisterData(values) {

    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err) => {
      setApiError(err.response.data.message)
      setLoading(false)
    })

    if (data.message === 'success') {
      setLoading(false)
      navigate('/login');
    }
  }

  return <>
    <div className='w-75 '>
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}

        <label htmlFor="name">name</label>
        <input onChange={formik.handleChange} className='form-control my-2' onBlur={formik.handleBlur} value={formik.values.name} name='name' id='name' type="text" />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}

        <label htmlFor="email">email</label>
        <input onChange={formik.handleChange} className='form-control my-2' onBlur={formik.handleBlur} value={formik.values.email} name='email' id='email' type="email" />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}


        <label htmlFor="password">password</label>
        <input onChange={formik.handleChange} className='form-control my-2' onBlur={formik.handleBlur} value={formik.values.password} name='password' id='password' type="password" />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}

        <label htmlFor="rePassword">rePassword</label>
        <input onChange={formik.handleChange} className='form-control my-2' onBlur={formik.handleBlur} value={formik.values.rePassword} name='rePassword' id='rePassword' type="Password" />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}

        <label htmlFor="phone">phone</label>
        <input onChange={formik.handleChange} className='form-control my-2' onBlur={formik.handleBlur} value={formik.values.phone} name='phone' id='phone' type="tel" />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}


        <button className='btn btn-info' type='submit'>
          {loading? <i className='fas fa-spinner fa-spin'></i> :"Register"}
        </button>
      </form>
    </div>

  </>
}
