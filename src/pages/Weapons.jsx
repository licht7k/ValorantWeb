import React from 'react'
import { useSearchParams,} from 'react-router-dom'
import { useState, useEffect } from 'react'
import ValorantLogo from '../assets/ValorantLogo.png'
import BG from '../assets/bg-5.jpg'
import valLogo from '../assets/valoTEXTlogo.png'

const Weapons = () => {

  const [weapons, setWeapons] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedWeapon, setSelectedWeapon] = useState(null)
  const [showSkinsModal, setShowSkinsModal] = useState(false)

  const categoryOrder = {
    'Melee': 1,
    'Sidearm' : 2,
    'SMG': 3,
    'Shotgun': 4,
    'Heavy' : 5,
    'Rifle': 6,
    'Sniper': 7 
  }

  const contentTierOrder = {
    '12683d76-48d7-84a3-4e09-6985794f0445': 1, 
    '0cebb8be-46d7-c12a-d306-e9907bfc5a25': 2, 
    '60bca009-4182-7998-dee7-b8a2558dc369': 3,
    'e046854e-406c-37f4-6607-19a9ba8426fc': 4, 
    '411e4a55-4e59-7757-41f0-86a53f101bb5': 5,
  }

  const getFilteredAndSortedSkins = (skins) => {
    if(!skins || skins.length === 0) return []

    return skins.filter(skin => {
      const skinName = skin.displayName.toLowerCase()
      const weaponName = selectedWeapon?.displayName.toLowerCase() || ''

      return (
          // 1. Must have a display icon (image)
          skin.displayIcon &&
          
          // 2. Must not be the base weapon (same name as weapon)
          skinName !== weaponName &&
          
          // 3. Must not contain "standard" or "base" keywords
          !skinName.includes('standard') &&
          !skinName.includes('base') &&
          !skinName.includes('default') &&
          
          // 4. Must not be "random favorite" skin
          !skinName.includes('random favorite') &&
          
          // 5. Must have a theme UUID (part of a skin collection)
          skin.themeUuid &&
          
          // 6. Must have content tier UUID (indicates it's a premium skin)
          skin.contentTierUuid &&
          
          // 7. Additional check: must not be a melee base variant
          !skinName.includes('tactical knife') &&
           skinName !== 'tactical knife'
        )
    }).sort((a,b) => {
        //first to show is skins with more upgrade levels
        const levelsA = a.levels ? a.levels.length : 0
        const levelsB = b.levels ? b.levels.length : 0

        if(levelsA !== levelsB){
          return levelsB - levelsA
        }

        //then by rarity tier
        const tierA = contentTierOrder[a.contentTierUuid] || 999
        const tierB = contentTierOrder[b.contentTierUuid] || 999
      
        if(tierA !== tierB){
          return tierA - tierB
        }

        if (a.themeUuid !== b.themeUuid){
          return a.themeUuid.localeCompare(b.themeUuid)
        }


        return a.displayName.localeCompare(b.displayName)

    })
  }


 





  const fetchWeapons = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://valorant-api.com/v1/weapons')
      
      if(response.ok){
        const data = await response.json()
        
        const sortedWeapons = data.data.sort((a,b) => {
          const categoryA = a.category?.replace('EEquippableCategory::', '') || 'Other' 
          const categoryB = b.category?.replace('EEquippableCategory::', '') || 'Other'
        
          const orderA = categoryOrder[categoryA] || 999
          const orderB = categoryOrder[categoryB] || 999

          if(orderA !== orderB){
            return orderA - orderB
          }

          const costA = a.shopData?.cost || 0
          const costB = b.shopData?.cost || 0
          return costA - costB

        })
        setWeapons(sortedWeapons)
        console.log(data);
      }else{
        throw new Error("Error");
      }
    
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeapons();
  }, [])

  const handleWeaponClick = (weapon) => {
    setSelectedWeapon(weapon)
    setShowSkinsModal(true)
  }

  const closeModal = () => {
    setShowSkinsModal(false)
    setSelectedWeapon(null)
  }


  if (loading) {
    return (
      <div className='bg-[rgb(240,237,230)] h-screen flex items-center justify-center'>
        <p className='text-2xl'>Loading weapons...</p>
      </div>
    )
  }


  return (
    <div className='min-h-screen' style={{backgroundImage: `url(${BG})`}}>
      <div className='pt-30 pb-20'>
        <h1 className='text-8xl ml-10 mb-15' style={{fontFamily: 'tungsten'}}>Weapons</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-3 xl:grid-cols-3 gap-6 px-10 mt-5'>
            {weapons?.map((weapons) => (
              <div key={weapons.uuid} className='bg-[rgb(226,218,205)] rounded-lg p-6 hover:shadow-xl transition-shadow hover:cursor-pointer' title='Click to View Weapon Skins' onClick={() => handleWeaponClick(weapons)}>
                <div className='overflow-hidden rounded-lg mb-4 pt-10'>
                  {weapons.displayIcon && (
                    <img src={weapons.displayIcon} alt="" className='w-full h-40 object-contain mb-4 pt-10 hover:scale-105 transition-transform duration-300 ease-in-out'/>
                  )}
                </div>
                <p className='mt-10 text-3xl tracking-wider' style={{fontFamily: 'tungsten'}}>{weapons.displayName}.</p>
                <p className='mt-1 text-xl tracking-wider' style={{fontFamily: 'tungsten'}}>Type // {weapons.category?.replace('EEquippableCategory::', '')}.</p>
              </div>
            ))}

              {showSkinsModal && selectedWeapon && (
                <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4' onClick={closeModal}>
                  <div className='bg-white rounded-lg w-300 h-150 overflow-hidden' style={{backgroundImage: `url(${BG})`}} onClick={(e) => e.stopPropagation()}>

                      {/* header */}
                      <div className='bg-red-500 h-15 text-white flex justify-between items-center'>
                          
                          <img src={valLogo} alt="" className='w-30 h-30 ml-5'/>
                          <button className='font-bold mr-8 cursor-pointer' onClick={closeModal}>X</button>
                      </div>

                      {/* skin cards */}
                      <div className='p-6 overflow-y-auto h-150 pt-10 pb-20'>
                        <p className='text-6xl font-bold mb-10 text-center' style={{fontFamily: 'tungsten'}}>WEAPON SKINS</p>
                        {selectedWeapon.skins && selectedWeapon.skins.length > 0 ? (
                         
                         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {getFilteredAndSortedSkins(selectedWeapon.skins).map((skin) => (
                              <div key={skin.uuid} className='bg-[rgb(226,218,205)]/90 rounded-lg p-4 hover:shadow-lg transition-shadow'>
                                {skin.displayIcon ? (
                                  <img src={skin.displayIcon} alt="" className='w-full h-32 object-contain mb-4' />
                                ): ''} 

                                <div className='text-center'>
                                  <h3 className='text-2xl font-semibold mb-1 pt-4' style={{fontFamily: 'tungsten'}}>{skin.displayName}</h3>
                                  <p className='text-sm text-gray-800 '>{skin.levels ? skin.levels.length : 0} Upgrade/s • {skin.chromas ? skin.chromas.length : 0} Chroma/s</p>
                                </div>
                              </div>
                            
                            ))}
                          </div>
                          


                        ) : <></>}
                      </div>


                  </div>
                </div>
              )}
            
          </div>
            
      </div>

    </div>
  )
}

export default Weapons