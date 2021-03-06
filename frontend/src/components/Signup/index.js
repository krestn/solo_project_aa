import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import * as sessionActions from "../../store/session"
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([])

  if (sessionUser) return <Redirect to="/" />

  const errorsHeading = 'The following errors have occurred: '

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      setErrors([])
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field'])
  }

  return (
    <div className='form-container'>

      <form className='form' onSubmit={handleSubmit}>
        <ul>{errors[1] && <h4 className='errHead'>{errorsHeading}</h4>}
          {errors.map((error, idx) => <li className='error' key={idx}>{error}</li>)}
        </ul>
        <div className='input-container'>
          <label className='signup-form-label'>
            Email
            <input
              className='signup-input'
              type="text"
              placeholder='example@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='input-container'>
          <label className='signup-form-label'>
            Username
            <input
              className='signup-input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='input-container'>
          <label className='signup-form-label'>
            Password
            <input
              className='signup-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='input-container'>
          <label className='signup-form-label'>
            Confirm Password
            <input
              className='signup-input'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className='signup-submit' type="submit">SIGN UP</button>
      </form>
    </div>
  )
}

export default SignupFormPage
