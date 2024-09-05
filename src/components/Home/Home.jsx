import React, {  useEffect, useState } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'

import CategorySlider from '../CategorySlider/CategorySlider'
import TopSlider from '../TopSlider/TopSlider'

export default function Home() {
 

  return (
    <>
    <TopSlider/>
<CategorySlider/>
      <div className="row">
     <RecentProducts />
      </div>
    </>
  )
}

