import React from 'react';

function Card({ videoSrc, title, subtitle, description, year, visitLink }) {
  return (
    <div className="items-center justify-center flex">
      <div
        className="w-95 rounded-xl overflow-hidden border border-gray-700 
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
        shadow-xl transition duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-blue-500"
      >
        {/* Video */}
        <div className="bg-white w-full h-40 overflow-hidden">
          <video
            className="w-full h-full object-cover pointer-events-none"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Content */}
        <div className="w-full p-4 text-white space-y-2">
          <h1 className="text-xl font-bold text-blue-300">{title}</h1>
          <h2 className="text-lg font-semibold text-gray-300">{subtitle}</h2>
          <p className="text-sm text-gray-400">{description}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700">
          <p className="text-sm text-gray-400">{year}</p>
          <a
            href={visitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Visit
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
