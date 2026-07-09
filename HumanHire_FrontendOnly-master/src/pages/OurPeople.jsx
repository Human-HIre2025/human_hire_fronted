import React from 'react'
import SEO from '../components/SEO'
import Hero from './ourPeople/Hero'
import TeamSection from './ourPeople/TeamSection'
import OurTeamSection from './ourPeople/OurTeamSection'
import ContactSection from '../components/UI/ContactSection'
const OurPeople = () => {
  return (
    <div>
        <SEO 
          title="Our People | Meet our experts"
          description="Meet the global recruitment experts behind Humanhire Corp, dedicated to connecting global businesses with top-tier talent."
          canonical="https://humanhirecorp.com/our-people"
        />
        <Hero />
        <TeamSection />
        <OurTeamSection />
        <ContactSection />
    </div>
  )
}

export default OurPeople