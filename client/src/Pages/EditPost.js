import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import {
    Heading,
    Box
} from '@chakra-ui/react'

export default function EditPost() {
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [summery, setSummery] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title)
                    setSummery(postInfo.summery)
                    setContent(postInfo.content)
                })
            })
    }, [])

    async function updatePost(ev) {
        ev.preventDefault()
        const data = new FormData();

        data.set('title', title)
        data.set('summery', summery)
        data.set('content', content)
        data.set('id', id)
        if (file?.[0]) {
            data.set('file', file?.[0])
        }

        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        if (response.ok) {
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <div>
            <center><Heading as="h2">Edit Post</Heading></center>
            <Box marginTop="3%">
                <form className='createPost' onSubmit={updatePost}>
                    <input
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={ev => setTitle(ev.target.value)} />
                    <input
                        type='file'
                        placeholder='Post image'
                        onChange={ev => setFile(ev.target.files)} />
                    <input
                        type='text'
                        placeholder='Summery'
                        value={summery}
                        onChange={ev => setSummery(ev.target.value)} />
                    <textarea
                        type='text'
                        placeholder='Content'
                        value={content}
                        onChange={ev => setContent(ev.target.value)} />

                    <button className='edit-btn'>Update Post</button>
                </form>
            </Box>
        </div>
    )
}
