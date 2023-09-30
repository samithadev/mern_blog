import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

import {
  Heading,
  Box
} from '@chakra-ui/react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext)

  const SERVER_URL = import.meta.env.SERVER_URL;

  async function login(ev) {
    ev.preventDefault()
    const response = await fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    }
    else {
      alert('wrong crodentials')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <center><Heading as="h2">Login Here</Heading></center>
      <Box marginTop="3%">
        <form className='loginForm' onSubmit={login}>
          <input
            type='text'
            placeholder='username'
            value={username}
            onChange={ev => setUsername(ev.target.value)} />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <button className='login-btn'>Login</button>
        </form>
      </Box>
    </div>
  )
}
