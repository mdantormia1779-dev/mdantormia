import React from 'react'
import Card from './Card'

function Application() {
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
     
    </div>
  )
}

export default Application
