import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import DefaultMap from './components/map'
import Button from './components/button'
// import Popup from './components/popup'
import './App.css'

function App() {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <Navbar/>
      <DefaultMap/>
      <Button/>
      {/* <Popup/> */}
    </div>
  )
}

export default App
