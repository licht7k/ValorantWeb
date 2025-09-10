import React from 'react'
import ValorantLogo from '../assets/ValorantLogo.png'
import { IoSearch } from "react-icons/io5";
import { useLoaderData, useNavigate, useLocation} from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const isActive = (path) => {
  return location.pathname.startsWith(path);
  } 
  
  return (
    <div className='bg-red-600 shadow-md mx-auto w-full h-15 fixed flex items-center z-1'>
      <img src={ValorantLogo} alt="" className='w-15 h-15 ml-3 cursor-pointer' onClick={() => navigate('/home')} />
      <p className={`text-white font-bold ml-15 cursor-pointer ${isActive('/agents') ? 'border-b-2 border-white' : ''}`} onClick={() => navigate('/agents')}>Agents</p>
      <p className={`text-white font-bold ml-15 cursor-pointer ${isActive('/weapons') ? 'border-b-2 border-white' : ''}`} onClick={() => navigate('/weapons')}>Weapons</p>
      <p className={`text-white font-bold ml-15 cursor-pointer ${isActive('/maps') ? 'border-b-2 border-white' : ''}`} onClick={() => navigate('/maps')}>Maps</p>
      
      <div className='relative ml-140'>
        <input 
          type="text" 
          className='border-2 rounded-2xl text-white border-white focus:outline-none px-3 py-1 pl-10 w-50 bg-transparent placeholder-gray-300' 
          placeholder="Search..."
        />
        <IoSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer' size={20}/>
      </div>
      <button className='cursor-pointer bg-gradient-to-r from-gray-200 to-white rounded-2xl py-1.5 px-5 font-bold ml-auto mr-7 hover:from-white hover:to-white' onClick={()=> window.open('https://playvalorant.com/en-us/platform-selection/')}>Play Now</button>
    </div>
  )
}

export default Navbar