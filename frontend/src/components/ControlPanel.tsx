"use client";

import React from "react";
import { Scenario } from "@/app/page"; // page.tsxから型定義をインポート

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
  // 現在編集対象になっているプランのデータを取り出します
  const activeScenario = scenarios[activeScenarioIndex];

  // プランが万が一取得できない場合の安全ガード
  if (!activeScenario) return null;

  // 🌟 改善: スキャン漏れを防ぐため、枠線クラスも完全な文字列（リテラル）として定義します
  const planAccentClasses = [
    {
      slider: "accent-plan-a",
      text: "text-[#70B837] font-extrabold",
      toggleActive: "bg-plan-a",
      bgSubtle: "bg-plan-a/10",
      borderCard: "border-plan-a/30", // 🌟 静的スキャン可能な完全な枠線クラス
    },
    {
      slider: "accent-plan-b",
      text: "text-[#EEA045] font-extrabold",
      toggleActive: "bg-plan-b",
      bgSubtle: "bg-plan-b/10",
      borderCard: "border-plan-b/30", // 🌟 静的スキャン可能な完全な枠線クラス
    },
    {
      slider: "accent-plan-c",
      text: "text-[#d16b6b] font-extrabold",
      toggleActive: "bg-plan-c",
      bgSubtle: "bg-plan-c/15",
      borderCard: "border-plan-c/30", // 🌟 静的スキャン可能な完全な枠線クラス
    },
  ];
  
  const currentAccent = planAccentClasses[activeScenarioIndex] || planAccentClasses[0];

  return (
    // 背景をご指定の#EEEEE9に映える純白（bg-white）にし、柔らかなボーダーと影を適用しました
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-md shadow-stone-200/40 text-stone-850">
      <h2 className="text-xl font-bold mb-6 text-stone-800 font-sans">
        借入条件設定
      </h2>

      {/* 編集プランの切り替えセレクター */}
      <div className="mb-6">
        <label className="text-xs font-bold text-stone-500 block mb-2">編集するプラン</label>
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
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-stone-600">借入金額</label>
          <div className="flex items-baseline gap-0.5">
            <span className={`text-2xl font-extrabold ${currentAccent.text}`}>
              {activeScenario.principal.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-stone-500">万円</span>
          </div>
        </div>
        {/* 白いパネルの上でハッキリ見えるよう、溝を「薄グレー＋極細フチ」にしました */}
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={activeScenario.principal}
          onChange={(e) => onChangeField("principal", Number(e.target.value))}
          className={`w-full h-2 bg-stone-100 border border-stone-200 rounded-lg appearance-none cursor-pointer ${currentAccent.slider}`}
        />
        <div className="flex justify-between text-[10px] text-stone-500 font-semibold mt-1">
          <span>100万円</span>
          <span>1億円</span>
        </div>
      </div>

      {/* 2. 返済期間 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-stone-600">返済期間</label>
          <div className="flex items-baseline gap-0.5">
            <span className={`text-2xl font-extrabold ${currentAccent.text}`}>{activeScenario.periodYears}</span>
            <span className="text-xs font-bold text-stone-500">年</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={activeScenario.periodYears}
          onChange={(e) => onChangeField("periodYears", Number(e.target.value))}
          className={`w-full h-2 bg-stone-100 border border-stone-200 rounded-lg appearance-none cursor-pointer ${currentAccent.slider}`}
        />
        <div className="flex justify-between text-[10px] text-stone-500 font-semibold mt-1">
          <span>1年</span>
          <span>50年</span>
        </div>
      </div>

      {/* 3. 返済方法 (元利均等 / 元金均等) */}
      <div className="mb-6">
        <label className="text-sm font-bold text-stone-600 block mb-2">返済方法</label>
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
        <label className="text-sm font-bold text-stone-600 block mb-2">金利タイプ</label>
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
      {(activeScenario.interestType === 0 || activeScenario.interestType === 1) && (
        <div className={`p-4 ${currentAccent.bgSubtle} border ${currentAccent.borderCard} rounded-2xl mb-6 transition-all`}>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-stone-600 font-bold">借入金利</span>
              <span className="text-sm font-extrabold text-stone-800">
                {activeScenario.initialRate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.05"
              value={activeScenario.initialRate}
              onChange={(e) => onChangeField("initialRate", Number(e.target.value))}
              className={`w-full h-1.5 bg-white border border-stone-200 rounded-lg appearance-none cursor-pointer ${currentAccent.slider}`}
            />
          </div>
        </div>
      )}

      {/* 5-B. 当初固定(2) の場合は、3つの詳細スライダーを表示 */}
      {activeScenario.interestType === 2 && (
        <div className={`p-4 ${currentAccent.bgSubtle} border ${currentAccent.borderCard} rounded-2xl mb-6 transition-all`}>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-stone-600 font-bold">当初金利</span>
              <span className="text-sm font-extrabold text-stone-800">
                {activeScenario.initialRate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.05"
              value={activeScenario.initialRate}
              onChange={(e) => onChangeField("initialRate", Number(e.target.value))}
              className={`w-full h-1.5 bg-white border border-stone-200 rounded-lg appearance-none cursor-pointer ${currentAccent.slider}`}
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-stone-700 font-bold">当初固定期間</span>
              <span className="text-sm font-extrabold text-stone-800">
                {activeScenario.fixedYears} 年
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={activeScenario.fixedYears}
              onChange={(e) => onChangeField("fixedYears", Number(e.target.value))}
              className={`w-full h-1.5 bg-white border border-stone-200 rounded-lg appearance-none cursor-pointer ${currentAccent.slider}`}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-stone-700 font-bold">
                4年目以降の想定金利
              </span>
              <span className="text-sm font-extrabold text-stone-800">
                {activeScenario.subsequentRate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.05"
              value={activeScenario.subsequentRate}
              onChange={(e) => onChangeField("subsequentRate", Number(e.target.value))}
              className={`w-full h-1.5 bg-white border border-stone-200 rounded-lg appearance-none cursor-pointer ${currentAccent.slider}`}
            />
          </div>
        </div>
      )}

      {/* 6. 繰り上げ返済シミュレーション */}
      <div className="border-t border-stone-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-stone-600">繰り上げ返済を追加</span>
          <button
            type="button"
            onClick={() => onChangeField("prepaymentEnabled", !activeScenario.prepaymentEnabled)}
            className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 focus:outline-none cursor-pointer flex items-center ${
              activeScenario.prepaymentEnabled ? `${currentAccent.toggleActive} justify-end` : "bg-stone-300 justify-start"
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
              <label className="text-[10px] font-bold text-stone-500 block mb-1">返済方法</label>
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
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-stone-500">繰上時期</span>
                <span className="text-xs font-bold text-stone-800">{activeScenario.prepaymentYear} 年目</span>
              </div>
              <input
                type="range"
                min="1"
                max={activeScenario.periodYears}
                step="1"
                value={activeScenario.prepaymentYear}
                onChange={(e) => onChangeField("prepaymentYear", Number(e.target.value))}
                className={`w-full h-2 bg-white border border-stone-200 rounded-lg appearance-none cursor-pointer ${currentAccent.slider}`}
              />
            </div>

            {/* 繰上金額 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-stone-500">繰上金額</span>
                <span className="text-xs font-bold text-stone-800">{activeScenario.prepaymentAmount} 万円</span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={activeScenario.prepaymentAmount}
                onChange={(e) => onChangeField("prepaymentAmount", Number(e.target.value))}
                className={`w-full h-2 bg-white border border-stone-200 rounded-lg appearance-none cursor-pointer ${currentAccent.slider}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
