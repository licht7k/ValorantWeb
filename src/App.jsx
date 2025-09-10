import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { Routes, Route } from 'react-router-dom'
import Agents from './pages/Agents'
import Events from './pages/Events'
import GameModes from './pages/GameModes'
import Maps from './pages/Maps'
import Weapons from './pages/Weapons'
import Footer from './Components/Footer'
import AgentDetail from './pages/AgentDetail'


const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/home" element={ <Home /> }/>
        <Route path="/agents" element={ <Agents />}/>
        <Route path="/agents/:agentId" element={ <AgentDetail />} />
        <Route path="/events" element={ <Events />}/>
        <Route path="/gamemode" element={ <GameModes />}/>
        <Route path="/maps" element={ <Maps />}/>
        <Route path="/weapons" element={ <Weapons />}/>
      </Routes>
    <Footer />
    </>
  )
}

export default App