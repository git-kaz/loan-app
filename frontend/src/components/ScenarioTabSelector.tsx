"use client"

import React from "react";
import { Scenario } from "@/app/page";

interface ScenarioTabSelectorProps {
  scenarios: Scenario[];
  activeScenarioIndex: number;
  setActiveScenarioIndex: (idx: number) => void;
}

export default function ScenarioTabSelector({
  scenarios,
  activeScenarioIndex,
  setActiveScenarioIndex,
}: ScenarioTabSelectorProps) {
  return (
    <div className="mb-6">
      <label className="text-xs font-bold text-stone-500 block mb-2">
        編集するプラン
      </label>
      <div className="flex gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
        {scenarios.map((s, idx) => {
          const isActive = idx === activeScenarioIndex;
          const tabColors = [
            "bg-plan-a text-white border-plan-a shadow-sm font-bold",
            "bg-plan-b text-white border-plan-b shadow-sm font-bold",
            "bg-plan-c text-white border-plan-c shadow-sm font-bold",
          ];
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveScenarioIndex(idx)}
              className={`flex-1 py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${isActive
                ? tabColors[idx]
                : "text-stone-500 hover:text-stone-800 font-medium"
                }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>
    </div>
  )
}
