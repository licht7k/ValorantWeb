import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const AgentAbilities = () => {

  const [agent, setAgent] = useState(null)
  const { agentId } = useParams()
  const fetchAgentDetail = async() => {

    try {
      
      const response = await fetch(`https://valorant-api.com/v1/agents/${agentId}`)

      if(response.ok){
        const data = await response.json()
        setAgent(data.data)
      }else{
        throw new Error(response.error);
      }

    } catch (error) {
      console.log(error);
      
    }

    useEffect(() => {

      if(agentId){
        fetchAgentDetail()
      }
      
    }, [agentId])
    

  }

  return (
    <div className='bg-[rgb(20,25,35)] w-full h-150'>

      <img src={agent.role.displayIcon} alt="" />

      <div>
        <h1 className='ml-20 pt-20 text-8xl font-black text-white uppercase' style={{fontFamily: 'tungsten'}}>Special Abilities</h1>
      </div>

    </div>
  )
}

export default AgentAbilities