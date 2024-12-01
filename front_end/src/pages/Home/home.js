import React , {useEffect}from 'react'
import Popular from '../../components/Popular/Popular.jsx'
import SlidingBanner from '../../components/SlidingBanner/SlidingBanner.js'

import './home.css'

function Home() {
  useEffect(() => { 
    window.scrollTo(0, 0);  
});
  return (
    <div className='home'>
      <SlidingBanner />
      <Popular category = {"Điện thoại"}/>
      <Popular category = {"Laptop"}/> 
      <Popular category = {"Tai nghe"}/> 
      <Popular category = {"Bàn phím"}/> 
      <Popular category = {"Phụ kiện"}/>
      <Popular category = {"Chuột"}/>        
      </div>
  )
}

export default Home;