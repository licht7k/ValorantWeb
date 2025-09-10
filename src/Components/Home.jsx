import React from 'react'
import Background from '../assets/bg2.png'
import valLogo from '../assets/valoTEXTlogo.png'


const Home = () => {
  return (
    <div className='h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center' style={{backgroundImage: `url(${Background})`}}>
      <img src={valLogo} alt="" className='ml-5 w-100 h-100 justify-center -mt-25'/>
      <p className='uppercase text-white text-3xl -mt-40' style={{fontFamily: 'tungsten'}}>A 5v5 tactical shooter featuring agents with unique abilities</p>
      <button className='cursor-pointer bg-gradient-to-r justify-center from-red-400 to-red-500 hover:bg-gradient-to-l hover:from-white hover:to-white hover:text-black rounded-2xl py-5 px-7 mt-10 font-bold text-white transition-all duration-300 ease-in-out' onClick={() => window.open('https://playvalorant.com/en-us/platform-selection/')}>
        PLAY FOR FREE
      </button>
    </div>
  )
}

export default Home