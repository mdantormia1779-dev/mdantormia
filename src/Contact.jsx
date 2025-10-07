import React from 'react';
import { motion } from 'framer-motion';
import Connect from './Header/Body/Connect';

function Contact() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white px-6 py-16 flex flex-col md:flex-row items-start justify-center gap-12">

      {/* Contact Form (Left) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 bg-gray-800 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <p className="text-red-400 text-sm mt-1">Name is required</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold mb-1">Subject</label>
            <select
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select a subject</option>
              <option value="project">New Project</option>
              <option value="idea">Creative Idea</option>
              <option value="job">Job/Opportunity</option>
              <option value="question">General Question</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>

      {/* Contact Info (Right) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full md:w-1/3 space-y-6"
      >
        <h1 className="text-4xl font-bold">Contact</h1>
        <h2 className="text-xl text-green-400 font-semibold">GET IN TOUCH</h2>
        <h3 className="text-2xl font-semibold">Let's Connect</h3>
        <p className="text-gray-300">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out with any questions!
        </p>

        {/* Email Info */}
        <div>
          <p className="text-sm text-gray-400">Email</p>
          <p className="text-lg font-medium">mdantorm1000@gmail.com</p>
        </div>

        {/* Response Time */}
        <div>
          <p className="text-sm text-gray-400">Response Time</p>
          <p className="text-lg font-medium">Within 2 hours</p>
        </div>

        {/* Social Icons */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Find me on</p>
          <div className="flex gap-4 text-2xl">
            <Connect />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
