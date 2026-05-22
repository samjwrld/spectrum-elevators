/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Section {
  id: string;
  floor: string;
  label: string;
}

export const SECTIONS: Section[] = [
  { id: 'lobby', floor: 'G', label: 'LOBBY' },
  { id: 'about', floor: '1', label: 'ABOUT US' },
  { id: 'products', floor: '2', label: 'PRODUCTS' },
  { id: 'projects', floor: '3', label: 'PROJECTS' },
  { id: 'features', floor: '4', label: 'WHY US' },
  { id: 'testimonials', floor: '5', label: 'TESTIMONIALS' },
  { id: 'contact', floor: '6', label: 'PENTHOUSE' },
];

export interface ElevatorType {
  title: string;
  description: string;
  specs: string[];
  imagePrompt: string;
}

export const ELEVATOR_TYPES: ElevatorType[] = [
  {
    title: "Passenger Elevators",
    description: "Whisper-quiet vertical transport for luxury residential and high-traffic commercial spaces.",
    specs: ["Capacity: 450 - 1600 KG", "Speed: Up to 2.5 m/s", "Drive: Gearless PMSM"],
    imagePrompt: "Close up of a luxury passenger elevator interior with brushed gold panels and LED lighting, minimalist architectural photography",
  },
  {
    title: "Panoramic Glass Elevators",
    description: "Architectural masterpieces that offer breathtaking 360-degree views as you ascend.",
    specs: ["Custom Shapes: Circle, Square", "Safety Glass: 12mm Toughened", "Frameless Design"],
    imagePrompt: "Futuristic circular glass elevator shaft inside a high-end luxury mall atrium, cinematic lighting",
  },
  {
    title: "Home / Residential Lifts",
    description: "Compact, energy-efficient solutions designed to blend seamlessly with your home interior.",
    specs: ["Pitless Installation Available", "Single Phase Power", "Custom Cabin Finishes"],
    imagePrompt: "Modern minimalist home lift integrated into a luxury villa living room, warm mood lighting",
  },
  {
    title: "Hospital / Bed Elevators",
    description: "Precision-engineered for reliability and smooth transport of medical equipment and patients.",
    specs: ["Extra Deep Cabin", "Micro-leveling Accuracy", "Antimicrobial Surfaces"],
    imagePrompt: "Clean professional hospital elevator hallway, sterile precision environment",
  },
];
