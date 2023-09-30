import React, { useState } from 'react'

import {
  Heading,
  Box
} from '@chakra-ui/react'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const SERVER_URL = import.meta.env.SERVER_URL;

  async function onRegister(ev) {
    ev.preventDefault()

    const response = await fetch(`${SERVER_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'content-Type': 'application/json' }
    })

    if(response.status === 200){
      alert('Success registration')
    }else{
      alert('register fail')
    }

  }

  return (
    <div>
    <center><Heading as="h2">Register</Heading></center>
    <Box marginTop="3%">
    <form className='registerForm' onSubmit={onRegister}>
      <input type='text'
        placeholder='username'
        value={username}
        onChange={ev => setUsername(ev.target.value)} />
      <input type='password'
        placeholder='password'
        value={password}
        onChange={ev => setPassword(ev.target.value)} />
      <button className='reg-btn'>Register</button>
    </form>
    </Box>
    </div>
  )
}
