/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface DoorOverlayProps {
  isClosing?: boolean;
}

export function DoorOverlay({ isClosing = false }: DoorOverlayProps) {
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isClosing) {
      // Close doors with "thud" overshoot
      gsap.to(leftDoorRef.current, {
        x: "0%",
        duration: 0.8,
        ease: "back.out(1.2)", // Small overshoot for the "thud" feel
      });
      gsap.to(rightDoorRef.current, {
        x: "0%",
        duration: 0.8,
        ease: "back.out(1.2)",
      });
    } else {
      // Open doors
      gsap.to(leftDoorRef.current, {
        x: "-100%",
        duration: 1.2,
        ease: "power2.inOut",
        delay: 0.2
      });
      gsap.to(rightDoorRef.current, {
        x: "100%",
        duration: 1.2,
        ease: "power2.inOut",
        delay: 0.2
      });
    }
  }, [isClosing]);

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex overflow-hidden">
      {/* Left Door */}
      <div
        ref={leftDoorRef}
        className="h-full w-1/2 bg-steel-800 border-r border-gold/30 brushed-metal origin-left relative flex justify-end items-center"
        style={{ transform: "translateX(-100%)" }}
      >
        <div className="absolute right-4 w-1 h-32 bg-steel-700 rounded-full opacity-50" />
      </div>

      {/* Right Door */}
      <div
        ref={rightDoorRef}
        className="h-full w-1/2 bg-steel-800 border-l border-gold/30 brushed-metal origin-right relative flex justify-start items-center"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="absolute left-4 w-1 h-32 bg-steel-700 rounded-full opacity-50" />
      </div>

      <AnimatePresence mode="wait">
        {isClosing && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="w-24 h-24 rounded-full border-2 border-gold flex items-center justify-center bg-steel-900 shadow-[0_0_30px_rgba(201,168,76,0.3)]">
              <span className="text-gold font-sans font-bold text-3xl">S</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
