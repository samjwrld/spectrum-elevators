/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Hexagon, Layout } from "lucide-react";
import { SECTIONS } from "../types";

interface NavigationProps {
  currentFloorIndex: number;
  isCabinView: boolean;
  setIsCabinView: (val: boolean) => void;
  onManualScroll?: () => void;
}

export function Navigation({ currentFloorIndex, isCabinView, setIsCabinView, onManualScroll }: NavigationProps) {
  const scrollToSection = (id: string) => {
    onManualScroll?.();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 w-full h-20 z-[500] px-6 lg:px-12 flex items-center justify-between border-b border-steel-700 bg-steel-900/98 backdrop-blur-md"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded border-2 border-gold flex items-center justify-center bg-steel-800">
            <span className="text-gold font-sans font-bold text-xl">S</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-display tracking-wider text-warm-white font-bold leading-none">SPECTRUM</h1>
            <p className="text-[10px] text-gold/80 font-mono tracking-[0.2em] uppercase">Elevators</p>
          </div>
        </div>

        {/* Cabin View Toggle */}
        <button 
          onClick={() => setIsCabinView(!isCabinView)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all ${
            isCabinView 
              ? "bg-gold text-steel-900 border-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]" 
              : "bg-steel-800 text-gold/60 border-steel-700 hover:text-gold hover:border-gold"
          }`}
        >
          {isCabinView ? <Hexagon className="w-4 h-4 fill-current" /> : <Layout className="w-4 h-4" />}
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
            {isCabinView ? "Interior Active" : "Cabin View"}
          </span>
        </button>
      </div>

      {/* Control Panel style buttons */}
      <div className="hidden md:flex items-center gap-2 lg:gap-4 px-6 py-2 rounded-full border border-steel-700 bg-steel-800/50 brushed-metal shadow-inner">
        {SECTIONS.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative group flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-150 active:scale-90 active:translate-y-0.5 ${
              idx === currentFloorIndex 
                ? "bg-gold text-steel-900 shadow-[0_0_15px_rgba(201,168,76,0.5),inset_0_-2px_0_rgba(0,0,0,0.2)]" 
                : "text-gold hover:bg-steel-700 bg-steel-900 border border-steel-700/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.3)]"
            }`}
          >
            <span className="font-sans font-bold text-sm leading-none">{section.floor}</span>
            {/* Illuminated ring when active */}
            {idx === currentFloorIndex && (
              <div className="absolute inset-0 rounded-full animate-pulse border-2 border-gold/40 scale-110" />
            )}
            {/* Tooltip */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-steel-900 border border-steel-700 border-b-2 rounded text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[70]">
              {section.label}
            </div>
          </button>
        ))}
      </div>

      <button className="px-6 py-2 border border-gold text-gold font-sans font-bold text-sm tracking-wide rounded hover:bg-gold hover:text-steel-900 transition-colors">
        GET A QUOTE
      </button>

      {/* Mobile Indicator Toggle or something could go here, but prompt asked for bottom bar in mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-steel-800 border-t border-steel-700 flex items-center justify-around z-[500]">
         {SECTIONS.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-8 h-8 rounded-full font-sans font-bold text-xs ${
              idx === currentFloorIndex ? "bg-gold text-steel-900" : "text-gold bg-steel-900/50"
            }`}
          >
            {section.floor}
          </button>
        ))}
      </div>
    </nav>
  );
}
