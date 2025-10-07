import React, { useState } from 'react'
import Modal from '../Modal'
import About from '../About'
import { NavLink } from 'react-router-dom'
import ContactModal from '../ContactModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-black shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-blue-600">
          Portfolio
        </NavLink>

        {/* Bar Icon for mobile */}
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Navigation - hidden on mobile */}
        <nav
          className={`flex-col md:flex md:flex-row fixed md:static top-16 right-4 z-50 bg-black md:bg-transparent space-y-2 md:space-y-0 md:space-x-4 p-5 md:p-0 md:mr-10 lg:mr-1 rounded-md transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'flex' : 'hidden'
          }`}
        >
          <a className="text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-black transition">
            <Modal Name="Portfolio" />
          </a>
          <a className="text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-black transition">
            <About Name="About" />
          </a>
          <a className="text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-black transition">
            <ContactModal Name="Contact" />
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
