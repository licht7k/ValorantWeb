import React from 'react'
import riotLogo from '../assets/riot.png'
import esrb from '../assets/ESRB_Teen.svg'


const Footer = () => {
  return (
    <>
    <div className='bg-[rgb(17,17,17)] w-full h-80 flex flex-col items-center justify-center'>
        <p className='text-gray-400 text-xs text-center'>© 2020-2025 Riot Games, Inc. RIOT GAMES, VALORANT and any associated logos are trademarks, service <br /> 
        <span className='text-center'> marks, and/or registered trademarks of Riot Games, Inc.</span> </p>

    <div className='text-white font-bold text-sm flex row-auto gap-10 mt-10'>
      <p className='cursor-pointer hover:opacity-70' onClick={() => window.open('https://www.riotgames.com/en/privacy-notice')}>PRIVACY NOTICE</p>
      <p className='cursor-pointer hover:opacity-70' onClick={() => window.open('https://www.riotgames.com/en/terms-of-service')}>TERMS OF SERVICE</p>
      <p className='cursor-pointer hover:opacity-70' >COOKIE PREFERENCE</p>
    </div>


      <div className='bg-[rgb(41,41,41)] w-60 h-30 mx-auto mt-10 rounded-lg flex items-center px-4'>
        <img src={esrb} alt="" className='h-25 w-20' />
        <div className='ml-4 text-xs text-white font-bold'>
          <p>Blood</p>
          <p>Language</p>
          <p>Violence</p>
          <p>Users Interact</p>
          <p>In-Game Purchases</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Footer