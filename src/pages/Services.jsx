import React from 'react'
import Hero from './services/Hero'
import JobCategories from './home/JobCategories'
import ServiceCards from './services/ServiceCards'
import TrustedClients from './services/TrustedClients'
import VisionSection from './services/VisionSection'
import TestimonialCarousel from './services/TestimonialCarousel'
import ContactSection from '../components/UI/ContactSection'

const Services = () => {
  return (
    <div>
        <Hero/>
        <JobCategories />
        <ServiceCards />
        <TrustedClients />
        <VisionSection />
        <TestimonialCarousel />
        <ContactSection />
    </div>
  )
}

export default Services