import preLoader from '../../image/spinner.gif'
import React from 'react'
import '../../App.css'

const Preloader = () => {
  return <div className='preloader'>
    <img src={preLoader} style={{ width: '300px' }} alt='load'/>
  </div>
}

export default Preloader
