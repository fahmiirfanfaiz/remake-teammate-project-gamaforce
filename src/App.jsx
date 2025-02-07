import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import DefaultMap from './components/map'
import './App.css'

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <DefaultMap/>
    </div>
  )
}

export default App
