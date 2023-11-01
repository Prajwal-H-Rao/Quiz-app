import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Choice from './pages/userOrAdmin'
import Authenticate from './pages/Auth'
import Admin from './pages/Admin'
import Upload from './pages/upload'
import Select from './pages/Select'
import QuizStart from './pages/quizStart'
import Results from './pages/Results'
import Sign from './pages/signUp'
import { useState } from 'react'
function App() {
  const [isAuth,setIsAuth]=useState(true)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Choice/>}/>
        <Route path='/admin' element={<Authenticate isAuth={isAuth} setIsAuth={setIsAuth}/>} />
        {isAuth?<Route path='/admin_verified'  element={<Admin setIsAuth={setIsAuth}/>}/>: <Route path='/admin_verified'  element={<Sign/>}/>}
        <Route path='/res' element={<Results setIsAuth={setIsAuth}/>}/>
       {isAuth?<Route path='/upload'  element={<Upload setIsAuth={setIsAuth}/>} />:<Route path='/upload'  element={<Sign/>}/>}
        <Route path='/quizName' element={<Select/>}/>
        <Route path='/startPage' element={<QuizStart/>}/>
        <Route path='/signup' element={<Sign/>}/>
      </Routes>
    </Router>
  )
}

export default App