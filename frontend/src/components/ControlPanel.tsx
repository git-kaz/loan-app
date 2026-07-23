"use client";

import React from "react";
import { Scenario } from "@/app/page"; // page.tsxから型定義をインポート
import SliderWithInput from "./SliderWithInput";

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
      text: "text-[#d16b6b] font-extrabold",
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
                className={`flex-1 py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${
                  isActive
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

      {/* 1. 借入金額 */}
      <SliderWithInput
        label="借入金額"
        value={activeScenario.principal}
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
        min={1}
        max={50}
        step={1}
        unit="年"
        onChange={(v) => onChangeField("periodYears", v)}
        accentClass={currentAccent}
        size="lg"
      />

      {/* 3. 返済方法 (元利均等 / 元金均等) */}
      <div className="mb-6">
        <label className="text-sm font-bold text-stone-600 block mb-2">
          返済方法
        </label>
        <div className="grid grid-cols-2 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => onChangeField("repaymentType", 0)}
            className={`py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${
              activeScenario.repaymentType === 0
                ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                : "text-stone-500 hover:text-stone-850 font-medium"
            }`}
          >
            元利均等
          </button>
          <button
            type="button"
            onClick={() => onChangeField("repaymentType", 1)}
            className={`py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${
              activeScenario.repaymentType === 1
                ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                : "text-stone-500 hover:text-stone-850 font-medium"
            }`}
          >
            元金均等
          </button>
        </div>
      </div>

      {/* 4. 金利タイプ */}
      <div className="mb-6">
        <label className="text-sm font-bold text-stone-600 block mb-2">
          金利タイプ
        </label>
        <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => onChangeField("interestType", 0)}
            className={`py-2 text-[10px] rounded-lg transition-all cursor-pointer border border-transparent ${
              activeScenario.interestType === 0
                ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                : "text-stone-500 hover:text-stone-850 font-medium"
            }`}
          >
            変動金利
          </button>
          <button
            type="button"
            onClick={() => onChangeField("interestType", 1)}
            className={`py-2 text-[10px] rounded-lg transition-all cursor-pointer border border-transparent ${
              activeScenario.interestType === 1
                ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                : "text-stone-500 hover:text-stone-850 font-medium"
            }`}
          >
            全期間固定
          </button>
          <button
            type="button"
            onClick={() => onChangeField("interestType", 2)}
            className={`py-2 text-[10px] rounded-lg transition-all cursor-pointer border border-transparent ${
              activeScenario.interestType === 2
                ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                : "text-stone-500 hover:text-stone-850 font-medium"
            }`}
          >
            当初固定
          </button>
        </div>
      </div>

      {/* 5. 金利条件設定 */}

      {/* 5-A. 変動金利(0) または 全期間固定(1) の場合は、シンプルな金利スライダーを1つ表示 */}
      {(activeScenario.interestType === 0 ||
        activeScenario.interestType === 1) && (
        <div
          className={`p-4 ${currentAccent.bgSubtle} border ${currentAccent.borderCard} rounded-2xl mb-6 transition-all`}
        >
          <SliderWithInput
            label="借入金利"
            value={activeScenario.initialRate}
            min={0.1}
            max={10.0}
            step={0.05}
            unit="%"
            onChange={(v) => onChangeField("initialRate", v)}
            accentClass={currentAccent}
          />
        </div>
      )}

      {/* 5-B. 当初固定(2) の場合は、3つの詳細スライダーを表示 */}
      {activeScenario.interestType === 2 && (
        <div
          className={`p-4 ${currentAccent.bgSubtle} border ${currentAccent.borderCard} rounded-2xl mb-6 transition-all`}
        >
          <SliderWithInput
            label="当初金利"
            value={activeScenario.initialRate}
            min={0.1}
            max={10.0}
            step={0.05}
            unit="%"
            onChange={(v) => onChangeField("initialRate", v)}
            accentClass={currentAccent}
          />

          <SliderWithInput
            label="当初固定期間"
            value={activeScenario.fixedYears}
            min={1}
            max={20}
            step={1}
            unit="年"
            onChange={(v) => onChangeField("fixedYears", v)}
            accentClass={currentAccent}
          />
          <SliderWithInput
            label="固定期間以降の金利"
            value={activeScenario.subsequentRate}
            min={0.1}
            max={10.0}
            step={0.05}
            unit="%"
            onChange={(v) => onChangeField("subsequentRate", v)}
            accentClass={currentAccent}
          />
        </div>
      )}

      {/* 6. 繰り上げ返済シミュレーション */}
      <div className="border-t border-stone-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-stone-600">
            繰り上げ返済を追加
          </span>
          <button
            type="button"
            onClick={() =>
              onChangeField(
                "prepaymentEnabled",
                !activeScenario.prepaymentEnabled,
              )
            }
            className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 focus:outline-none cursor-pointer flex items-center ${
              activeScenario.prepaymentEnabled
                ? `${currentAccent.toggleActive} justify-end`
                : "bg-stone-300 justify-start"
            }`}
          >
            <span className="w-5 h-5 bg-white rounded-full shadow-md"></span>
          </button>
        </div>

        {/* 繰り上げ返済の設定エリア */}
        {activeScenario.prepaymentEnabled && (
          <div className="mt-4 p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-4 transition-all">
            {/* 繰上タイプ切り替え */}
            <div>
              <label className="text-[10px] font-bold text-stone-500 block mb-1">
                返済方法
              </label>
              <div className="grid grid-cols-2 gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => onChangeField("prepaymentType", 0)}
                  className={`py-1 text-[10px] rounded-md transition-all cursor-pointer border border-transparent ${
                    activeScenario.prepaymentType === 0
                      ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                      : "text-stone-500 hover:text-stone-800 font-medium"
                  }`}
                >
                  期間短縮
                </button>
                <button
                  type="button"
                  onClick={() => onChangeField("prepaymentType", 1)}
                  className={`py-1 text-[10px] rounded-md transition-all cursor-pointer border border-transparent ${
                    activeScenario.prepaymentType === 1
                      ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                      : "text-stone-500 hover:text-stone-800 font-medium"
                  }`}
                >
                  返済額軽減
                </button>
              </div>
            </div>

            {/* 繰上実行年 */}
            <div>
              <SliderWithInput
                label="繰上時期"
                value={activeScenario.prepaymentYear}
                min={1}
                max={activeScenario.periodYears}
                step={1}
                unit="年目"
                onChange={(v) => onChangeField("prepaymentYear", v)}
                accentClass={currentAccent}
              />
            </div>

            {/* 繰上金額 */}
            <SliderWithInput
              label="繰上金額"
              value={activeScenario.prepaymentAmount}
              min={10}
              max={5000}
              step={10}
              unit="万円"
              onChange={(v) => onChangeField("prepaymentAmount", v)}
              accentClass={currentAccent}
            />
          </div>
        )}
      </div>
    </div>
  );
}
