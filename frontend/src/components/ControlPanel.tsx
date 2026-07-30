"use client";

import React from "react";
import { Scenario } from "@/app/page"; // page.tsxから型定義をインポート
import SliderWithInput from "./SliderWithInput";
import HelpTooltip from "./HelpTooltip";
import ScenarioTabSelector from "./ScenarioTabSelector";
import RepaymentTypeSelector from "./RepaymentTypeSelector";
import InterestSection from "./InterestSection";
import PrepaymentSection from "./PrepaymentSection";

interface ControlPanelProps {
  scenarios: Scenario[];
  activeScenarioIndex: number;
  setActiveScenarioIndex: (idx: number) => void;
  onChangeField: (field: keyof Scenario, value: any) => void;
}

export default function ControlPanel({
  scenarios,
  activeScenarioIndex,
  setActiveScenarioIndex,
  onChangeField,
}: ControlPanelProps) {
  const activeScenario = scenarios[activeScenarioIndex];

  if (!activeScenario) return null;

  const planAccentClasses = [
    {
      slider: "accent-plan-a",
      text: "text-[#70B837] font-extrabold",
      toggleActive: "bg-plan-a",
      bgSubtle: "bg-plan-a/10",
      borderCard: "border-plan-a/30",
    },
    {
      slider: "accent-plan-b",
      text: "text-[#EEA045] font-extrabold",
      toggleActive: "bg-plan-b",
      bgSubtle: "bg-plan-b/10",
      borderCard: "border-plan-b/30",
    },
    {
      slider: "accent-plan-c",
      text: "text-[#E06D75] font-extrabold",
      toggleActive: "bg-plan-c",
      bgSubtle: "bg-plan-c/15",
      borderCard: "border-plan-c/30",
    },
  ];

  const currentAccent =
    planAccentClasses[activeScenarioIndex] || planAccentClasses[0];

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-md shadow-stone-200/40 text-stone-850">
      <h2 className="text-xl font-bold mb-6 text-stone-800 font-sans">
        借入条件設定
      </h2>

      {/* 編集プランの切り替えセレクター */}
      <ScenarioTabSelector
        scenarios={scenarios}
        activeScenarioIndex={activeScenarioIndex}
        setActiveScenarioIndex={setActiveScenarioIndex}
      />
      {/* 1. 借入金額 */}
      <SliderWithInput
        label="借入金額"
        value={activeScenario.principal}
        tooltipContent={
          <div>
            <p className="font-bold mb-1">借入金額とは</p>
            <p>銀行から借りる住宅ローンの総額を万円単位で入力します</p>
          </div>
        }
        min={100}
        max={10000}
        step={100}
        unit="万円"
        onChange={(v) => onChangeField("principal", v)}
        accentClass={currentAccent}
        size="lg"
      />
      {/* 2. 返済期間 */}
      <SliderWithInput
        label="返済期間"
        value={activeScenario.periodYears}
        tooltipContent={
          <div>
            <p className="font-bold mb-1">返済期間とは</p>
            <p>年数が長いほど月々の負担は減りますが、最長年数は金融機関により異なります</p>
          </div>
        }

        min={1}
        max={50}
        step={1}
        unit="年"
        onChange={(v) => onChangeField("periodYears", v)}
        accentClass={currentAccent}
        size="lg"
      />

      {/* 3. 返済方法 (元利均等 / 元金均等) */}
      <RepaymentTypeSelector
        repaymentType={activeScenario.repaymentType}
        onChangeField={onChangeField}
        currentAccent={currentAccent}
      />
      {/* 4. 金利タイプ、条件設定 */}
      <InterestSection
        activeScenario={activeScenario}
        onChangeField={onChangeField}
        currentAccent={currentAccent}
      />

      {/* 6. 繰上返済設定 */}
      <PrepaymentSection
        activeScenario={activeScenario}
        onChangeField={onChangeField}
        currentAccent={currentAccent}
      />
    </div >
  );
}


