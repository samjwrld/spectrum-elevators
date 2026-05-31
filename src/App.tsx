/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Check, 
  ArrowRight,
  Shield,
  ShieldCheck,
  Clock,
  ChevronRight,
  Sparkles,
  Volume2,
  Brush,
  Smartphone,
  ChevronUp,
  ChevronDown,
  Wrench,
  Award,
  Users,
  Building,
  ArrowUpRight,
  Layers,
  Calendar,
  FileText,
  UserCheck,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Generated visual elements for brand elevation
import luxuryVillaElevator from "./assets/images/luxury_villa_elevator_1780118810684.png";
import heroImg from "./assets/images/h1.png";
import heroMobileImg from "./assets/images/hero.png";
import commercialElevator from "./assets/images/commercial_elevator_cabin_1780211992973.png";
import logoImg from "./assets/images/logo.png";


// Reusable high-fidelity matching brand logo component
export function SpectrumLogo({ className = "", size = "normal" }: { className?: string; size?: "normal" | "small" | "large" }) {
  const heightClasses = {
    small: "h-9 sm:h-10",
    normal: "h-11 sm:h-12",
    large: "h-18 sm:h-[5.25rem]",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImg}
        alt="Spectrum Elevators Logo"
        referrerPolicy="no-referrer"
        className={`${heightClasses[size]} w-auto object-contain mix-blend-multiply`}
      />
    </div>
  );
}


export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Active product index
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "New Lift Installations",
    message: ""
  });
  const [lastSubmittedData, setLastSubmittedData] = useState<{ name: string; phone: string; service: string; message: string } | null>(null);

  // Intersection Observer scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.phone.trim()) {
      const currentData = { ...formData };
      setLastSubmittedData(currentData);
      setFormSubmitted(true);

      const whatsappText = `*Spectrum Elevators Inquiry*\n\n` +
        `*Name:* ${currentData.name}\n` +
        `*Phone:* ${currentData.phone}\n` +
        `*Service Segment:* ${currentData.service}\n` +
        `*Enquiry details:* ${currentData.message || "None provided"}`;
      
      const encodedText = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/918919102440?text=${encodedText}`;
      
      // Attempt direct window open / redirect
      try {
        const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        // Fallback context within iframe setups if popup was blocked or prohibited
        if (!opened) {
          setTimeout(() => {
            window.location.href = whatsappUrl;
          }, 1500);
        }
      } catch (err) {
        console.warn("Direct navigation fallback triggered:", err);
        setTimeout(() => {
          window.location.href = whatsappUrl;
        }, 1500);
      }

      setFormData({
        name: "",
        phone: "",
        service: "New Lift Installations",
        message: ""
      });

      // Keep success message visible for 15 seconds to allow manual clicks
      setTimeout(() => {
        setFormSubmitted(false);
        setLastSubmittedData(null);
      }, 15000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  const services = [
    {
      num: "01",
      title: "New Lift Installations",
      desc: "Custom design and installation for residential to commercial projects, fully compliant with safety regulations."
    },
    {
      num: "02",
      title: "In-House Controller Technology",
      desc: "Proprietary control systems with precise control, faster response, and seamless integration."
    },
    {
      num: "03",
      title: "Modernization & Upgrades",
      desc: "Latest technology upgrades improving energy efficiency, user experience, and property value."
    },
    {
      num: "04",
      title: "Repair & Maintenance",
      desc: "Certified technicians for regular inspections, troubleshooting, and prompt repairs that minimize downtime."
    },
    {
      num: "05",
      title: "Control Modification",
      desc: "Upgrade outdated control systems to improve efficiency and reduce wait times in any environment."
    },
    {
      num: "06",
      title: "24/7 Emergency Support",
      desc: "Our dedicated team is always on call — rapid response prioritising passenger safety."
    }
  ];

  const elevatorTypes = [
    {
      num: "01",
      name: "Home Elevators",
      desc: "Designed for multi-story homes, blending seamlessly with your interior design while enhancing mobility."
    },
    {
      num: "02",
      name: "Passenger Elevators",
      desc: "Safe, comfortable transportation with advanced technology and customizable options for any building."
    },
    {
      num: "03",
      name: "Commercial Elevators",
      desc: "High-traffic solutions for offices and retail — quick, efficient, and built for daily intensity."
    }
  ];

  const testimonials = [
    {
      text: "Spectrum Elevators provided exceptional service during our recent installation. Their team was professional, efficient, and attentive to every detail.",
      author: "RAVI KUMAR",
      location: "Hyderabad"
    },
    {
      text: "The maintenance service has been outstanding. Their technicians are knowledgeable and always ensure our elevators are in top condition.",
      author: "SWATHI RANI",
      location: "Mumbai"
    },
    {
      text: "We upgraded our elevator controls with Spectrum and the difference is remarkable — faster, more reliable. Truly expert work.",
      author: "MADHAV REDDY",
      location: "Nanded"
    }
  ];

  const marqueeText = "New Installations · Controller Technology · 24/7 Emergency Support · Modernization & Upgrades · Certified Technicians · Hyderabad · Mumbai · Nanded · ";

  return (
    <div className="min-h-screen bg-white text-[#151922] relative selection:bg-[#73BA27] selection:text-white">
      
      {/* SECTION 1 — NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-[10px] border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          
          {/* Logo matched precisely to original image */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="cursor-pointer select-none"
          >
            <SpectrumLogo size="large" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("hero")} 
              className="font-jost text-[0.82rem] font-semibold uppercase tracking-[0.15em] text-[#73BA27] border-b-2 border-[#73BA27] pb-1.5 transition-all"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="font-jost text-[0.82rem] font-medium uppercase tracking-[0.15em] text-gray-400 hover:text-[#73BA27] transition-colors duration-300"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection("products")} 
              className="font-jost text-[0.82rem] font-medium uppercase tracking-[0.15em] text-gray-400 hover:text-[#73BA27] transition-colors duration-300"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="font-jost text-[0.82rem] font-medium uppercase tracking-[0.15em] text-gray-400 hover:text-[#73BA27] transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")} 
              className="font-jost text-[0.82rem] font-medium uppercase tracking-[0.15em] text-gray-400 hover:text-[#73BA27] transition-colors duration-300"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="font-jost text-[0.82rem] font-medium uppercase tracking-[0.15em] text-gray-400 hover:text-[#73BA27] transition-colors duration-300"
            >
              Contact Us
            </button>
          </nav>

          {/* Desktop Phone Capsule Pill Button */}
          <div className="hidden lg:block">
            <a 
              href="tel:+918919102440"
              className="flex items-center space-x-3 border-[1.5px] border-[#73BA27]/60 hover:border-[#73BA27] px-6 py-3 rounded-full bg-[#73BA27]/5 hover:bg-[#73BA27]/10 text-gray-900 transition-all duration-300 shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-[#73BA27] flex items-center justify-center text-white">
                <Phone className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="font-jost text-[0.85rem] font-bold tracking-wider text-gray-900">
                +91 891 910 2440
              </span>
            </a>
          </div>

          {/* Mobile Hamburguer Menu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-gray-900 hover:text-[#73BA27] transition-colors p-1"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-6 py-8 absolute top-[96px] left-0 right-0 z-40 flex flex-col space-y-4 shadow-xl animate-fadeIn">
            <button 
              onClick={() => { scrollToSection("hero"); }} 
              className="text-left font-jost text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-[#73BA27]"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-left font-jost text-[0.95rem] font-medium uppercase tracking-[0.1em] text-gray-500 hover:text-[#73BA27] py-1"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection("products")} 
              className="text-left font-jost text-[0.95rem] font-medium uppercase tracking-[0.1em] text-gray-500 hover:text-[#73BA27] py-1"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-left font-jost text-[0.95rem] font-medium uppercase tracking-[0.1em] text-gray-500 hover:text-[#73BA27] py-1"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")} 
              className="text-left font-jost text-[0.95rem] font-medium uppercase tracking-[0.1em] text-gray-500 hover:text-[#73BA27] py-1"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-left font-jost text-[0.95rem] font-medium uppercase tracking-[0.1em] text-gray-500 hover:text-[#73BA27] py-1"
            >
              Contact Us
            </button>
            
            <a 
              href="tel:+918919102440"
              className="flex items-center justify-center space-x-3 border border-[#73BA27] py-3.5 rounded-full bg-[#73BA27]/5 text-gray-900 mt-4 font-jost font-bold"
            >
              <Phone className="w-4 h-4 text-[#73BA27] fill-[#73BA27]" />
              <span>Call Us: +91 891 910 2440</span>
            </a>
          </div>
        )}
      </header>
      {/* SECTION 2 — HERO */}
      <section id="hero" className="pt-20 md:pt-24 min-h-[580px] md:h-[640px] lg:h-[690px] xl:h-[720px] bg-[#FAF9F7] relative overflow-hidden flex flex-col justify-between">
        
        {/* Architectural drafting grid pattern and subtle ambient gradient glows */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#73BA27]/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#0172CE]/4 rounded-full blur-[120px] pointer-events-none z-0" />
        
        {/* RIGHT SIDE HERO IMAGE (Beautiful Lobby Showcase with no gaps) */}
        <div className="absolute inset-y-0 right-0 w-[80%] hidden md:block select-none z-0">
          <img 
            src={heroImg} 
            alt="Spectrum Luxury Elevator Cabin in Hallway"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right" 
          />
        </div>

        {/* BEAUTIFUL MAJESTIC CURVED TRANSITION MASK TRACED FROM THE REFERENCE IMAGE */}
        <div className="absolute inset-0 hidden md:block pointer-events-none z-10 select-none">
          <svg 
            viewBox="0 0 1000 1000" 
            preserveAspectRatio="none" 
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="curve-fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FAF9F7" stopOpacity="1" />
                <stop offset="5%" stopColor="#FAF9F7" stopOpacity="0.85" />
                <stop offset="15%" stopColor="#FAF9F7" stopOpacity="0.3" />
                <stop offset="25%" stopColor="#FAF9F7" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* The white/off-white background on the left, curving beautifully */}
            <path 
              d="M 0,0 L 490,0 C 350,250 350,750 600,1000 L 0,1000 Z" 
              className="fill-[#FAF9F7]" 
            />

            {/* The beautiful white/off-white soft fade overlay that feathers out over the hallway photo */}
            <path 
              d="M 490,0 C 350,250 350,750 600,1000 L 1000,1000 L 1000,0 Z" 
              fill="url(#curve-fade)"
            />

            {/* Precise layered transition curve styling - glowing white border mimicking the reference ribbon */}
            <path 
              d="M 490,0 C 350,250 350,750 600,1000" 
              className="fill-none stroke-white stroke-[8] opacity-90" 
            />

            {/* Secondary backing visual shadow-edge of the layered curve */}
            <path 
              d="M 488,0 C 348,250 348,750 598,1000" 
              className="fill-none stroke-black/5 stroke-[3]" 
            />
          </svg>
        </div>

        
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-36 md:pt-8 lg:pt-10 xl:pt-12 md:pb-14 w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:items-start items-center relative z-20 h-full flex-grow">
          
          {/* Left Column Content */}
          <div className="w-full md:col-span-5 lg:col-span-4 flex flex-col justify-center">
            
            {/* Small headline label with a light-green row accent */}
            <div className="flex items-center space-x-3 mb-4 shrink-0">
              <span className="w-12 h-[2px] bg-[#73BA27] block shrink-0"></span>
              <span className="font-jost text-xs md:text-sm text-gray-800 font-bold tracking-[0.12em] uppercase whitespace-nowrap">
                Smart Elevators. Smarter Living.
              </span>
            </div>

            {/* Stunning premium heading from the reference image */}
            <h1 className="font-jost leading-[1.125] text-[1.8rem] sm:text-[2.3rem] lg:text-[2.6rem] xl:text-[2.8rem] font-semibold text-gray-900 tracking-tight mb-4">
              <div className="block whitespace-nowrap">Elevate Life with</div>
              <div className="text-[#73BA27] underline decoration-gray-100 underline-offset-4 block whitespace-nowrap">Safety, Style &</div>
              <div className="text-[#0172CE] block md:whitespace-nowrap">Superior Technology</div>
            </h1>

            {/* Paragraph body text matching the image */}
            <p className="font-jost text-[0.9rem] md:text-[0.98rem] font-normal text-gray-500 max-w-[500px] leading-[1.7] mb-4">
              Premium elevator solutions for homes, commercial spaces and real estate projects. Built for safety. Designed for comfort. Made to last.
            </p>

            {/* 4 horizontal micro highlight columns layout with beautiful status icons */}
            <div className="grid grid-cols-4 gap-1 items-center border border-gray-100/80 bg-white/40 backdrop-blur-sm rounded-xl p-2 shadow-[0_4px_20px_rgba(0,0,0,0.01)] mb-3 divide-x divide-gray-200/60">
              
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-7 h-7 rounded-full bg-[#73BA27]/8 flex items-center justify-center text-[#73BA27] mb-1 shadow-[0_2px_8px_rgba(115,186,39,0.05)]">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span className="font-jost text-[0.58rem] md:text-[0.62rem] font-bold text-gray-800 tracking-tight leading-none uppercase">Advanced Safety</span>
              </div>

              <div className="flex flex-col items-center text-center px-1">
                <div className="w-7 h-7 rounded-full bg-[#0172CE]/8 flex items-center justify-center text-[#0172CE] mb-1 shadow-[0_2px_8px_rgba(1,114,206,0.05)]">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-jost text-[0.58rem] md:text-[0.62rem] font-bold text-gray-800 tracking-tight leading-none uppercase">Smooth & Silent</span>
              </div>

              <div className="flex flex-col items-center text-center px-1">
                <div className="w-7 h-7 rounded-full bg-[#73BA27]/8 flex items-center justify-center text-[#73BA27] mb-1 shadow-[0_2px_8px_rgba(115,186,39,0.05)]">
                  <Brush className="w-3.5 h-3.5" />
                </div>
                <span className="font-jost text-[0.58rem] md:text-[0.62rem] font-bold text-gray-800 tracking-tight leading-none uppercase">Luxury Designs</span>
              </div>

              <div className="flex flex-col items-center text-center px-1">
                <div className="w-7 h-7 rounded-full bg-[#0172CE]/8 flex items-center justify-center text-[#0172CE] mb-1 shadow-[0_2px_8px_rgba(1,114,206,0.05)]">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <span className="font-jost text-[0.58rem] md:text-[0.62rem] font-bold text-gray-800 tracking-tight leading-none uppercase">Reliable Support</span>
              </div>

            </div>

            {/* Dynamic Actions block */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button 
                onClick={() => scrollToSection("contact")}
                className="bg-[#73BA27] hover:bg-[#62a31f] text-white px-4 py-2.5 rounded-full font-jost text-[0.74rem] uppercase font-bold tracking-[0.08em] hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shadow-sm animate-glow"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Free Consultation</span>
              </button>
              
              <button 
                onClick={() => scrollToSection("contact")}
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-full font-jost text-[0.74rem] uppercase font-bold tracking-[0.08em] hover:shadow-sm transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-[#0172CE]" />
                <span>Get a Free Estimate</span>
              </button>
            </div>

          </div>

          {/* Right Column / Mobile Fallback Showcase Image Card */}
          {/* Hidden on desktop since the majestic screen-filling curved image is rendered absolutely */}
          <div className="w-full md:col-span-6 flex flex-col items-center justify-center relative md:hidden min-h-[380px] z-20">
            <div className="w-full max-w-[340px] bg-white p-3 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative group">
              <div className="aspect-[4/5] w-full rounded-[24px] overflow-hidden relative">
                <img 
                  src={heroMobileImg} 
                  alt="Spectrum Luxury Elevator Cabin in Hallway"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="font-mono text-[#73BA27] text-[0.62rem] font-bold uppercase tracking-widest mb-1">Spectrum Elevators</span>
                  <h3 className="font-jost text-white font-bold text-[1.05rem] leading-snug">Elite Engineering</h3>
                  <p className="font-jost text-gray-300 text-[0.72rem] mt-1.5 leading-relaxed font-light">Custom luxury cabins tailored precisely to your villa, home or corporate layout.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 2.5 — FLOATING METRICS STRIP TRACED FROM THE REFERENCE IMAGE */}
      <div className="w-full px-6 md:px-12 relative -mt-12 md:-mt-14 z-20">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 gap-6 md:gap-0 justify-between">
          
          {/* Stat Item 1 */}
          <div className="flex-1 flex items-center space-x-4 justify-start md:justify-center pb-4 md:pb-0">
            <div className="w-12 h-12 rounded-full bg-[#73BA27]/10 flex items-center justify-center text-[#73BA27]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-jost text-xl font-bold text-gray-900 leading-tight">100%</div>
              <div className="font-jost text-xs text-gray-500 font-medium tracking-wide uppercase">Safety Commitment</div>
            </div>
          </div>

          {/* Stat Item 2 */}
          <div className="flex-1 flex items-center space-x-4 justify-start md:justify-center py-4 md:py-0">
            <div className="w-12 h-12 rounded-full bg-[#0172CE]/10 flex items-center justify-center text-[#0172CE]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-jost text-xl font-bold text-gray-900 leading-tight">Premium</div>
              <div className="font-jost text-xs text-gray-500 font-medium tracking-wide uppercase">Quality Materials</div>
            </div>
          </div>

          {/* Stat Item 3 */}
          <div className="flex-1 flex items-center space-x-4 justify-start md:justify-center py-4 md:py-0">
            <div className="w-12 h-12 rounded-full bg-[#73BA27]/10 flex items-center justify-center text-[#73BA27]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="font-jost text-xl font-bold text-gray-900 leading-tight">500+</div>
              <div className="font-jost text-xs text-gray-500 font-medium tracking-wide uppercase">Happy Customers</div>
            </div>
          </div>

          {/* Stat Item 4 */}
          <div className="flex-1 flex items-center space-x-4 justify-start md:justify-center pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#0172CE]/10 flex items-center justify-center text-[#0172CE]">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="font-jost text-xl font-bold text-gray-900 leading-tight">24/7</div>
              <div className="font-jost text-xs text-gray-500 font-medium tracking-wide uppercase">Service Support</div>
            </div>
          </div>

        </div>
      </div>


      {/* SECTION 3 — DOUBLE OPPOSITE MARQUEE STRIPS */}
      <div className="py-2.5 bg-[#F9F9FB] border-t border-b border-gray-200/50 flex flex-col space-y-1 overflow-hidden select-none mt-12">
        
        {/* Track 1: Moving left (Clockwise illusion) */}
        <div className="relative w-full overflow-hidden flex h-7 items-center">
          <div className="animate-marquee-left whitespace-nowrap flex items-center shrink-0">
            {Array(4).fill(null).map((_, groupIdx) => (
              <span key={`g1-${groupIdx}`} className="font-mono text-[0.72rem] text-gray-500 font-extrabold tracking-[0.18em] uppercase flex items-center shrink-0">
                <span>NEW INSTALLATIONS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#73BA27] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(115,186,39,0.6)]"></span>
                <span>IN-HOUSE CONTROLLER TECHNOLOGY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0172CE] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(1,114,206,0.6)]"></span>
                <span>24/7 EMERGENCY SUPPORT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#73BA27] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(115,186,39,0.6)]"></span>
                <span>MODERNIZATION & UPGRADES</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0172CE] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(1,114,206,0.6)]"></span>
                <span>CERTIFIED TECHNICIANS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#73BA27] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(115,186,39,0.6)]"></span>
              </span>
            ))}
          </div>
        </div>

        {/* Track 2: Moving right (Anti-clockwise illusion) */}
        <div className="relative w-full overflow-hidden flex h-7 items-center">
          <div className="animate-marquee-right whitespace-nowrap flex items-center shrink-0">
            {Array(4).fill(null).map((_, groupIdx) => (
              <span key={`g2-${groupIdx}`} className="font-mono text-[0.72rem] text-gray-400 font-extrabold tracking-[0.18em] uppercase flex items-center shrink-0">
                <span>HYDERABAD HQ</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0172CE] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(1,114,206,0.6)]"></span>
                <span>MUMBAI OPERATIONS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#73BA27] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(115,186,39,0.6)]"></span>
                <span>NANDED DIVISION</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0172CE] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(1,114,206,0.6)]"></span>
                <span>SAFE · SMOOTH · SUPERIOR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#73BA27] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(115,186,39,0.6)]"></span>
                <span>SPECTRUM ELEVATORS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0172CE] mx-4 inline-block shrink-0 shadow-[0_0_6px_rgba(1,114,206,0.6)]"></span>
              </span>
            ))}
          </div>
        </div>

      </div>


      {/* SECTION 4 — ABOUT */}
      <section id="about" className="py-28 px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
        
        {/* Soft engineering dots pattern and glow layers */}
        <div className="absolute inset-0 bg-dots-pattern opacity-[0.4] pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#73BA27]/4 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#0172CE]/3 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">

          
          {/* Left Column Stats (50% or 2x2 grid) */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 reveal">
            
            {/* Box 1 */}
            <div className="border border-gray-100 bg-[#F9F9FB] rounded-2xl p-8 flex flex-col justify-between hover:border-[#73BA27]/30 hover:shadow-md transition-all duration-300">
              <span className="font-jost text-[3.5rem] font-bold text-[#73BA27] leading-none mb-4">
                15+
              </span>
              <span className="font-mono text-[0.68rem] text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-bold">
                Years Experience
              </span>
            </div>

            {/* Box 2 */}
            <div className="border border-gray-100 bg-[#F9F9FB] rounded-2xl p-8 flex flex-col justify-between hover:border-[#0172CE]/30 hover:shadow-md transition-all duration-300">
              <span className="font-jost text-[3.5rem] font-bold text-[#0172CE] leading-none mb-4">
                3
              </span>
              <span className="font-mono text-[0.68rem] text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-bold">
                Operational Cities
              </span>
            </div>

            {/* Box 3 */}
            <div className="border border-gray-100 bg-[#F9F9FB] rounded-2xl p-8 flex flex-col justify-between hover:border-[#73BA27]/30 hover:shadow-md transition-all duration-300">
              <span className="font-jost text-[3.5rem] font-bold text-[#73BA27] leading-none mb-4">
                5
              </span>
              <span className="font-mono text-[0.68rem] text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-bold">
                Elevator Types Available
              </span>
            </div>

            {/* Box 4 */}
            <div className="border border-gray-100 bg-[#F9F9FB] rounded-2xl p-8 flex flex-col justify-between hover:border-[#0172CE]/30 hover:shadow-md transition-all duration-300">
              <span className="font-jost text-[3.5rem] font-bold text-[#0172CE] leading-none mb-4">
                24/7
              </span>
              <span className="font-mono text-[0.68rem] text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-bold">
                Emergency Priority Support
              </span>
            </div>

          </div>

          {/* Right Column Text Block */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center reveal">
            
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-8 h-[2px] bg-[#73BA27]"></span>
              <span className="font-jost text-xs font-bold text-gray-800 tracking-[0.15em] uppercase">
                WHO WE ARE
              </span>
            </div>

            <h2 className="font-jost text-3xl md:text-[2.6rem] leading-[1.2] font-semibold text-gray-900 mb-8">
              Your Partner in <span className="text-[#73BA27] block sm:inline">Elevating Excellence</span>
            </h2>

            <p className="font-jost text-[0.98rem] text-gray-500 font-normal leading-[1.9] mb-6">
              At Spectrum Elevators, we specialize in delivering top-notch elevator solutions — from new lift installations through advanced control modifications, dependable repairs, and thorough maintenance.
            </p>

            <p className="font-jost text-[0.98rem] text-gray-500 font-normal leading-[1.9] mb-8">
              Committed to excellence and safety, our certified experts are available around the clock to ensure smooth and efficient operations for all types of buildings.
            </p>

            {/* Premium tag row */}
            <div className="flex flex-wrap gap-2.5">
              {["Residential", "Commercial", "Industrial", "Safety Certified", "Hyderabad", "Mumbai"].map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-50 border border-gray-100 text-gray-500 font-jost text-[0.72rem] font-bold uppercase tracking-[0.12em] px-4 py-2 hover:border-[#73BA27] hover:bg-white hover:text-[#73BA27] transition-all duration-300 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 5 — SERVICES */}
      <section id="services" className="py-28 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 reveal">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-8 h-[2px] bg-[#73BA27]"></span>
                <span className="font-jost text-xs font-bold text-gray-800 tracking-[0.15em] uppercase">
                  WHAT WE DO
                </span>
              </div>
              <h2 className="font-jost text-3xl md:text-5xl font-semibold text-gray-900">
                High Quality Services
              </h2>
            </div>
            
            <button 
              onClick={() => scrollToSection("contact")}
              className="group font-jost text-[0.82rem] font-bold uppercase tracking-[0.15em] text-[#73BA27] flex items-center space-x-2 border-b-2 border-[#73BA27]/30 pb-1.5 hover:border-[#73BA27] transition-all duration-300 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Service Cards 2x3 grid using beautiful borders & white card designs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {services.map((srv, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden bg-white hover:shadow-xl border border-gray-100 p-8 flex flex-col justify-between h-80 transition-all duration-500 rounded-2xl"
              >
                {/* Visual indicator lines on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#73BA27] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#0172CE] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />
                
                {/* Top content */}
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-[#73BA27] font-bold bg-[#73BA27]/10 px-2.5 py-1 rounded">
                      {srv.num}
                    </span>
                    <Layers className="w-5 h-5 text-gray-300 group-hover:text-[#0172CE] transition-colors" />
                  </div>
                  
                  <h3 className="font-jost text-[1.05rem] font-bold uppercase tracking-[0.05em] text-gray-900 mt-6 mb-3 group-hover:text-[#73BA27] transition-colors">
                    {srv.title}
                  </h3>
                  
                  <p className="font-jost text-[0.85rem] text-gray-500 leading-[1.8] font-normal">
                    {srv.desc}
                  </p>
                </div>

                {/* Bottom link layout */}
                <span className="font-jost text-[0.72rem] font-bold text-[#73BA27] tracking-[0.1em] opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-1.5 uppercase mt-4">
                  <span>Learn details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                
              </motion.div>
            ))}

          </div>
        </div>
      </section>


      {/* SECTION 6 — ELEVATOR TYPES */}
      <section id="products" className="py-28 px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
        
        {/* Subtle engineering background lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="reveal mb-16">
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[2px] bg-[#73BA27]"></span>
              <span className="font-jost text-xs font-bold text-[#73BA27] tracking-[0.15em] uppercase">
                PRODUCTS SHOWROOM
              </span>
            </div>
            <h2 className="font-jost text-3xl md:text-5xl font-semibold text-gray-900">
              Engineered Lift Solutions
            </h2>
            <p className="font-jost text-sm text-gray-500 mt-2 font-normal max-w-[620px]">
              Tap or hover any category to load live technical specifications and architectural blueprints.
            </p>
          </div>

          {/* Interactive Products Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Interactive Categories (Accordion / List) */}
            <div className="w-full lg:col-span-6 flex flex-col divide-y divide-gray-100 reveal">
              
              {elevatorTypes.map((type, idx) => {
                const isActive = activeProductIndex === idx;
                
                return (
                  <div 
                    key={idx}
                    onMouseEnter={() => setActiveProductIndex(idx)}
                    onClick={() => setActiveProductIndex(idx)}
                    className={`transition-all duration-300 py-6 pr-4 cursor-pointer flex flex-col justify-start relative ${
                      isActive 
                        ? "bg-gradient-to-r from-[#73BA27]/5 via-transparent to-transparent pl-4 border-l-4 border-[#73BA27]" 
                        : "hover:bg-gray-50/50 pl-2 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        {/* Index number */}
                        <div className={`font-jost text-[1.4rem] font-bold leading-none ${
                          isActive ? "text-[#73BA27]" : "text-gray-300"
                        }`}>
                          {type.num}
                        </div>
                        
                        {/* Type name */}
                        <div className={`font-jost text-[1.05rem] font-bold uppercase tracking-[0.05em] transition-colors leading-tight ${
                          isActive ? "text-[#0172CE]" : "text-gray-900"
                        }`}>
                          {type.name}
                        </div>
                      </div>

                      {/* Active indicator bead */}
                      {isActive && (
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#73BA27] animate-pulse"></span>
                          <span className="font-mono text-[0.62rem] text-[#73BA27] font-bold uppercase tracking-wider hidden sm:inline">Active telemetry</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    <div className="font-jost text-[0.88rem] text-gray-500 leading-relaxed font-normal mt-3 pl-8">
                      {type.desc}
                    </div>

                    {/* Specifications expansion for mobile users nested within item */}
                    {isActive && (
                      <div className="mt-4 pl-8 pt-4 border-t border-dashed border-gray-100 lg:hidden space-y-2.5">
                        <div className="grid grid-cols-2 gap-2 text-[0.72rem]">
                          <div>
                            <span className="text-gray-400 font-medium block">MAX SPEED</span>
                            <span className="text-gray-800 font-bold">{
                              idx === 0 ? "0.4 m/s (Silent)" :
                              idx === 1 ? "1.0 m/s - 1.75 m/s" :
                              "1.5 m/s - 2.5 m/s"
                            }</span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-medium block">LOAD CAPABILITY</span>
                            <span className="text-gray-800 font-bold">{
                              idx === 0 ? "250kg - 450kg" :
                              idx === 1 ? "450kg - 1360kg" :
                              "680kg - 1600kg"
                            }</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // pre-fill and scroll
                            setFormData(prev => ({
                              ...prev,
                              service: "New Lift Installations",
                              message: `I would like to receive an estimate for "${type.name}". Please provide details regarding speed options and concrete layout constraints.`
                            }));
                            scrollToSection("contact");
                          }}
                          className="mt-2 w-full bg-[#73BA27] hover:bg-[#62a31f] text-white py-2 rounded-lg font-jost text-[0.72rem] font-bold uppercase tracking-wider transition-colors"
                        >
                          Enquire About {type.name}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

            {/* Right Column: Visual Telemetry Viewer (Desktop only card that floats and switches files) */}
            <div className="w-full lg:col-span-6 hidden lg:block reveal sticky top-28">
              <div className="bg-[#151922] text-white rounded-3xl p-6 shadow-2xl border-2 border-gray-800 overflow-hidden relative group">
                
                {/* Tech glowing pattern across the panel background */}
                <div className="absolute inset-0 bg-circuit-pattern opacity-10 pointer-events-none" />
                
                {/* Technical Corner indicators */}
                <div className="absolute top-4 left-4 font-mono text-[0.52rem] text-gray-500 uppercase tracking-widest">
                  SYS_TELEMETRY: ACTIVE_VIEW_0{activeProductIndex + 1}
                </div>
                <div className="absolute top-4 right-4 font-mono text-[0.52rem] text-[#73BA27] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#73BA27] rounded-full animate-ping"></span>
                  <span>ONLINE SENSOR</span>
                </div>

                {/* Main Render Image Block */}
                <div className="h-64 rounded-2xl overflow-hidden relative border border-gray-800 mt-4 shadow-inner group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeProductIndex}
                      src={
                        activeProductIndex === 0 ? luxuryVillaElevator :
                        activeProductIndex === 1 ? heroImg :
                        commercialElevator
                      }
                      alt={elevatorTypes[activeProductIndex].name}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                  </AnimatePresence>

                  {/* Gradient bottom cover overlay inside the image */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-gray-950/90 to-transparent flex items-end p-4">
                    <div>
                      <div className="font-mono text-[0.58rem] text-[#73BA27] font-semibold tracking-wider uppercase leading-none mb-1">
                        SPECTRUM AUTHENTIC LAYOUT
                      </div>
                      <h4 className="font-jost text-base font-black text-white uppercase tracking-wide leading-none">
                        {elevatorTypes[activeProductIndex].name}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Telemetry statistics labels */}
                <div className="grid grid-cols-2 gap-4 mt-6 border-b border-gray-800 pb-5 text-[0.78rem]">
                  
                  <div>
                    <span className="font-mono text-[0.58rem] text-gray-500 uppercase tracking-widest block mb-1">
                      VVVF INTENSITY SPEED
                    </span>
                    <span className="font-jost font-bold text-gray-200">
                      {
                        activeProductIndex === 0 ? "0.4 m/s (Super Silent Drive)" :
                        activeProductIndex === 1 ? "1.0 m/s to 1.75 m/s (High Speed)" :
                        "1.5 m/s to 2.5 m/s (Ultra Rapid)"
                      }
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[0.58rem] text-gray-500 uppercase tracking-widest block mb-1">
                      CERTIFIED PAYLOAD RATING
                    </span>
                    <span className="font-jost font-bold text-gray-200">
                      {
                        activeProductIndex === 0 ? "250kg to 450kg (3 - 6 Passengers)" :
                        activeProductIndex === 1 ? "450kg to 1360kg (6 - 20 Passengers)" :
                        "680kg to 1600kg (9 - 24 Passengers)"
                      }
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="font-mono text-[0.58rem] text-[#0172CE] uppercase tracking-widest block mb-1">
                      STANDARD HARDWARE CONFIGURATION
                    </span>
                    <span className="font-jost text-gray-300 block text-[0.72rem] leading-relaxed">
                      {
                        activeProductIndex === 0 ? "Low pit requirement (only 300mm), overhead headroom 2900mm. Works on clean single-phase residential 230V connection." :
                        activeProductIndex === 1 ? "VVVF speed adjustments, non-contact infrared safety columns, electronic double brake, automatic floor landing system on power cut." :
                        "Regenerative smart motor returns clean power to Grid, destination routing algorithm, high durability titanium hairline cabin options."
                      }
                    </span>
                  </div>

                </div>

                {/* Interactive button that pre-files form details */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[0.5rem] text-gray-500 uppercase">Blueprints Status</span>
                    <span className="text-[#73BA27] text-[0.62rem] font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#73BA27] rounded-full"></span>
                      <span>Verified IS 14665</span>
                    </span>
                  </div>

                  <button 
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        service: "New Lift Installations",
                        message: `Hi, I am looking for architectural details and space requirements planning for the "${elevatorTypes[activeProductIndex].name}" product line. Please revert back.`
                      }));
                      scrollToSection("contact");
                    }}
                    className="bg-[#73BA27] hover:bg-[#62a31f] text-white px-6 py-2.5 rounded-xl font-jost text-[0.72rem] font-extrabold uppercase tracking-widest flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </section>


      {/* SECTION 6.5 — CHOOSE WISELY: RIDE WITH CONFIDENCE (AVOID RISKS) */}
      <section id="why-choose-us" className="py-28 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
        {/* Subtle decorative background grids */}
        <div className="absolute inset-0 bg-dots-pattern opacity-25 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#73BA27]/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#0172CE]/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="reveal mb-16 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="w-8 h-[2px] bg-[#73BA27]"></span>
              <span className="font-jost text-xs font-bold text-[#73BA27] tracking-[0.15em] uppercase">
                BUYERS SELECTION GUIDE
              </span>
              <span className="w-8 h-[2px] bg-[#73BA27]"></span>
            </div>
            <h2 className="font-jost text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
              Ride With Confidence. <span className="text-[#0172CE]">Choose Spectrum.</span>
            </h2>
            <p className="font-jost text-[0.95rem] text-gray-500 mt-4 leading-relaxed font-normal">
              Elevators are a long-term investment in <span className="font-bold text-gray-800">Safety, Comfort & Value</span>. Buying cheap is a heavy operational risk. Avoid unexpected repairs and dangerous downtime.
            </p>
          </div>

          {/* Interactive Comparison Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal mb-16">
            
            {/* Column Left: Guidelines & Risk Warning (6 Grid Columns) */}
            <div className="lg:col-span-6 bg-white border border-gray-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                {/* Visual Risk Indicator Banner */}
                <div className="mb-8 border border-red-100 bg-red-50/50 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div>
                    <span className="font-jost text-[0.62rem] font-bold uppercase tracking-widest text-red-500 block">
                      RISK MANAGEMENT WARNING
                    </span>
                    <h4 className="font-jost text-[1.12rem] font-black text-gray-900 mt-1">
                      Cheap Elevator? <span className="text-red-500 font-bold">❌ Costly Risk.</span>
                    </h4>
                  </div>
                  <div className="bg-red-500 text-white rounded-full px-4 py-1.5 font-jost text-[0.68rem] font-black uppercase tracking-wider animate-pulse select-none">
                    Avoid Risks
                  </div>
                </div>

                <h3 className="font-jost text-[1.25rem] font-bold text-gray-900 uppercase tracking-wide mb-6">
                  How To Choose The Right Elevator:
                </h3>

                {/* Guidelines List */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-[#73BA27] flex items-center justify-center text-xs font-bold font-mono">
                      1
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.88rem] font-bold text-gray-900 uppercase tracking-wide leading-none mb-1">
                        Safety First
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-500 font-normal leading-normal">
                        Ensure fully certified safety components & complete compliance with IS 14665 standard guidelines.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-[#73BA27] flex items-center justify-center text-xs font-bold font-mono">
                      2
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.88rem] font-bold text-gray-900 uppercase tracking-wide leading-none mb-1 font-bold">
                        Quality & Durability
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-500 font-normal leading-normal">
                        Choose premium grade materials & trusted controller technology to ensure longer structural life.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-[#73BA27] flex items-center justify-center text-xs font-bold font-mono">
                      3
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.88rem] font-bold text-gray-900 uppercase tracking-wide leading-none mb-1 font-bold">
                        Right Capacity & Performance
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-500 font-normal leading-normal">
                        Select precise motor speed, load payload & structural dimensions customized to your building needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-[#73BA27] flex items-center justify-center text-xs font-bold font-mono">
                      4
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.88rem] font-bold text-gray-900 uppercase tracking-wide leading-none mb-1 font-bold">
                        Genuine Warranty & After-Sales
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-500 font-normal leading-normal">
                        Avoid fake warranties or untraceable suppliers. Secure continuous, robust, direct manufacturer help desk support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-[#73BA27] flex items-center justify-center text-xs font-bold font-mono">
                      5
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.88rem] font-bold text-gray-900 uppercase tracking-wide leading-none mb-1 font-bold">
                        Design That Elevates
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-500 font-normal leading-normal">
                        Select premium customized cabin aesthetics that blend naturally with your architecture & personal lifestyle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust disclaimer */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                <span className="font-jost text-[0.72rem] font-bold uppercase tracking-wider text-gray-400">
                  Trusted by Hundreds of Happy Property Owners
                </span>
                <span className="w-2 h-2 rounded-full bg-[#73BA27]"></span>
              </div>
            </div>

            {/* Column Right: Spectrum's Uncompromising Standards (6 Grid Columns - matching dark blue flyer) */}
            <div className="lg:col-span-6 bg-[#151922] text-white border-2 border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#73BA27]/8 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#73BA27]/12 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#0172CE]/8 rounded-full blur-[50px] pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
                  <div>
                    <span className="font-mono text-[0.58rem] text-[#73BA27] font-bold uppercase tracking-widest block">
                      SPECTRUM UNCOMPROMISING CONFIG
                    </span>
                    <h4 className="font-jost text-[1.12rem] font-black text-white uppercase tracking-wider mt-1">
                      Our Quality Standards
                    </h4>
                  </div>
                  <div className="w-9 h-9 rounded-xl border border-gray-800 bg-gray-900/50 flex items-center justify-center text-[#73BA27]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Standards bulleted items */}
                <div className="space-y-6">
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#73BA27]/10 flex items-center justify-center text-[#73BA27] border border-[#73BA27]/25 shrink-0 group-hover:bg-[#73BA27]/20 transition-all">
                      <Check className="w-4 h-4 font-black" />
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.92rem] font-bold uppercase tracking-widest text-[#73BA27]">
                        Uncompromised Safety
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-400 font-normal leading-normal mt-0.5">
                        Integrated automatic rescue device, safety locks, and redundancy relays to protect what matters most.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#73BA27]/10 flex items-center justify-center text-[#73BA27] border border-[#73BA27]/25 shrink-0 group-hover:bg-[#73BA27]/20 transition-all">
                      <Check className="w-4 h-4 font-black" />
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.92rem] font-bold uppercase tracking-widest text-white">
                        Smooth & Reliable Ride
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-400 font-normal leading-normal mt-0.5">
                        Advanced gears and premium VVVF controllers engineered for perfectly seamless operation every single time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#73BA27]/10 flex items-center justify-center text-[#73BA27] border border-[#73BA27]/25 shrink-0 group-hover:bg-[#73BA27]/20 transition-all">
                      <Check className="w-4 h-4 font-black" />
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.92rem] font-bold uppercase tracking-widest text-[#0172CE]">
                        Smart Energy Efficiency
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-400 font-normal leading-normal mt-0.5">
                        Intelligent sleep triggers & eco-controllers that save up to 40% operating power and carbon load.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#73BA27]/10 flex items-center justify-center text-[#73BA27] border border-[#73BA27]/25 shrink-0 group-hover:bg-[#73BA27]/20 transition-all">
                      <Check className="w-4 h-4 font-black" />
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.92rem] font-bold uppercase tracking-widest text-white">
                        Quiet & Comfortable Cabin
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-400 font-normal leading-normal mt-0.5">
                        Active acoustical vibration absorbers design for silent decibel operation and comfortable travel cushion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#73BA27]/10 flex items-center justify-center text-[#73BA27] border border-[#73BA27]/25 shrink-0 group-hover:bg-[#73BA27]/20 transition-all">
                      <Check className="w-4 h-4 font-black" />
                    </div>
                    <div>
                      <h4 className="font-jost text-[0.92rem] font-bold uppercase tracking-widest text-[#0172CE]">
                        Built For Every Space
                      </h4>
                      <p className="font-jost text-[0.82rem] text-gray-400 font-normal leading-normal mt-0.5">
                        From compact villa home lifts to spacious commercial complexes, we fit every layout with custom precision.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* bottom badges row representing high compliance */}
              <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap gap-4 items-center">
                <span className="font-mono text-[0.52rem] text-[#73BA27] border border-[#73BA27]/20 bg-[#73BA27]/5 px-2.5 py-1 rounded uppercase tracking-wider">
                  Expert Professional Installation
                </span>
                <span className="font-mono text-[0.52rem] text-[#0172CE] border border-[#0172CE]/20 bg-[#0172CE]/5 px-2.5 py-1 rounded uppercase tracking-wider">
                  On-Time Maintenance Care
                </span>
              </div>
            </div>

          </div>

          {/* Golden/Slate Bento Feature block: "45 DAYS - FAST INSTALLATION & EXCELLENCE HIGHLIGHTS" */}
          <div className="reveal">
            <div className="bg-[#151922] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-gray-800 shadow-2xl">
              
              {/* Backglow element */}
              <div className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#73BA27]/10 to-transparent rounded-full blur-[110px] pointer-events-none" />
              <div className="absolute -bottom-1/4 -left-1/4 w-[300px] h-[300px] bg-[#0172CE]/5 rounded-full blur-[90px] pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left Side: Huge bold "45 DAYS" and Stopwatch graphic layout */}
                <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-gray-800 pb-8 md:pb-0 md:pr-8">
                  
                  {/* "15 Years of Excellence" Premium badge */}
                  <div className="mb-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 px-3.5 py-2 rounded-xl inline-flex flex-col items-center md:items-start select-none">
                    <div className="flex text-amber-400 text-xs tracking-wider gap-0.5 mb-1">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div className="font-jost text-[0.62rem] text-amber-400 font-extrabold uppercase tracking-widest leading-none">
                      15 Years Of Excellence
                    </div>
                  </div>

                  <span className="font-mono text-[#73BA27] text-xs font-black uppercase tracking-[0.2em] block mb-2">
                    FAST TRACK EXECUTION
                  </span>
                  
                  {/* Golden huge 45 Days display */}
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="font-jost text-[4rem] md:text-[5.5rem] font-black leading-none bg-gradient-to-b from-[#ECD79A] via-[#C5A059] to-[#9E7A37] bg-clip-text text-transparent">
                      45
                    </span>
                    <div className="flex flex-col items-start leading-none justify-center">
                      <span className="font-jost text-[1.8rem] md:text-[2.2rem] font-bold tracking-wider text-white">DAYS</span>
                      <span className="font-mono text-gray-500 text-[0.58rem] tracking-widest uppercase">Target delivery</span>
                    </div>
                  </div>

                  <h4 className="font-jost text-[1.12rem] md:text-[1.25rem] font-bold uppercase tracking-wider text-white leading-tight">
                    On-Time. Every Time.
                  </h4>
                  <p className="font-jost text-[0.82rem] text-gray-400 leading-relaxed font-light mt-2 max-w-[280px]">
                    Optimized modular assembly structure delivers active, registered site installation in record speed.
                  </p>
                </div>

                {/* Right Side: 4 Premium Pillars matching the values columns from flyer 1 */}
                <div className="md:col-span-7 col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:pl-4">
                  
                  {/* Pillar 1 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl border border-gray-800 bg-gray-900/60 flex items-center justify-center text-[#73BA27]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-jost text-[0.85rem] font-bold uppercase tracking-widest text-[#73BA27] leading-none mb-1">
                        German Technology
                      </h5>
                      <span className="font-jost text-[0.78rem] text-gray-300 font-medium block font-bold">
                        Smooth. Safe. Reliable.
                      </span>
                      <p className="font-jost text-[0.7rem] text-gray-500 font-normal mt-1 leading-normal">
                        Leverages German-designed elevator modules for precise control safety.
                      </p>
                    </div>
                  </div>

                  {/* Pillar 2 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl border border-gray-800 bg-gray-900/60 flex items-center justify-center text-[#73BA27]">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-jost text-[0.85rem] font-bold uppercase tracking-widest text-white leading-none mb-1 font-bold">
                        Silent Performance
                      </h5>
                      <span className="font-jost text-[0.78rem] text-gray-300 font-medium block font-bold">
                        Comfort in every ride.
                      </span>
                      <p className="font-jost text-[0.7rem] text-gray-500 font-normal mt-1 leading-normal">
                        Advanced VVVF frequency isolation ensures peaceful cabin travel below 45dB.
                      </p>
                    </div>
                  </div>

                  {/* Pillar 3 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl border border-gray-800 bg-gray-900/60 flex items-center justify-center text-[#73BA27]">
                      <Brush className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-jost text-[0.85rem] font-bold uppercase tracking-widest text-[#0172CE] leading-none mb-1 font-bold">
                        Custom Luxury Designs
                      </h5>
                      <span className="font-jost text-[0.78rem] text-gray-300 font-medium block font-bold font-bold">
                        Made to match your home.
                      </span>
                      <p className="font-jost text-[0.7rem] text-gray-500 font-normal mt-1 leading-normal">
                        Bespoke cabins styled in rich timber, gold accents, or panoramic glass structures.
                      </p>
                    </div>
                  </div>

                  {/* Pillar 4 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl border border-gray-800 bg-gray-900/60 flex items-center justify-center text-[#73BA27]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-jost text-[0.85rem] font-bold uppercase tracking-widest text-white leading-none mb-1 font-bold">
                        1 Year Free AMC
                      </h5>
                      <span className="font-jost text-[0.78rem] text-gray-300 font-medium block font-bold">
                        Total peace of mind.
                      </span>
                      <p className="font-jost text-[0.7rem] text-gray-500 font-normal mt-1 leading-normal">
                        Includes twelve full months of comprehensive certified inspection, parts guard, and support line.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Wide action-buttons layout */}
                <div className="col-span-1 md:col-span-12 border-t border-gray-800 pt-8 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="font-mono text-[0.52rem] text-gray-500 uppercase">Interactive fast quotation tracker</span>
                    <span className="font-jost text-xs font-bold uppercase text-white tracking-widest">WANT ACTIVE ON-SITE EXECUTION IN 45 DAYS?</span>
                  </div>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        service: "New Lift Installations",
                        message: "Hi, I noticed your 45-day guaranteed fast delivery challenge. Please consult with me for site readiness planning and structural layout."
                      }));
                      scrollToSection("contact");
                    }}
                    className="w-full sm:w-auto bg-[#73BA27] hover:bg-[#62a31f] text-white px-8 py-3.5 rounded-full font-jost text-[0.82rem] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center font-bold"
                  >
                    Send 45-Day Priority Inquiry
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 7 — TESTIMONIALS */}
      <section id="testimonials" className="py-28 px-6 md:px-12 lg:px-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="reveal mb-16">
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[2px] bg-[#73BA27]"></span>
              <span className="font-jost text-xs font-bold text-[#73BA27] tracking-[0.15em] uppercase">
                TESTIMONIALS
              </span>
            </div>
            <h2 className="font-jost text-3xl md:text-5xl font-semibold text-gray-900">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 md:p-10 relative flex flex-col justify-between h-80 hover:shadow-xl border border-gray-100 transition-all duration-300 rounded-2xl"
              >
                
                {/* High quality quote quote absolute */}
                <div className="font-playfair text-[5.5rem] font-bold italic text-[#73BA27]/10 absolute top-2 right-6 select-none leading-none pointer-events-none">
                  ”
                </div>
                
                {/* Quote text */}
                <p className="font-jost text-[0.95rem] italic text-gray-600 leading-[1.8] font-normal z-10">
                  "{t.text}"
                </p>

                {/* Author footer */}
                <div>
                  <div className="w-[30px] h-[3px] bg-[#73BA27] my-5 rounded-full"></div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-jost text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-gray-900">
                      {t.author}
                    </span>
                    <span className="text-[0.68rem] text-gray-400 font-bold uppercase tracking-wider bg-gray-50 px-2.5 py-1 rounded">
                      {t.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* SECTION 8 — CONTACT */}
      <section id="contact" className="py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column — Contact info details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center reveal">
            
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-8 h-[2px] bg-[#73BA27]"></span>
                <span className="font-jost text-xs font-bold text-gray-800 tracking-[0.15em] uppercase">
                  GET IN TOUCH
                </span>
              </div>
              <h2 className="font-jost text-3xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
                Consult With Our Design Engineers
              </h2>
              <p className="font-jost text-[0.98rem] text-gray-500 leading-[1.8] font-normal max-w-[480px]">
                Have a customized architectural requirement? Let us design an efficient, safe, and space-saving vertical transit plan tailored perfectly to your layout.
              </p>
            </div>

            <div className="space-y-5">
              
              {/* Phone item */}
              <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                <div className="w-9 h-9 shrink-0 border border-[#73BA27]/20 flex items-center justify-center text-[#73BA27] rounded-lg bg-[#73BA27]/5">
                  <Phone className="w-4 h-4 fill-[#73BA27]" />
                </div>
                <div>
                  <div className="font-jost text-[0.68rem] text-gray-400 uppercase font-extrabold tracking-widest mb-1">
                    Phone Response Line
                  </div>
                  <div className="font-jost text-[0.92rem] text-gray-900 font-bold">
                    <a href="tel:8919102440" className="hover:text-[#73BA27] transition-colors inline-block text-[#151922]">
                      +91 89191 02440
                    </a>
                  </div>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                <div className="w-9 h-9 shrink-0 border border-[#0172CE]/20 flex items-center justify-center text-[#0172CE] rounded-lg bg-[#0172CE]/5">
                  <Mail className="w-4 h-4 fill-[#0172CE]" />
                </div>
                <div>
                  <div className="font-jost text-[0.68rem] text-gray-400 uppercase font-extrabold tracking-widest mb-1">
                    Email Correspondence
                  </div>
                  <div className="font-jost text-[0.92rem] text-gray-900 font-bold">
                    <a href="mailto:info@spectrumelevators.com" className="hover:text-[#73BA27] transition-colors underline decoration-[#73BA27]/20 decoration-1 text-[#151922]">
                      info@spectrumelevators.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Head Office item */}
              <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                <div className="w-9 h-9 shrink-0 border border-[#73BA27]/20 flex items-center justify-center text-[#73BA27] rounded-lg bg-[#73BA27]/5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-jost text-[0.68rem] text-gray-400 uppercase font-extrabold tracking-widest mb-1">
                    Head Office
                  </div>
                  <div className="font-jost text-[0.88rem] text-gray-600 font-medium leading-relaxed">
                    H.No 6-3-248/B/1, Dhruv Arcade, 2nd Floor, Road No.1, Banjara Hills, Hyderabad — 500034
                  </div>
                </div>
              </div>

              {/* Branches item */}
              <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                <div className="w-9 h-9 shrink-0 border border-[#0172CE]/20 flex items-center justify-center text-[#0172CE] rounded-lg bg-[#0172CE]/5">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-jost text-[0.68rem] text-gray-400 uppercase font-extrabold tracking-widest mb-1">
                    Branch Offices
                  </div>
                  <div className="font-jost text-[0.88rem] text-gray-600 font-medium">
                    Nanded · Mumbai (Dombivli West)
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column — Contact form */}
          <div className="w-full lg:w-1/2 reveal bg-[#F9F9FB] p-8 md:p-12 border border-gray-100 rounded-3xl shadow-sm">
            <h3 className="font-jost text-[1.4rem] font-bold text-gray-900 mb-6">
              Send An Inquiry
            </h3>
            
            {formSubmitted ? (
              <div className="p-8 border border-[#73BA27]/40 bg-white text-center flex flex-col items-center gap-4 rounded-2xl animate-fadeIn shadow-lg">
                <div className="w-12 h-12 rounded-full border border-[#73BA27] flex items-center justify-center text-[#73BA27] bg-[#73BA27]/5">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-jost text-[1.25rem] font-bold text-gray-900">
                  Inquiry Registered!
                </h4>
                <p className="font-jost text-[0.88rem] text-gray-500 leading-[1.7] max-w-[340px]">
                  Your request has been saved. We are redirecting you to WhatsApp to connect with our design team instantly...
                </p>
                
                {lastSubmittedData && (
                  <div className="w-full mt-4 border-t border-gray-100 pt-4 flex flex-col gap-3">
                    <p className="font-jost text-[0.78rem] text-gray-400">
                      If the automatic redirect did not trigger, tap below:
                    </p>
                    <a 
                      href={`https://wa.me/918919102440?text=${encodeURIComponent(
                        `*Spectrum Elevators Inquiry*\n\n` +
                        `*Name:* ${lastSubmittedData.name}\n` +
                        `*Phone:* ${lastSubmittedData.phone}\n` +
                        `*Service Segment:* ${lastSubmittedData.service}\n` +
                        `*Enquiry details:* ${lastSubmittedData.message || "None provided"}`
                      )}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 transition-all text-white py-3 px-5 rounded-xl font-jost text-[0.82rem] font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(37,211,102,0.25)]"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.012 2C6.485 2 2 6.484 2 12.011c0 1.767.46 3.426 1.267 4.877L2 22l5.244-1.378a9.972 9.972 0 004.768 1.21c5.527 0 10.012-4.485 10.012-10.011C22.024 6.485 17.539 2 12.012 2zm6.056 14.18c-.248.699-1.238 1.353-1.785 1.454-.533.1-1.07.135-2.73-.53-2.15-.86-3.528-3.055-3.636-3.2-.108-.145-.886-1.18-.886-2.252 0-1.072.56-1.597.759-1.812.199-.215.432-.269.576-.269.144 0 .288.003.414.01.134.007.311-.051.488.375.18.435.617 1.503.67 1.61.054.108.09.233.018.376-.072.143-.108.232-.216.357-.108.125-.228.28-.324.376-.11.108-.225.226-.096.446.128.22.568.937 1.22 1.517.842.75 1.554.982 1.776 1.093.222.11.354.093.486-.06.133-.153.568-.662.721-.887.153-.225.306-.18.514-.103.21.077 1.325.625 1.55.736.225.111.375.166.43.262.054.096.054.558-.194 1.258z" />
                      </svg>
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="font-jost text-[0.72rem] font-bold uppercase text-[#73BA27] tracking-wider">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="bg-white border border-gray-200 text-gray-900 font-jost text-[0.88rem] p-3.5 focus:border-[#73BA27] focus:ring-1 focus:ring-[#73BA27] outline-none transition-all rounded-xl placeholder:text-gray-400 shadow-inner"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="font-jost text-[0.72rem] font-bold uppercase text-[#73BA27] tracking-wider">
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="bg-white border border-gray-200 text-gray-900 font-jost text-[0.88rem] p-3.5 focus:border-[#73BA27] focus:ring-1 focus:ring-[#73BA27] outline-none transition-all rounded-xl placeholder:text-gray-400 shadow-inner"
                  />
                </div>

                {/* Service Category */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="service" className="font-jost text-[0.72rem] font-bold uppercase text-[#73BA27] tracking-wider">
                    Required Service
                  </label>
                  <select 
                    id="service" 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="bg-white border border-gray-200 text-gray-900 font-jost text-[0.88rem] p-3.5 focus:border-[#73BA27] focus:ring-1 focus:ring-[#73BA27] outline-none transition-all rounded-xl cursor-pointer"
                  >
                    {services.map((srv, i) => (
                      <option key={i} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="font-jost text-[0.72rem] font-bold uppercase text-[#73BA27] tracking-wider">
                    Message Spec Request
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Explain your visual elevator constraints or custom architectural requirements..."
                    className="bg-white border border-gray-200 text-gray-900 font-jost text-[0.88rem] p-3.5 focus:border-[#73BA27] focus:ring-1 focus:ring-[#73BA27] outline-none transition-all rounded-xl placeholder:text-gray-400 shadow-inner resize-none"
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  className="w-full bg-[#73BA27] text-white py-4 rounded-full font-jost text-[0.82rem] uppercase font-bold tracking-wider hover:bg-[#62a31f] hover:shadow-lg active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-md"
                >
                  Send Inquiry Now
                </button>

              </form>
            )}

          </div>
        </div>
      </section>


      {/* SECTION 9 — FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200/60 pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Column 1 */}
          <div>
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
              className="cursor-pointer select-none mb-4 inline-block animate-pulse-subtle"
            >
              <SpectrumLogo size="large" />
            </div>
            
            <p className="font-jost text-[0.82rem] text-gray-500 leading-[1.8] max-w-[240px]">
              Premium engineering solutions elevating safe design across multi-story landmarks, bespoke penthouses, and logistics complexes since 2009.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h5 className="font-jost text-[0.82rem] uppercase tracking-wider text-gray-900 font-bold mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2">
              {["Home", "About Us", "Products", "Services", "Contact Us"].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => {
                      const targetMap: Record<string, string> = {
                        "home": "hero",
                        "about us": "about",
                        "products": "products",
                        "services": "services",
                        "contact us": "contact"
                      };
                      scrollToSection(targetMap[link.toLowerCase()]);
                    }}
                    className="font-jost text-[0.82rem] text-gray-500 hover:text-[#73BA27] transition-colors text-left font-medium"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h5 className="font-jost text-[0.82rem] uppercase tracking-wider text-gray-900 font-bold mb-4">
              Services Offered
            </h5>
            <ul className="space-y-2">
              {["New Installations", "Controller Tech", "Repair & Maintenance", "Control Modification"].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => scrollToSection("services")}
                    className="font-jost text-[0.82rem] text-gray-500 hover:text-[#73BA27] transition-colors text-left font-medium"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h5 className="font-jost text-[0.82rem] uppercase tracking-wider text-gray-900 font-bold mb-4">
              Branch Offices
            </h5>
            <ul className="space-y-2 font-jost text-[0.82rem] text-gray-500 font-medium">
              <li>Hyderabad HQ (Banjara Hills)</li>
              <li>Nanded Office</li>
              <li>Mumbai Branch (Dombivli W)</li>
            </ul>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-gray-200/60 px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-jost text-[0.78rem] text-gray-400 font-medium">
            © 2026 Spectrum Elevators Private Limited. All Rights Reserved.
          </div>
          <div className="font-jost text-[0.78rem] text-gray-500 font-bold hover:text-[#73BA27] transition-colors">
            <a href="mailto:info@spectrumelevators.com">info@spectrumelevators.com</a>
          </div>
        </div>
      </footer>


      {/* EXTRAS: WhatsApp floating action bubble */}
      <a 
        href="https://wa.me/918919102440?text=Hello%20Spectrum%20Elevators%21" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-transform z-50 cursor-pointer shadow-[0_4px_20px_#25D366]/40"
        aria-label="Contact us on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2C6.485 2 2 6.484 2 12.011c0 1.767.46 3.426 1.267 4.877L2 22l5.244-1.378a9.972 9.972 0 004.768 1.21c5.527 0 10.012-4.485 10.012-10.011C22.024 6.485 17.539 2 12.012 2zm6.056 14.18c-.248.699-1.238 1.353-1.785 1.454-.533.1-1.07.135-2.73-.53-2.15-.86-3.528-3.055-3.636-3.2-.108-.145-.886-1.18-.886-2.252 0-1.072.56-1.597.759-1.812.199-.215.432-.269.576-.269.144 0 .288.003.414.01.134.007.311-.051.488.375.18.435.617 1.503.67 1.61.054.108.09.233.018.376-.072.143-.108.232-.216.357-.108.125-.228.28-.324.376-.11.108-.225.226-.096.446.128.22.568.937 1.22 1.517.842.75 1.554.982 1.776 1.093.222.11.354.093.486-.06.133-.153.568-.662.721-.887.153-.225.306-.18.514-.103.21.077 1.325.625 1.55.736.225.111.375.166.43.262.054.096.054.558-.194 1.258z" />
        </svg>
      </a>

    </div>
  );
}
