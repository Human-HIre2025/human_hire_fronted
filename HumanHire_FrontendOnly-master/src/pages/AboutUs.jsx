import React from 'react'
import SEO from '../components/SEO'
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
        <SEO 
          title="About Us | Global Recruitment & Staffing Experts"
          description="Humanhire Corp is a global recruitment & RPO staffing partner. Our story, mission, and expertise in building great teams worldwide."
          canonical="https://humanhirecorp.com/about"
        />
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