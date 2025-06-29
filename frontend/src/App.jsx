import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './Pages/Homepage'
import ProfilePage from './Pages/ProfilePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from "./Pages/SettingsPage";
import { Routes, Route, Navigate } from 'react-router-dom'
import { authStore } from './stateStore/authStore'
import { useEffect } from 'react'
import Loader from './components/Loader'
import { Toaster } from "react-hot-toast"

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,} = authStore()
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  console.log({authUser})
  if(isCheckingAuth && !authUser) return (
    <div>
      <Loader/>
    </div>
  )
  return (
<div>
<Navbar/>

<Routes>
    <Route path='/' element={authUser ? <Homepage/> : <Navigate to="/login"/>} />
    <Route path='/signup' element={!authUser ? <SignUpPage />: <Navigate to="/"/>} />
    <Route path='/login' element={!authUser ? <LoginPage />: <Navigate to="/"/>} />
    <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
    <Route path='/settings' element={<SettingsPage/>} />
    
</Routes>
<Toaster position="top-center" reverseOrder={false}/>
</div> 
 )
}

export default App