import React from 'react'
import Hero from './contactUs/Hero'
import ContactUsSection from './contactUs/ContactUsSection'
import { Send } from 'lucide-react'
import SendMessageSection from './contactUs/SendMessageSection'

const ContactUs = () => {
  return (
    <div>
        <Hero />
        <ContactUsSection />
        <SendMessageSection />
    </div>
  )
}

export default ContactUs