import './App.css';
import Layout from './Layout';
import Login from './Pages/Login';
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register';
import CreateNewPost from './Pages/CreateNewPost';
import IndexPage from './Pages/IndexPage';
import SinglePost from './Pages/SinglePost';
import EditPost from './Pages/EditPost';
import AllPosts from './Pages/AllPosts'

import { ChakraProvider } from '@chakra-ui/react'

export default function App() {
  return (
    <ChakraProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path='/allposts' element={<AllPosts/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<CreateNewPost/>}/>
        <Route path='/post/:id' element={<SinglePost/>}/>
        <Route path='/edit/:id' element={<EditPost/>}/>
      </Route>
    </Routes>
    </ChakraProvider>
  );
}

