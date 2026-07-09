import React from 'react'
import SEO from '../components/SEO'
import Hero from './contactUs/Hero'
import ContactUsSection from './contactUs/ContactUsSection'
import { Send } from 'lucide-react'
import SendMessageSection from './contactUs/SendMessageSection'

const ContactUs = () => {
  return (
    <div>
        <SEO 
          title="Contact Us | Global Staffing Partner"
          description="Have a hiring need or a question for our team? Reach out to Humanhire Corp,  we're here to help, wherever you're hiring from."
          canonical="https://humanhirecorp.com/contact-us"
        />
        <Hero />
        <ContactUsSection />
        <SendMessageSection />
    </div>
  )
}

export default ContactUs