import React from 'react'
import Hero from './aboutUs/Hero'
import JourneySection from './aboutUs/JourneySection'
import MissionVisionGoal from './aboutUs/MissionVisionGoal'
import Carousel from './aboutUs/Carousel'
import SuccessStoriesSection from './aboutUs/SuccessStoriesSection'
import VisionSection from './aboutUs/VisionSection'
import OurClients from './aboutUs/OurClients'
import ContactSection from '../components/UI/ContactSection'
import FixedBackgroundSection from './home/FixedBackgroundSection '
import Banner from './aboutUs/ClientBanner'
const AboutUs = () => {
  return (
    <div>
        <Hero />
        <JourneySection />
        <MissionVisionGoal />
        <Carousel />
        <SuccessStoriesSection />
        {/* <FixedBackgroundSection /> */}
        <FixedBackgroundSection/>
        <VisionSection />
        <Banner />
        {/* <OurClients /> */}
        <ContactSection />
    </div>
  )
}

export default AboutUs