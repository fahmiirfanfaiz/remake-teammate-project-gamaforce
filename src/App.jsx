import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import DefaultMap from './components/map'
import './App.css'

function App() {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <Navbar/>
      <DefaultMap/>  {/* ✅ Button ada di dalam DefaultMap, bukan di sini */}
    </div>
  )
}

export default App
