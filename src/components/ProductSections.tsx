/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ELEVATOR_TYPES } from "../types";
import { ArrowUpRight } from "lucide-react";

export function Products() {
  return (
    <section id="products" className="py-32 bg-steel-900/95 backdrop-blur-sm relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="font-sans text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Floor 02 // Core Systems</span>
          <h2 className="text-4xl md:text-5xl font-display text-warm-white">The Spectrum <span className="italic">Collection</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ELEVATOR_TYPES.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[500px] overflow-hidden rounded-lg glass-card"
            >
              {/* Product Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={`https://images.unsplash.com/photo-${idx === 0 ? '1540648639573-8c848de23f0a' : idx === 1 ? '1600585154340-be6161a56a0c' : idx === 2 ? '1512917774080-9991f1c4c750' : '1504384308090-c894fdcc538d'}?q=80&w=800&auto=format&fit=crop`}
                  alt={product.title}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-900 via-transparent to-transparent" />
              </div>

              {/* Elevator Doors Overlay (Closed by default) */}
              <div className="absolute inset-0 z-20 flex">
                <div className="h-full w-1/2 bg-steel-800 border-r border-gold/20 group-hover:-translate-x-full transition-transform duration-700 ease-in-out brushed-metal shadow-xl origin-left" />
                <div className="h-full w-1/2 bg-steel-800 border-l border-gold/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out brushed-metal shadow-xl origin-right" />
              </div>

              {/* Product Content (Revealed inside) */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                <h3 className="text-2xl font-display text-warm-white mb-2">{product.title}</h3>
                <p className="text-sm text-warm-white/60 mb-4 h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-col gap-1 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full" />
                      <span className="text-[10px] font-mono text-gold uppercase tracking-tighter">{spec}</span>
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-xs font-mono text-gold uppercase tracking-widest hover:translate-x-2 transition-transform">
                  Explore Details <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              {/* Decorative Label (Visible when closed) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group-hover:opacity-0 transition-opacity duration-500 text-center pointer-events-none">
                 <div className="w-16 h-1 bg-gold/40 mx-auto mb-4" />
                 <span className="text-xl font-display text-gold tracking-widest uppercase">TYPE {idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { name: "The Zenith Tower", location: "Dubai, UAE", category: "Commercial", img: "https://images.unsplash.com/photo-1545670723-196ed09c5886?q=80&w=800" },
  { name: "Aurora Heights", location: "Mumbai, IND", category: "Residential", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
  { name: "Metropolitan Plaza", location: "Berlin, GER", category: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
  { name: "Oracle Gardens", location: "London, UK", category: "Residential", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800" },
];

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-steel-800/90 backdrop-blur-sm relative overflow-hidden scroll-mt-20">
       <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="font-sans text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Floor 03 // Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-display text-warm-white">Defining Global <span className="italic">Skylines</span></h2>
          </div>
          <button className="text-gold font-mono text-sm tracking-widest border-b border-gold/40 pb-2 hover:border-gold transition-colors">VIEW ALL PROJECTS</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden rounded border border-steel-700 bg-steel-900 relative">
                <img 
                  src={project.img} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-900 via-transparent to-transparent opacity-60" />
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                   <span className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.2em]">{project.category}</span>
                   <h3 className="text-2xl font-display text-warm-white mt-1 group-hover:text-gold transition-colors">{project.name}</h3>
                   <p className="text-sm font-mono text-warm-white/40">{project.location}</p>
                </div>
                <div className="w-12 h-px bg-steel-700 group-hover:w-20 group-hover:bg-gold transition-all mt-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
