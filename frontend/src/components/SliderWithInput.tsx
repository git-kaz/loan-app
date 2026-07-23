"use client";

import React from "react";

interface SliderWithInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  accentClass: { slider: string; text: string };
  size?: "lg" | "sm";
}

const clamp = (val: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, val));

export default function SliderWithInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  accentClass,
  size = "sm",
}: SliderWithInputProps) {
  const inputClassName =
    size === "lg"
      ? `text-2xl font-extrabold ${accentClass.text} w-24 text-right bg-transparent outline-none border-b-2 border-current/20 hover:border-current/50 focus:border-current      
  transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
      : `text-sm font-extrabold text-stone-800 w-14 text-right bg-transparent outline-none border-b-2 border-stone-300/50 hover:border-stone-500 focus:border-stone-700         
  transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-stone-600">{label}</label>
        <div className="flex items-baseline gap-0.5">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            onBlur={(e) => onChange(clamp(Number(e.target.value), min, max))}
            className={inputClassName}
          />
          <span className="text-xs font-bold text-stone-500">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 bg-stone-100 border border-stone-200 rounded-lg appearance-none cursor-pointer ${accentClass.slider}`}
      />
    </div>
  );
}
