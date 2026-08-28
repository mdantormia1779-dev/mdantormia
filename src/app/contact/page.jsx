"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaPaperPlane,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import gsap from "gsap";

const ContactPage = () => {
  const form = useRef();
  const containerRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-header", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      gsap.from(".contact-col", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    toast.success(`${label} copied to clipboard!`, { autoClose: 2000 });
    setTimeout(() => setCopiedLabel(null), 2500);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_jul8r5d",
        "template_f5b9s9v",
        form.current,
        "UEaKznhskrLFnLVpP"
      )
      .then(
        () => {
          toast.success("Thank you! Your message was sent successfully. 🎉");
          e.target.reset();
        },
        (error) => {
          console.error("Email error:", error);
          toast.error("Oops! Something went wrong. Please try again or email directly.");
        }
      )
      .finally(() => setIsSending(false));
  };

  const contactDetails = [
    {
      icon: FaEnvelope,
      label: "Email Address",
      value: "mdantormia1779@gmail.com",
      actionText: "Send Mail",
      actionHref: "mailto:mdantormia1779@gmail.com",
    },
    {
      icon: FaPhoneAlt,
      label: "Phone / WhatsApp",
      value: "+880 1318 964063",
      actionText: "Call Now",
      actionHref: "tel:01318964063",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Gaibandha, Bangladesh",
      actionText: "Open Map",
      actionHref: "https://maps.google.com/?q=Gaibandha,Bangladesh",
    },
  ];

  return (
    <div ref={containerRef} className="py-16 md:py-24 text-white min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="contact-header inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <FiSend className="text-xs" />
            Get in Touch
          </div>
          <h1 className="contact-header text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Let’s Build Something{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h1>
          <p className="contact-header text-gray-400 text-base sm:text-lg">
            Have a project in mind, seeking a developer for your team, or want to say hello? Send me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS & SOCIALS */}
          <div className="contact-col lg:col-span-5 space-y-8">
            <div className="bg-[#0b1120]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I am actively available for frontend engineering, full stack web development roles, and freelance collaborations.
              </p>

              <div className="space-y-4">
                {contactDetails.map((item, idx) => {
                  const Icon = item.icon;
                  const isCopied = copiedLabel === item.label;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                            <p className="text-sm font-semibold text-white">{item.value}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopy(item.value, item.label)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-gray-400 hover:text-indigo-300 transition-colors"
                          title="Copy to clipboard"
                        >
                          {isCopied ? <FaCheck className="text-emerald-400 text-xs" /> : <FaCopy className="text-xs" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SOCIAL MEDIA */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-3">
                  Follow & Connect
                </p>
                <div className="flex items-center gap-3">
                  {[
                    {
                      icon: FaGithub,
                      link: "https://github.com/mdantormia1779-dev",
                      label: "GitHub",
                      color: "hover:border-white hover:text-white",
                    },
                    {
                      icon: FaLinkedin,
                      link: "https://www.linkedin.com/in/md-antor-mia-antor/",
                      label: "LinkedIn",
                      color: "hover:border-cyan-400 hover:text-cyan-400",
                    },
                    {
                      icon: FaFacebook,
                      link: "https://www.facebook.com/share/17QnUSneqa/",
                      label: "Facebook",
                      color: "hover:border-indigo-400 hover:text-indigo-400",
                    },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={i}
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-300 hover:scale-110 ${s.color}`}
                      >
                        <Icon size={19} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MODERN FORM */}
          <div className="contact-col lg:col-span-7">
            <div className="bg-[#0b1120]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Send Me a Direct Message</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Fill out the form below and I will respond to you within 24 hours.
                </p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 ml-1">
                      Your Name
                    </label>
                    <input
                      name="from_name"
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-[#030712]/90 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 ml-1">
                      Your Email
                    </label>
                    <input
                      name="reply_to"
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-[#030712]/90 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 ml-1">
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full bg-[#030712]/90 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 ml-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me more about your project scope, timeline, and goals..."
                    className="w-full bg-[#030712]/90 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane className="text-xs" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;