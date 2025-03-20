import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Components/auth/register'
import Login from './Components/auth/login'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './Components/Landing pages/landing'
import Private from './Components/Private'
import BookingPage from './Components/Landing pages/BookingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/landing' element={<Private Component={Landing}/>}/>
          <Route path='/booking' element={<Private Component={BookingPage}/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
       
     
       
    </>
  )
}

export default App
