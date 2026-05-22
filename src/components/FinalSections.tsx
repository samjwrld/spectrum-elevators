/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Zap, Activity, Settings, Clock, Star, Mail, Phone, MapPin, Send, Camera, CameraOff, RotateCcw, CameraIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function WhyUs() {
  const features = [
    { icon: <ShieldCheck />, title: "German Technology", desc: "Built with precision engineering and global safety standards." },
    { icon: <Zap />, title: "Energy Efficient", desc: "Smart PMSM drives that reduce power consumption by up to 40%." },
    { icon: <Activity />, title: "Smooth & Silent", desc: "Advanced suspension systems for a vibration-free vertical journey." },
    { icon: <Settings />, title: "Custom Cabins", desc: "Choose from 100+ finishes, from brushed steel to exotic woods." },
    { icon: <Clock />, title: "24/7 AMC Support", desc: "Dedicated maintenance teams ensuring 99.9% system uptime." },
    { icon: <ShieldCheck />, title: "ISO Certified", desc: "Rigorous quality control and periodic safety audits." }
  ];

  return (
    <section id="features" className="py-32 bg-steel-900/95 backdrop-blur-sm border-y border-steel-800 relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="font-sans text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Floor 04 // Engineering Edge</span>
          <h2 className="text-4xl md:text-5xl font-display text-warm-white">The Spectrum <span className="italic">Standard</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-6 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded bg-steel-800 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-steel-900 transition-colors">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-display text-warm-white mb-2 group-hover:text-gold transition-colors">{f.title}</h3>
                <p className="text-sm text-warm-white/50 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const reviews = [
    { name: "Johnathan Vane", role: "CEO, Vane Real Estate", text: "The panoramic elevators installed by Spectrum have become the highlight of our headquarters. Pure luxury.", rate: 5 },
    { name: "Sarah Chen", role: "MD, Zenith Hospitals", text: "Reliability is non-negotiable in healthcare. Spectrum's bed elevators are incredibly smooth and quiet.", rate: 5 },
    { name: "Elias Schmidt", role: "Architect, Urban Studio", text: "Working with their design team was a dream. They customized the cabin to match our brutalist vision perfectly.", rate: 5 }
  ];

  return (
    <section id="testimonials" className="py-32 bg-steel-800/90 backdrop-blur-sm relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <span className="font-sans text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Floor 05 // Trust Markers</span>
          <h2 className="text-4xl md:text-5xl font-display text-warm-white">Voices of <span className="italic">Elevated</span> Spaces</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-lg glass-card relative"
            >
               <div className="flex gap-1 mb-6">
                 {[...Array(r.rate)].map((_, i) => <Star key={i} className="w-3 h-3 fill-gold text-gold" />)}
               </div>
               <p className="text-warm-white/80 italic mb-8">"{r.text}"</p>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-steel-700 border border-gold/20 flex items-center justify-center font-display text-gold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-warm-white uppercase tracking-wider">{r.name}</h4>
                    <p className="text-[10px] font-mono text-warm-white/40">{r.role}</p>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/png"));
        stopCamera();
      }
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <section id="contact" className="py-32 bg-steel-900/95 backdrop-blur-sm relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="font-sans text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Floor 06 // The Penthouse</span>
            <h2 className="text-4xl md:text-5xl font-display text-warm-white mb-8">Begin Your <span className="italic">Journey</span></h2>
            <p className="text-warm-white/60 mb-12 max-w-md">Our specialist team is ready to assist you with technical consultations and custom design proposals.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded bg-steel-800 flex items-center justify-center text-gold border border-gold/20"><MapPin className="w-5 h-5"/></div>
                 <div>
                    <h4 className="font-sans font-bold text-warm-white uppercase">Headquarters</h4>
                    <p className="text-warm-white/40 text-sm">Industrial Estate Phase II, Skyline Business Park, Munich, Germany</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded bg-steel-800 flex items-center justify-center text-gold border border-gold/20"><Phone className="w-5 h-5"/></div>
                 <div>
                    <h4 className="font-sans font-bold text-warm-white uppercase">Direct Line</h4>
                    <p className="text-warm-white/40 text-sm">+49 (0) 89 234 567 89</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded bg-steel-800 flex items-center justify-center text-gold border border-gold/20"><Mail className="w-5 h-5"/></div>
                 <div>
                    <h4 className="font-sans font-bold text-warm-white uppercase">Inquiries</h4>
                    <p className="text-warm-white/40 text-sm">precision@spectrumelevators.com</p>
                 </div>
              </div>

              {/* Project Preview Frame */}
              <div className="pt-12">
                <h4 className="text-gold font-sans font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                   Project Preview <div className="h-px flex-grow bg-gold/20" />
                </h4>
                <div className="aspect-video w-full max-w-md border-2 border-dashed border-steel-700 bg-steel-800/50 rounded-lg flex items-center justify-center relative overflow-hidden group">
                  {capturedImage ? (
                    <>
                      <img src={capturedImage} alt="Site capture" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-steel-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => setCapturedImage(null)}
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-200 p-2 rounded-full border border-red-500/30 transition-colors"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8">
                       <CameraIcon className="w-12 h-12 text-steel-600 mx-auto mb-4" />
                       <p className="text-warm-white/30 text-xs font-mono uppercase tracking-tighter">Capture your building site for a personalized proposal</p>
                    </div>
                  )}
                  {/* Decorative Frame Overlays */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold/40" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold/40" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold/40" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold/40" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-10 rounded-lg bg-steel-800 border border-steel-700 brushed-metal shadow-2xl relative"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-warm-white/40 uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full bg-steel-900 border border-steel-600 rounded p-3 text-sm focus:border-gold outline-none transition-colors" placeholder="e.g. Victor Vane" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-mono text-warm-white/40 uppercase tracking-widest">Phone Number</label>
                   <input type="tel" className="w-full bg-steel-900 border border-steel-600 rounded p-3 text-sm focus:border-gold outline-none transition-colors" placeholder="+1 234..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-warm-white/40 uppercase tracking-widest">Elevator Type</label>
                <select className="w-full bg-steel-900 border border-steel-600 rounded p-3 text-sm focus:border-gold outline-none transition-colors">
                  <option>Select Option</option>
                  <option>Passenger Elevator</option>
                  <option>Panoramic Glass</option>
                  <option>Residential Lift</option>
                  <option>Freight / Goods</option>
                </select>
              </div>

              {/* Site Photo Capture CTA */}
              <div className="space-y-2">
                 <label className="text-[10px] font-mono text-warm-white/40 uppercase tracking-widest block mb-2">Visual Assessment (Optional)</label>
                 {!isCameraOpen ? (
                   <button 
                     type="button"
                     onClick={startCamera}
                     className="flex items-center gap-3 px-4 py-3 bg-steel-900 border border-steel-700 rounded text-gold text-xs font-mono hover:bg-steel-700 hover:border-gold/30 transition-all w-full"
                   >
                     <Camera className="w-4 h-4" /> 
                     {capturedImage ? "RETAKE SITE PHOTO" : "USE CAMERA FOR SITE CAPTURE"}
                   </button>
                 ) : (
                   <div className="relative rounded overflow-hidden border border-gold/30 shadow-inner bg-black">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="w-full h-auto aspect-video object-cover" 
                      />
                      <div className="absolute inset-0 border-[10px] border-black/20 pointer-events-none" />
                      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-4">
                        <button 
                          type="button"
                          onClick={capturePhoto}
                          className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                        >
                           <div className="w-4 h-4 bg-steel-900 rounded-sm" />
                        </button>
                        <button 
                          type="button"
                          onClick={stopCamera}
                          className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        >
                           <CameraOff className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <canvas ref={canvasRef} className="hidden" />
                   </div>
                 )}
                 {cameraError && <p className="text-red-400 text-[10px] mt-1 italic">{cameraError}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-warm-white/40 uppercase tracking-widest">Your Message</label>
                <textarea rows={4} className="w-full bg-steel-900 border border-steel-600 rounded p-3 text-sm focus:border-gold outline-none transition-colors" placeholder="Project details..."></textarea>
              </div>

              <button 
                type="button" 
                className="w-full py-4 bg-gold text-steel-900 font-sans font-bold flex items-center justify-center gap-2 rounded transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(201,168,76,0.2)]"
              >
                REQUEST CALL <Send className="w-4 h-4"/>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
