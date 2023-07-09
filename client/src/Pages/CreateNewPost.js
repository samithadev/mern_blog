import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import {
    Heading,
    Box
  } from '@chakra-ui/react'

export default function CreateNewPost() {
    const [title, settitle] = useState('')
    const [summery, setSummery] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const [redirect, setRedirect] = useState(false)

    async function createPost(ev){
        ev.preventDefault()

        const data = new FormData()

        data.set('title', title)
        data.set('summery', summery)
        data.set('content', content)
        data.set('file', file[0])

       const response = await fetch('http://localhost:4000/post',{
            method:'POST',
            body:data,
            credentials: 'include'
        })

        if(response.ok){
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <div>
        <center><Heading as="h2">Create Post</Heading></center>
        <Box marginTop="3%">
        <form className='createPost' onSubmit={createPost}>
            <input
                type='text'
                placeholder='Title' 
                value={title}
                onChange={ev => settitle(ev.target.value)}/>
            <input
                type='file'
                placeholder='Post image'
                onChange={ev => setFile(ev.target.files)}/>
            <input
                type='text'
                placeholder='Summery' 
                value={summery}
                onChange={ev => setSummery(ev.target.value)}/>
            <textarea
                type='text'
                placeholder='Content' 
                value={content}
                onChange={ev => setContent(ev.target.value)}/>

            <button className='create-btn'>Create Post</button>
        </form>
        </Box>
        </div>
    )
}
