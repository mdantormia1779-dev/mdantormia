import React from 'react'
import Header from './Header/Header'
import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Header/Body/Home'
import All from './All'
import ErrorPage from './ErrorPage'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<All />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
