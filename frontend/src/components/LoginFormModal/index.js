import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import LoginForm from './LoginForm'
import login from '../../imgs/Log In.png'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button onClick={() => setShowModal(true)} className='login'>
        <img className='loginimg' src={login} />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal
