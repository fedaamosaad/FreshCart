import React, {  useEffect, useState } from 'react'

import RecentProducts from '../RecentProducts/RecentProducts'

import CategorySlider from '../CategorySlider/CategorySlider'
import TopSlider from '../TopSlider/TopSlider'

export default function Home() {
  window.scrollTo(0, 0);

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

