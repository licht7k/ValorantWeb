import React, { useState, useEffect } from 'react'
import Background from '../assets/bg2.png'
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AgentAbilities from './AgentAbilities';
import mapBG from '../assets/map-bg.jpg'


const AgentDetail = () => {

  const { agentId } = useParams()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [rolePopup, setRolePopup] = useState(false)
  const [selectedAbility, setSelectedAbility] = useState(0)
  


  const fetchAgentDetail = async () => {

    try{
      setLoading(true)
      const response = await fetch(`https://valorant-api.com/v1/agents/${agentId}`);

      if(response.ok){
        const data = await response.json();
        setAgent(data.data);
        setError(null);
      }else{
        throw new Error('Agent not found');
      }

    }catch(err){
      console.error(err);
      setError(err.message);
    }finally{
      setLoading(false)
    }

  }

  useEffect(() => {

    if(agentId){
      fetchAgentDetail();
    }
    

  }, [agentId])
  
  if (loading) {
    return (
      <div className='min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center' 
           style={{backgroundImage: `url(${Background})`}}>
        <div className='text-white text-2xl'>Loading agent details...</div>
      </div>
    );
  }


  if (error) {
    return (
      <div className='min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center' 
           style={{backgroundImage: `url(${Background})`}}>
        <div className='text-white text-center'>
          <h2 className='text-2xl mb-4'>Error: {error}</h2>
          <button 
            onClick={() => navigate('/agents')} 
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
          >
            Back to Agents
          </button>
        </div>
      </div>
    );
  }



  return (

    <>
    
      <div className='h-screen bg-cover overflow-hidden relative' style={{backgroundImage: `url(${Background})`}}>

        <div className='flex h-full'>
          <div className='w=1/2 flex flex-col justify-center pl-20 space-y-8 pt-15'>
            <p className='text-8xl font-black text-white italic uppercase' style={{fontFamily: 'tungsten'}}>{agent.displayName}</p>
            <p className='text-white text-xl max-w-2xl leading-relaxed'>{agent.description}</p>
          
            {agent.role && (

              <div className='bg-gray-900 border-2 border-red-500 rounded-xl p-8 w-180 relative' >
                <div className='flex items-center gap-2'>
                  <img 
                    src={agent.role.displayIcon} 
                    alt={agent.role.displayName} 
                    title='View Role Description'
                    className='w-12 h-12 cursor-pointer'
                    onClick={() => setRolePopup(!rolePopup)}
                  />
                  

                  <p className='text-red-400 text-2xl font-bold uppercase ml-3'> {agent.role.displayName} </p>
                  
                  <p className='text-white ml-7'>{agent.role.description}</p>

                </div>
              </div>
            
          )}
          
          </div>

          <div className='w-1/2 flex items-center justify-center'>
          <img src={agent.fullPortrait} alt="" className='scale-120 translate-x-5 '/>
          </div>

        </div>
      </div>

      <div className='bg-[rgb(35,35,35)] h-screen bg-cover overflow-hidden' style={{backgroundImage: `url(${mapBG})`}}>
          
        {/* <img src={agent.role.displayIcon} className='' alt="" /> */}

        <div className='ml-10'>
          <h1 className='ml-15 pt-40 text-8xl font-black text-white uppercase' style={{fontFamily: 'tungsten'}}>Special Abilities</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-lg ml-10 mt-15'>
              {agent.abilities?.map((ability, index) => (
                <div key={index} onClick={()=>setSelectedAbility(index)}>
                    {ability.displayIcon && (
                      <div className='flex justify-center mb-4' >
                        <img src={ability.displayIcon} alt="" className={`opacity-70 w-17 h-17 group hover:cursor-pointer hover:scale-110 transition-transform duration-300 ${selectedAbility === index ? 'opacity-100' : ''}`} />
                      </div>
                    )}
                    
                </div>
              ))}
              
            </div>
        </div>
          
          <div className='absolute top-200 right-35 w-1/3 h-fit text-white bg-black/50 rounded-2xl py-5 px-5 border-2 border-red-500'>

            {selectedAbility !== null && agent.abilities && agent.abilities[selectedAbility] && (
              <div className='flex-1 '>
                <p className='text-center uppercase mb-4 text-4xl tracking-wide' style={{fontFamily: 'tungsten'}}>{agent.abilities[selectedAbility].displayName}</p>
                <p className='leading-relaxed'>{agent.abilities[selectedAbility].description}</p>
              </div>
            )}

          </div>
        

    

    </div>


    </>
  )
}

export default AgentDetail