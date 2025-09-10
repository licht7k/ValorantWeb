import React, { useState, useEffect } from 'react'
import BG5 from '../assets/bg-5.jpg'
import valoLogo from '../assets/valoTEXTlogo.png'

const Maps = () => {

  const [maps, setMaps] = useState([])
  const [loading, setLoading] = useState(true)
  const [showMapModal, setShowMapModal] = useState(false)
  const [selectedMap, setSelectedMap] = useState(null)


  const fetchMaps = async() => {
    setLoading(true)
    try {
      const response = await fetch('https://valorant-api.com/v1/maps')
      
      if(response.ok){
        const data = await response.json()
        console.log(data.data);
        setMaps(data.data)
        setLoading(false)
      }

    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchMaps()

  }, [])

  const sortedMap = maps
  .filter( map => {
    const mapname = map.displayName.toLowerCase()
    return !mapname.includes('range') && !mapname.includes('basic training')
  })
  .sort((a,b) => {
    return a.displayName.localeCompare(b.displayName)
  })

   if (loading) {
    return (
      <div className='bg-[rgb(240,237,230)] h-screen flex items-center justify-center'>
        <p className='text-2xl'>Loading maps...</p>
      </div>
    )
  }

  const handleMapClick = (map) => {
    setSelectedMap(map)
    setShowMapModal(true)
  }

  const closeModal = () => {
    setShowMapModal(false)
    setSelectedMap(null)
  }

  
 
  
  


    return (
    <div className='bg-[rgb(236,232,225)] min-h-screen' style={{backgroundImage: `url(${BG5})`}}>

      <div className='pt-30 pb-20'>
        <h2 className='text-8xl ml-10 mb-15' style={{fontFamily: 'tungsten'}}>MAPS</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10'>
          {sortedMap.map(map => (
            <div key={map.uuid} className='bg-white/40 rounded-lg overflow-hidden shadow-xl hover:cursor-pointer hover:shadow-2xl transition-shadow duration-300' onClick={() => handleMapClick(map)}>
              
              {/* Map Image */}
              <div className='relative h-48 overflow-hidden'>
                <img 
                  src={map.splash} 
                  alt={map.displayName}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                />
              </div>
              
              {/* Map Info */}
              <div className='p-4'>
                <h3 className='text-3xl font-bold text-center mb-2' style={{fontFamily: 'tungsten'}}>
                  {map.displayName.toUpperCase()}
                </h3>
                
                {map.coordinates && (
                  <p className='text-xs text-gray-500 text-center mt-2'>
                   {map.coordinates}
                  </p>
                )}
              </div>
              

              
              
            </div>
          ))}

        </div>

          {/* Map modal */}
              {showMapModal && selectedMap && (
                <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4' onClick={closeModal}>
                  <div className='bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden' onClick={(e) => e.stopPropagation()}>
                    
                    {/* Modal header */}
                    <div className='bg-red-500 h-15 text-white flex justify-between items-center px-6'>
                      <img src={valoLogo} alt="" className='w-25 h-25 mt-1' />
                      <button className='text-2xl font-bold -mt-2 cursor-pointer' onClick={closeModal}>x</button>
                    </div>

                    {/* Modal content */}
                    <div className='p-6 overflow-y-auto max-h-[100vh]' style={{backgroundImage: `url(${BG5})`}}>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                      
                        {/* Display icon */}
                        <div className='flex flex-col items-center'>
                         <h3 className='text-2xl font-bold' style={{fontFamily: 'tungsten'}}>MAP LAYOUT</h3>
                          {selectedMap.displayIcon ? (
                            <img src={selectedMap.displayIcon} alt="" className='w-full max-w-md h-auto rounded-lg shadow-lg'/>
                          ) : 
                             <div className='w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center'>
                               <p className='text-gray-500'>No map layout available</p>
                             </div>
                          }
                        </div>


                        {/* Map details */}
                        <div>
                          <h3 className='text-2xl text-center font-bold mb-4' style={{fontFamily: 'tungsten'}}>MAP DETAILS</h3>
                          
                          {selectedMap.splash && (
                            <div className='mb-4'>
                              <img src={selectedMap.splash} alt="" className='w-full h-48 object-cover rounded-lg'/>
                            </div>
                          )}

                          {selectedMap.narrativeDescription && (
                            <div className='mb-4'>
                              <h4 className='font-semibold mb-2'>Description:</h4>
                              <p className='text-gray-700'>{selectedMap.narrativeDescription}</p>
                            </div>
                          )}

                          {selectedMap.coordinates && (
                            <div className='mb-4'>
                              <h4 className='font-semibold mb-2'>Coordinates</h4>
                              <p>{selectedMap.coordinates}</p>
                            </div>
                          )}
                        
                          {selectedMap.tacticalDescription && (
                            <div className='mb-4'>
                              <h4 className='font-semibold mb-2'>Tactical Info:</h4>
                               <p className='text-gray-700'>{selectedMap.tacticalDescription}</p>
                            </div>
                          )}

                        </div>
                      
                      </div>


                    
                    
                    </div>

                  </div>
                </div>
              )}
      
      </div>

    </div>
  )
}

export default Maps