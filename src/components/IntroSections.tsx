/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Lobby() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <section 
      id="lobby" 
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden scroll-mt-20"
    >
      {/* Parallax Base Overlays */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        <div className="w-full h-full" />
        
        {/* Animated Grid Overlay (Parallax Layer 2) */}
        <motion.div 
          animate={{ y: [0, -100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(to bottom, #C9A84C 1px, transparent 1px), linear-gradient(to right, #C9A84C 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            y: y2
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-steel-900 via-transparent to-steel-900" />
      </motion.div>

      {/* Structural Shaft Lines (Parallax Layer 3) */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ y: y3 }}
      >
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gold" />
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gold" />
        <div className="absolute left-10 top-0 bottom-0 w-px bg-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]" />
        <div className="absolute right-10 top-0 bottom-0 w-px bg-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-display font-bold text-warm-white tracking-tight mb-4 drop-shadow-2xl">
            SPECTRUM <span className="text-gold italic">ELEVATORS</span>
          </h2>
          <p className="text-xl md:text-2xl font-mono text-gold/80 tracking-widest uppercase mb-12">
            Elevating Spaces. Elevating Lives.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-24 h-24 rounded-full border-2 border-gold flex flex-col items-center justify-center group relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="absolute inset-0 animate-ping border-2 border-gold/30 rounded-full scale-110" />
             <span className="text-gold font-sans font-bold text-xs tracking-tighter">ASCEND</span>
             <motion.div 
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="mt-1"
             >
                <div className="w-1 h-3 bg-gold rounded-full" />
             </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="min-h-screen py-32 flex items-center justify-center bg-steel-800/90 backdrop-blur-sm relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 noise-overlay" />
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="aspect-[4/5] bg-steel-700 rounded-lg overflow-hidden border border-steel-600 relative">
            <img 
              src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2070&auto=format&fit=crop" 
              alt="Elevator Engineering"
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-steel-900 to-transparent">
               <div className="h-px w-12 bg-gold mb-4" />
               <p className="font-mono text-gold text-sm tracking-widest uppercase mb-1">Precision Engineering</p>
               <h3 className="text-2xl font-display text-warm-white">Engineered for Excellence</h3>
            </div>
          </div>
          {/* Ornamental detail */}
          <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold/40 rounded-tr-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Floor 01 // Brand Legacy</span>
          <h2 className="text-4xl md:text-5xl font-display text-warm-white mb-8">Redefining Vertical <span className="italic">Mobility</span></h2>
          <p className="text-warm-white/70 text-lg mb-8 leading-relaxed">
            Since our inception, Spectrum Elevators has been at the forefront of elevator technology. We don't just build systems; we curate experiences that seamlessly connect people with their environments. Every installation is a testament to our commitment to safety, luxury, and German-engineered precision.
          </p>

          <div className="grid grid-cols-2 gap-8">
            {[
              { val: "500+", label: "Installations" },
              { val: "20+", label: "Years of Trust" },
              { val: "15", label: "Cities Reached" },
              { val: "99%", label: "System Uptime" }
            ].map((stat, i) => (
              <div key={i} className="border-l-2 border-gold/30 pl-4">
                <div className="text-3xl font-display text-gold font-bold">{stat.val}</div>
                <div className="text-xs font-mono text-warm-white/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
