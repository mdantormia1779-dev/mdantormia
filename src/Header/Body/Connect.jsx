import React from 'react'
import { motion } from "framer-motion"

const socialLinks = [
  {
    href: "https://wa.me/qr/4AHMDUOUBTMIB1",
    alt: "Whatsapp",
    src: "whatsapp.png",
  },
  {
    href: "https://www.facebook.com/md.ontormia.92372",
    alt: "Facebook",
    src: "facebook.png",
  },
  {
    href: "https://t.me/mdantor1779",
    alt: "Telegram",
    src: "telegram.png",
  },
  {
    href: "https://www.linkedin.com/in/md-antor-mia-a79091389/",
    alt: "Linkedin",
    src: "social.png"
  },
  {
    href: "https://github.com/mdantormia1779-dev",
    alt: "Github",
    src: "github.png",
  },
  {
    href: "https://x.com/mdantormia1779",
    alt: "Twitter (X)",
    src: "twitter.png",
  },
]

function Connect() {
  return (
    <motion.div
      className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 mt-6"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 10, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {socialLinks.map(({ href, alt, src }) => (
        <a
          key={alt}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-lg"
        >
          <div className="w-10 h-10 md:h-12 bg-white p-1 rounded-lg flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain"
            />
          </div>
        </a>
      ))}
    </motion.div>
  )
}

export default Connect
