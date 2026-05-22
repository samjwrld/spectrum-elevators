/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, MotionValue, useTransform } from "motion/react";
import { SECTIONS } from "../types";
import { ChevronUp, ChevronDown, Activity, Cpu, Gauge } from "lucide-react";

interface FloorIndicatorProps {
  currentFloorIndex: number;
  direction: 'up' | 'down' | 'idle';
  history: string[];
  altitude: MotionValue<number>;
  velocity: MotionValue<number>;
  jitter: MotionValue<number>;
  isCabinView: boolean;
  onManualScroll?: () => void;
}

export function FloorIndicator({ currentFloorIndex, direction, history, altitude, velocity, jitter, isCabinView, onManualScroll }: FloorIndicatorProps) {
  const currentSection = SECTIONS[currentFloorIndex];
  
  // Formatters for HUD data
  const altText = useTransform(altitude, (v) => v.toFixed(1));
  const velText = useTransform(velocity, (v) => v.toFixed(2));
  
  const jitterX = useTransform(jitter, (v) => (v * (Math.random() - 0.5)));
  const jitterY = useTransform(jitter, (v) => (v * (Math.random() - 0.5)));

  return (
    <motion.div 
      style={{ x: jitterX, y: jitterY }}
      animate={{ 
        left: isCabinView ? "50%" : "24px",
        x: isCabinView ? "-50%" : 0, 
        scale: isCabinView ? 1.2 : 1 
      }}
      className={`fixed top-1/2 -translate-y-1/2 z-[150] transition-all duration-700 ease-in-out ${
        isCabinView ? "flex" : "hidden lg:flex"
      } flex-col items-center gap-6`}
    >
      {/* HUD System Status */}
      <div className={`flex items-start gap-4 ${isCabinView ? "flex-row" : "flex-col"}`}>
        {/* Altitude & Velocity Display */}
        <div className={`bg-steel-900/90 border border-steel-700/50 backdrop-blur p-3 rounded shadow-2xl space-y-3 w-32 relative overflow-hidden group ${isCabinView ? "mt-4" : ""}`}>
           <div className="absolute inset-0 bg-gradient-to-br from-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono text-steel-500 uppercase tracking-widest">Alt // z</span>
              <Activity className="w-2 h-2 text-gold animate-pulse" />
           </div>
           <div className="flex items-baseline gap-1">
              <motion.span className="text-xl font-mono text-gold font-bold tabular-nums">
                {altText}
              </motion.span>
              <span className="text-[10px] font-mono text-gold/50 uppercase">m</span>
           </div>
           <div className="h-px bg-steel-800" />
           <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono text-steel-500 uppercase tracking-widest">Vel // v</span>
              <Gauge className="w-2 h-2 text-gold" />
           </div>
           <div className="flex items-baseline gap-1">
              <motion.span className="text-xl font-mono text-gold font-bold tabular-nums">
                {velText}
              </motion.span>
              <span className="text-[10px] font-mono text-gold/50 uppercase">m/s</span>
           </div>
           {/* Scanline overlay */}
           <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(transparent,transparent_1px,rgba(255,255,255,1)_2px)]" />
        </div>

        {/* Real-time Floor Display Panel (Mechanical Display) */}
        <div className={`w-32 h-44 bg-steel-900 border-x-4 border-y-2 border-steel-700 rounded-lg p-2 flex flex-col items-center justify-between relative overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] ${isCabinView ? "scale-110 shadow-gold/10" : ""}`}>
          <div className="absolute inset-0 noise-overlay opacity-20" />
          
          {/* Top Rivets */}
          <div className="absolute top-1 left-1 rivet opacity-50" />
          <div className="absolute top-1 right-1 rivet opacity-50" />
          
          <div className="flex flex-col items-center pt-2 relative z-10">
            {/* Floor History Stack */}
            <div className="flex flex-col-reverse items-center gap-0.5 h-10 mb-2">
              {history.map((h, i) => (
                 <motion.span 
                   key={`${h}-${i}`}
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 0.3 - (i * 0.1), y: 0 }}
                   className="text-[10px] font-mono text-steel-400 font-bold leading-none"
                 >
                   {h}
                 </motion.span>
              ))}
            </div>

            <ChevronUp 
              className={`w-6 h-6 transition-all duration-300 ${
                direction === 'up' ? "text-gold drop-shadow-[0_0_12px_#C9A84C]" : "text-steel-800"
              }`} 
            />
          </div>
          
          <div className="relative h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection.floor}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
                transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                className="text-6xl font-sans font-bold text-gold drop-shadow-[0_0_15px_rgba(201,168,76,0.4)]"
              >
                {currentSection.floor}
              </motion.div>
            </AnimatePresence>
            {/* Scanline effect */}
            <div className="absolute inset-x-0 h-1 bg-gold/10 animate-pulse top-1/2" />
          </div>

          <div className="flex flex-col items-center gap-1 pb-2 relative z-10">
            <ChevronDown 
              className={`w-6 h-6 transition-all duration-300 ${
                direction === 'down' ? "text-gold drop-shadow-[0_0_12px_#C9A84C]" : "text-steel-800"
              }`} 
            />
          </div>

          {/* Bottom Rivets */}
          <div className="absolute bottom-1 left-1 rivet opacity-50" />
          <div className="absolute bottom-1 right-1 rivet opacity-50" />
        </div>

        {/* System Diagnostics */}
        <div className={`w-32 bg-steel-900/80 border border-steel-700/50 p-2 rounded flex items-center justify-between ${isCabinView ? "mt-4" : ""}`}>
           <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-gold/40" />
              <span className="text-[7px] font-mono text-steel-500 uppercase tracking-tighter">System Status</span>
           </div>
           <div className="flex items-center gap-1">
              <span className="text-[7px] font-mono text-gold uppercase animate-pulse">Ready</span>
              <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_5px_green]" />
           </div>
        </div>
      </div>

      {/* Mini Label */}
      <div className={`bg-steel-800/80 px-3 py-1.5 border border-steel-700/50 rounded text-[10px] font-mono text-gold uppercase tracking-[0.3em] whitespace-nowrap backdrop-blur-sm ${isCabinView ? "text-xs px-6" : ""}`}>
        {currentSection.label}
      </div>

      {/* Progress Dots / Floor Selection Rail */}
      <div className={`flex gap-4 p-2 bg-steel-900/40 rounded-full border border-steel-700/30 ${isCabinView ? "flex-row mt-4" : "flex-col"}`}>
        {SECTIONS.map((section, idx) => (
          <div
            key={section.id}
            className={`rounded-full transition-all duration-700 ${
              isCabinView ? "w-10 h-10 flex items-center justify-center text-[10px] font-bold border border-steel-700/50 shadow-inner" : "w-1.5"
            } ${
              idx === currentFloorIndex 
                ? (isCabinView 
                    ? "bg-gold text-steel-900 border-gold shadow-[0_0_15px_#C9A84C]" 
                    : "bg-gold h-10 shadow-[0_0_15px_#C9A84C] relative after:absolute after:inset-y-0 after:-right-4 after:w-1 after:bg-gold/40 after:rounded-full")
                : (isCabinView
                    ? "bg-steel-800 text-gold/40 hover:bg-steel-700 cursor-pointer"
                    : "bg-steel-700 h-4 hover:bg-steel-600 cursor-pointer")
            }`}
            onClick={() => {
              onManualScroll?.();
              const el = document.getElementById(section.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {isCabinView && section.floor}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
