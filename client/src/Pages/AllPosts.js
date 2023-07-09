import React,{useState, useEffect} from 'react'
import Posts from './Posts'

export default function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        fetch('http://localhost:4000/post').then(response => {
            response.json().then( posts =>{
                setPosts(posts)
                console.log(posts)
            })
        })
    }, [])
  return (
    <>
    {Posts.length > 0 && posts.map(post =>{
        return <Posts {...post}/>
    })}
    </>
  )
}
