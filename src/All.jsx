import React from 'react'
import Card from './Card'

function All() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4">
      <Card
        videoSrc="video.mp4"
        title="Web Development"
        subtitle="Emergency Services"
        description="Your emergency time help — this web helps you find emergency contact numbers quickly and easily."
        year="2025"
        visitLink="https://mdantormia1779-dev.github.io/EmergencyService/"
      />
      <Card
        videoSrc="video1.mp4"
        title="Web Development"
        subtitle="Coffee Shop"
        description="A sleek, responsive coffee shop website highlighting cozy vibes and fresh brews to attract and engage visitors."
        year="2025"
        visitLink="https://mdantormia1779-dev.github.io/Cofee-Shop/"
      />
      <Card
        videoSrc="video2.mp4"
        title="Web Developmment"
        subtitle="Portfolio Website"
        description="Showcasing my skills, projects, and creative journey — a digital space where passion meets professionalism."
        year="2025"
        visitLink="#"
      />
      <Card
        videoSrc="video.mp4"
        title="Web Development"
        subtitle="Emergency Services"
        description="Your emergency time help — this web helps you find emergency contact numbers quickly and easily."
        year="2025"
        visitLink="https://mdantormia1779-dev.github.io/EmergencyService/"
      />
      <Card
        videoSrc="video1.mp4"
        title="Web Development"
        subtitle="Coffee Shop"
        description="A sleek, responsive coffee shop website highlighting cozy vibes and fresh brews to attract and engage visitors."
        year="2025"
        visitLink="https://mdantormia1779-dev.github.io/Cofee-Shop/"
      />
      <Card
        videoSrc="video.mp4"
        title="Web Development"
        subtitle="Emergency Services"
        description="Your emergency time help — this web helps you find emergency contact numbers quickly and easily."
        year="2025"
        visitLink="https://mdantormia1779-dev.github.io/EmergencyService/"
      />
    </div>
  )
}

export default All
