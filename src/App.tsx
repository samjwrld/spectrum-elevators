/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { DoorOverlay } from "./components/DoorOverlay";
import { FloorIndicator } from "./components/FloorIndicator";
import { Navigation } from "./components/Navigation";
import { Lobby, About } from "./components/IntroSections";
import { Products, Projects } from "./components/ProductSections";
import { WhyUs, Testimonials, Contact } from "./components/FinalSections";
import { SECTIONS } from "./types";
import { motion, useScroll, useSpring, useTransform, useVelocity, AnimatePresence } from "motion/react";

export default function App() {
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | 'idle'>('idle');
  const [isScrolling, setIsScrolling] = useState(false);
  const isManualScrolling = useRef(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Simulated Elevator Data
  const altitude = useTransform(scrollYProgress, [0, 1], [0, 48]); // 48 meters total height (approx 8m per floor)
  const velocityValue = useTransform(scrollVelocity, (v) => Math.abs(v * 20)); // Adjusted scale for m/s
  const smoothVelocity = useSpring(velocityValue, { damping: 50, stiffness: 200 });
  const jitterValue = useTransform(smoothVelocity, [0, 2], [0, 1.5]); // Jitter intensity in pixels
  const smoothJitter = useSpring(jitterValue, { damping: 10, stiffness: 500 });

  const blurValue = useTransform(scrollVelocity, [-0.05, 0, 0.05], [5, 0, 5]);
  const smoothBlur = useSpring(blurValue, { damping: 50, stiffness: 300 });
  const blurFilter = useTransform(smoothBlur, (v) => `blur(${v}px)`);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        setDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setDirection('up');
      }
      
      setIsScrolling(true);
      lastScrollY.current = currentScrollY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        setDirection('idle');
        isManualScrolling.current = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0% -45% 0%",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = SECTIONS.findIndex((s) => s.id === entry.target.id);
          if (index !== -1) {
            setCurrentFloorIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [floorHistory, setFloorHistory] = useState<string[]>([]);
  const [isCabinView, setIsCabinView] = useState(false);

  useEffect(() => {
    const currentFloor = SECTIONS[currentFloorIndex].floor;
    setFloorHistory(prev => {
      if (prev[0] === currentFloor) return prev;
      return [currentFloor, ...prev].slice(0, 3);
    });
  }, [currentFloorIndex]);

  // Simple flicker effect handler
  const [flicker, setFlicker] = useState(false);
  useEffect(() => {
    setFlicker(true);
    const timer = setTimeout(() => setFlicker(false), 500);
    return () => clearTimeout(timer);
  }, [currentFloorIndex]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Elevator Interior Environment (Flicker affects these) */}
      <div className={flicker ? 'animate-floor-flicker' : ''}>
        {/* Background Elevator Shaft Video */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ scale: backgroundScale }}
            className="w-full h-full"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover opacity-20 grayscale brightness-50"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-moving-up-an-elevator-shaft-34988-large.mp4" type="video/mp4" />
            </video>
          </motion.div>
          
          {/* Cinematic Motion Blur Overlay */}
          <motion.div 
            style={{ backdropFilter: blurFilter }}
            className="absolute inset-0 z-10"
          />
          
          {/* Vignette & Depth Shadow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-20" />
        </div>

        {/* Hero & Sections with mechanical vibration during scroll */}
        <main className={`relative z-20 ${isScrolling ? 'animate-rumble' : ''}`}>
          <Lobby />
          <About />
          <Products />
          <Projects />
          <WhyUs />
          <Testimonials />
          <Contact />
        </main>
        
        {/* Footer / Penthouse Exit Concept */}
        <footer className="py-24 bg-steel-900 border-t border-steel-800 text-center relative overflow-hidden z-10">
          <div className="absolute inset-0 opacity-10 brushed-metal-dark" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="w-16 h-16 rounded border-2 border-gold flex items-center justify-center bg-steel-800 mx-auto mb-8 shadow-2xl">
              <span className="text-gold font-sans font-bold text-2xl">S</span>
            </div>
            <h3 className="text-2xl font-display text-gold mb-4 uppercase tracking-[0.4em]">Vertical Precision</h3>
            <p className="text-warm-white/40 font-mono text-xs tracking-widest uppercase max-w-md mx-auto leading-relaxed">
              Spectrum Elevators GmbH // Industrial Estate Phase II, Skyline Business Park, Munich, Germany
            </p>
            <div className="mt-12 pt-12 border-t border-steel-800 flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-[10px] font-mono text-warm-white/20 uppercase">© 2026 ARCHITECTURAL VERTICAL SOLUTIONS</p>
               <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-warm-white/40">
                  <a href="#" className="hover:text-gold transition-colors">Privacy</a>
                  <a href="#" className="hover:text-gold transition-colors">Safety</a>
                  <a href="#" className="hover:text-gold transition-colors">Support</a>
               </div>
            </div>
          </div>
        </footer>
      </div>

      {/* STABLE UI LAYER (Outside flicker to preserve fixed positioning) */}
      
      {/* Screen/HUD Effects */}
      <div className="fixed inset-0 pointer-events-none z-[5000] overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>
      <div className="fixed inset-0 pointer-events-none noise-overlay z-[50]" />
      
      <DoorOverlay isClosing={isExiting} />
      
      {/* Cabin Interior Graphical Overlay */}
      <AnimatePresence>
        {isCabinView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] pointer-events-none overflow-hidden"
          >
            {/* Structural Walls */}
            <div className="absolute inset-y-0 left-0 w-[15%] bg-steel-900 shadow-[20px_0_100px_rgba(0,0,0,0.9)] border-r border-steel-800 brushed-metal-dark" />
            <div className="absolute inset-y-0 right-0 w-[15%] bg-steel-900 shadow-[-20px_0_100px_rgba(0,0,0,0.9)] border-l border-steel-800 brushed-metal-dark" />
            
            {/* Ceiling & Floor Paneling */}
            <div className="absolute top-0 inset-x-0 h-[10%] bg-steel-900 border-b border-steel-800 brushed-metal-dark shadow-[0_20px_100px_rgba(0,0,0,0.9)]" />
            <div className="absolute bottom-0 inset-x-0 h-[10%] bg-steel-900 border-t border-steel-800 brushed-metal-dark shadow-[0_-20px_100px_rgba(0,0,0,0.9)]" />
            
            {/* Corner Pillars */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-steel-800 rounded-br-[100px] border-r border-b border-steel-700 shadow-2xl opacity-50" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-steel-800 rounded-bl-[100px] border-l border-b border-steel-700 shadow-2xl opacity-50" />
            
            {/* Center Focus Shadow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
            
            {/* Cabin View Tag */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-steel-900/80 border border-steel-700 px-6 py-2 rounded-full backdrop-blur-xl">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
               <span className="text-[10px] font-mono text-warm-white font-bold tracking-[0.4em] uppercase whitespace-nowrap">Cabin Interior HUD // Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Architectural Frame (Transparent center) */}
      <motion.div 
        style={{ x: useTransform(smoothJitter, [0, 2], [0, 1]), y: useTransform(smoothJitter, [0, 2], [0, 1]) }}
        animate={{ opacity: isCabinView ? 0 : 1 }}
        className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-6 bg-steel-800 brushed-metal border-b border-steel-700 shadow-md">
           <div className="absolute top-2 left-4 rivet" />
           <div className="absolute top-2 right-4 rivet" />
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-12 bg-steel-900 border-b-2 border-x-2 border-steel-700 rounded-b-xl flex items-center justify-center gap-4 px-4 overflow-hidden z-[85]">
              <div className="flex gap-1">
                 <div className={`w-1.5 h-1.5 rounded-full ${direction === 'up' ? 'bg-gold shadow-[0_0_5px_#C9A84C]' : 'bg-steel-800'}`} />
                 <div className={`w-1.5 h-1.5 rounded-full ${direction === 'down' ? 'bg-gold shadow-[0_0_5px_#C9A84C]' : 'bg-steel-800'}`} />
              </div>
              <span className="text-gold font-sans font-bold text-lg tracking-widest uppercase truncate max-w-[150px] drop-shadow-md">
                {SECTIONS[currentFloorIndex].label}
              </span>
           </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-6 bg-steel-800 brushed-metal border-t border-steel-700 shadow-md">
           <div className="absolute bottom-2 left-4 rivet" />
           <div className="absolute bottom-2 right-4 rivet" />
        </div>
        <div className="absolute inset-y-0 left-0 w-6 bg-steel-800 brushed-metal border-r border-steel-700">
           {/* Left Shaft Light Strip */}
           <motion.div 
             className="absolute right-1 top-0 bottom-0 w-[2px] bg-gold/20 origin-top"
             style={{ scaleY: scrollYProgress }}
           />
           <motion.div 
             className="absolute right-1 top-0 bottom-0 w-[2px] bg-gold origin-top blur-[3px] shadow-[0_0_15px_#C9A84C]"
             style={{ scaleY: scrollYProgress }}
           />
        </div>
        <div className="absolute inset-y-0 right-0 w-6 bg-steel-800 brushed-metal border-l border-steel-700">
           {/* Right Shaft Light Strip */}
           <motion.div 
             className="absolute left-1 top-0 bottom-0 w-[2px] bg-gold/20 origin-top"
             style={{ scaleY: scrollYProgress }}
           />
           <motion.div 
             className="absolute left-1 top-0 bottom-0 w-[2px] bg-gold origin-top blur-[3px] shadow-[0_0_15px_#C9A84C]"
             style={{ scaleY: scrollYProgress }}
           />
        </div>
        <div className="absolute inset-6 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] opacity-50" />
      </motion.div>

      {/* UI Elements */}
      <Navigation 
        currentFloorIndex={currentFloorIndex} 
        isCabinView={isCabinView} 
        setIsCabinView={setIsCabinView} 
        onManualScroll={() => {
          isManualScrolling.current = true;
          setTimeout(() => { if (!isScrolling) isManualScrolling.current = false; }, 1000);
        }}
      />
      <FloorIndicator 
        currentFloorIndex={currentFloorIndex} 
        direction={direction} 
        history={floorHistory.slice(1)} 
        altitude={altitude}
        velocity={smoothVelocity}
        jitter={smoothJitter}
        isCabinView={isCabinView}
        onManualScroll={() => {
          isManualScrolling.current = true;
          setTimeout(() => { if (!isScrolling) isManualScrolling.current = false; }, 1000);
        }}
      />
      
      {/* Progress Bar (Hidden top of navigation) */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-0.5 bg-gold origin-left z-[510] transform-gpu translate-z-0"
        style={{ scaleX }}
      />


      {/* Exit Trigger Background (Optional visual) */}
      <div className="fixed bottom-10 right-10 z-50">
         <button 
           onClick={() => {
              setIsExiting(true);
              setTimeout(() => setIsExiting(false), 2000);
           }}
           className="w-12 h-12 rounded-full border border-gold/20 bg-steel-900/50 backdrop-blur flex items-center justify-center text-gold hover:bg-gold hover:text-steel-900 transition-all opacity-20 hover:opacity-100"
           title="Test Door Close"
         >
           <div className="w-4 h-4 border-2 border-current rounded-sm" />
         </button>
      </div>
    </div>
  );
}

