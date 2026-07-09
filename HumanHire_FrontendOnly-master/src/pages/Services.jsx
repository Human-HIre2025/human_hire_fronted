import React from 'react'
import SEO from '../components/SEO'
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
        <SEO 
          title="Our Services | RPO Staffing, HR Solutions & Workforce Consulting"
          description="From sourcing to onboarding, we help businesses build stronger teams faster. Explore how Humanhire Corp supports global hiring needs."
          canonical="https://humanhirecorp.com/services"
        />
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