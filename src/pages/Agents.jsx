import React, { useState, useEffect } from 'react'
import Background from '../assets/bg2.png'
import jett from '../assets/jett.webp'
import { useNavigate } from 'react-router-dom';


const Agents = () => {

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAgents = async () =>{

    try{

      const response = await fetch('https://valorant-api.com/v1/agents')

      if(response.ok){
        const data = await response.json();
        console.log(data);
        const playableAgents = data.data.filter(agent => agent.isPlayableCharacter);
        setAgents(playableAgents);
        setLoading(false);
      }else{
        throw new Error(response.error);
      }
    }catch(err){
      console.log(err);
      setLoading(false);
    }
  }

 useEffect(() => {
  fetchAgents();
 }, []);

 const handleAgentClick = (agentId) => {
  navigate(`/agents/${agentId}`);
 }

  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat'
    style={{backgroundImage: `url(${Background})`}}>

      <div className='pt-30 pb-20' >
        <h1 className='text-white ml-10 mb-10 text-8xl' style={{fontFamily: 'tungsten'}}>AGENTS</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  '>
            {agents.map((agent) => (
              <div key={agent.uuid} className='bg-white/5 bg-opacity-80 w-75 h-110 relative ml-4 mt-5 overflow-hidden hover:opacity-90 hover:transition-all hover:duration-300 hover:ease-in-out hover:cursor-pointer' onClick={() => handleAgentClick(agent.uuid)}>
                <img src={agent.fullPortrait} alt="" className='w-full h-130 scale-130 object-cover translate-y-10 hover:scale-140 hover:transition-all hover:duration-300 hover:ease-in-out'/>
                <div className='absolute bottom-0 bg-gray-200 w-full h-12'>
                  <p className='text-3xl py-1 pl-5' style={{fontFamily: 'tungsten'}}>{agent.displayName}</p>
                </div>
              </div>
            ))}
          </div>
          
      </div>

      
        
    </div>
  )
}

export default Agents