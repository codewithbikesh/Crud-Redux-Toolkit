import React from 'react'
import Navbar from './components/Navabar'
import Create from './components/Create'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import Update from './components/Update'
function App() {


  return (
     <>
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/user/create" element={<Create />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/edit/:id" element={<Update />} />
      </Routes>
      </BrowserRouter>
     </>
  )
}

export default App
