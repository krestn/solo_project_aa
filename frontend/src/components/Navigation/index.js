import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal'
import './Navigation.css'
import logo from '../../imgs/LOGO.png'
import explore from '../../imgs/invite only-logos.jpeg'
import signup from '../../imgs/signup.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={ sessionUser } />
    )
  } else {
    sessionLinks = (
      <div className='navright'>
        <LoginFormModal />
        <NavLink to="/signup" id='signup'><img className='signupimg' src={signup} /></NavLink>
      </div>
    )
  }

  return (
    <nav className='homenav'>
      <ul className='nav-ul'>
        <li className='each-nav-component list'>
          <div className='navleft'>
            <NavLink exact to="/" id='home-link'><img className='explore' src={explore} /></NavLink>
          </div>
          <div className='logo'>
            <img className='logo' src={logo} />
          </div>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
