import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import All from './All';
import Web from './Web';
import Application from './Application';

function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
        return <All />;
      case 'web-dev':
        return <Web />;
      case 'web-app':
        return <Application />;
      case 'landing':
        return <All />; // Optional: Landing component if you create one
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white mt-5 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
      {/* Text content */}
      <div className="text-center max-w-4xl mb-8 px-2 sm:px-6">
        <h1 className="text-blue-600 text-lg sm:text-xl md:text-2xl font-bold mb-2">SHOWCASE</h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">My Portfolio</h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          As a front-end developer, I specialize in responsive web design and interactive UI development using technologies like
          <span className="text-yellow-400 font-semibold"> HTML</span>,{' '}
          <span className="text-blue-400 font-semibold"> CSS</span>,{' '}
          <span className="text-yellow-300 font-semibold"> JavaScript</span>,{' '}
          <span className="text-teal-300 font-semibold"> React</span>, and{' '}
          <span className="text-cyan-400 font-semibold"> Tailwind CSS</span>. I focus on mobile-first layouts, engaging animations, and performance-optimized interfaces that enhance user engagement.
        </p>
      </div>

      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {['all', 'web-dev', 'web-app', 'landing'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-sm sm:text-base transition-colors duration-300 ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab === 'all' && 'All'}
            {tab === 'web-dev' && 'Web Development'}
            {tab === 'web-app' && 'Web Application'}
            {tab === 'landing' && 'Landing Page'}
          </button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <div className="w-full max-w-7xl flex justify-center px-2 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Portfolio;
