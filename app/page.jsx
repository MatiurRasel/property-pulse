import React from 'react'
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = () => {
  return (
    <>
    <Hero></Hero>
    <InfoBoxes></InfoBoxes>
    <FeaturedProperties></FeaturedProperties>
    <HomeProperties></HomeProperties>
    </>
  )
}

export default HomePage;