import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import Portfolio from './Portfolio';

// ModalContent Component
function ModalContent({ isOpen, onClose, children }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true); // Open animation trigger
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className={`
          bg-black rounded-lg w-11/12 h-11/12 shadow-lg relative flex flex-col border-2 border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 p-4 flex-shrink-0">
          <h2 className="text-xl font-semibold text-white">Portfolio</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 transition text-3xl font-semibold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-4 text-white overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

// Main Modal Component
function Modal({ Name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timeout = setTimeout(() => setShowModal(false), 300); // Wait for animation to finish
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-black rounded"
      >
        {Name}
      </button>

      {showModal && (
        <ModalContent isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Portfolio />
        </ModalContent>
      )}
    </div>
  );
}

export default Modal;
