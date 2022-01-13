import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import './LoginFormModal.css'

function LoginForm() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      })
  }

  const handleDemo = e => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: 'Demo', password: 'password' }))
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <ul className='loginUL'>
        {errors.map((error, idx) => <li className='login-error' key={idx}>{error}</li>)}
      </ul>
      <div className='login-input-container usernamelogin'>
        <label className='login-label'>
          Username or Email
          <input
            className='login-input'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='login-input-container passlogin'>
        <label className='login-label'>
          Password
          <input
            className='login-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='button-container'>
        <button className='login-butt' type="submit">Log In</button>
        <button className='demo-butt' onClick={handleDemo}>Demo</button>
      </div>
    </form>
  )
}

export default LoginForm
