import React from 'react'
import Hero from './jobSeekers/Hero'
import CareersSection from './jobSeekers/CareersSection'
import JobOpeningsSection from './jobSeekers/JobOpeningsSection'
import ImageCrousel from './jobSeekers/ImageCrousel'
import FixedBackgroundSection from './jobSeekers/FixedBackgroundSection'
import WhyChooseUsSection from './jobSeekers/WhyChooseUsSection'
import GrowBusinessSection from './jobSeekers/GrowBusinessSection'
import ContactSection from '../components/UI/ContactSection'
import OurPartners from './home/OurPartners'
const JobSeekers = () => {
  return (
    <div>
        <Hero />
        <CareersSection />
        <JobOpeningsSection />
        {/* <ImageCrousel /> */}
        <WhyChooseUsSection />
        <OurPartners />
        <FixedBackgroundSection />
        <ContactSection />
    </div>
  )
}

export default JobSeekers