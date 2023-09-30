import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
import logo from './images/logo.png'

import {
  Button
} from '@chakra-ui/react'

export default function Header() {

  const { setUserInfo, userInfo } = useContext(UserContext)

  useEffect(() => {
    fetch( `${SERVER_URL}/profile`, {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout() {
    fetch(`${SERVER_URL}/logout`, {
      credentials: 'include',
      method: 'POST',
    });

    setUserInfo(null)
  }

  const username = userInfo?.username;

  return (
    <div>
      <header>
        <a href='/' className='logo'>
          <img src={logo} />
        </a>
        <Button>
          <Link className="button-link" to='/allposts'>All Posts</Link></Button>
        <nav>
          {username && (
            <>
              <Link><b>Hello,</b> {username}</Link> <> | </>
              <Button><Link className="button-link" to='/create'>Create new post</Link></Button>
              <Button bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              ><Link  className="button-link" onClick={logout}>Logout</Link></Button>
            </>
          )}
          {!username && (
            <>
              <Button>
                <Link className="button-link" to='/login'>Login</Link></Button>

              <Button bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                <Link className="button-link" to='/register'>Register</Link></Button>
            </>
          )}
        </nav>
      </header>
    </div>
  )
}
