"use client";

import React from "react";
import { Scenario } from "@/app/page";

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
  // 現在編集対象のプランデータを取り出す
  const activeScenario = scenarios[activeScenarioIndex];

  // プラン取得できない時のガード
  if (!activeScenario) return null;

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-100 text-slate-800">
      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
        借入条件設定
      </h2>

      {/* 編集プランの切り替え */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-400 block mb-2">
          編集するプラン
        </label>
        <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
          {scenarios.map((s, idx) => {
            const isActive = idx === activeScenarioIndex;
            // A, B, C それぞれのイメージカラー
            const tabColors = [
              "bg-emerald-500 text-white shadow-sm", // プランA: 緑
              "bg-blue-500 text-white shadow-sm", // プランB: 青
              "bg-violet-500 text-white shadow-sm", // プランC: 紫
            ];
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveScenarioIndex(idx)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? tabColors[idx] || "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. 借入金額 (スライダー & 入力フィールド) */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-500">
            借入金額
          </label>
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-bold text-blue-600">
              {activeScenario.principal.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-500">万円</span>
          </div>
        </div>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={activeScenario.principal}
          onChange={(e) => onChangeField("principal", Number(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>100万円</span>
          <span>1億円</span>
        </div>
      </div>

      {/* 2. 返済期間 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-500">
            返済期間
          </label>
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-bold text-blue-600">
              {activeScenario.periodYears}
            </span>
            <span className="text-xs font-semibold text-slate-500">年</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={activeScenario.periodYears}
          onChange={(e) => onChangeField("periodYears", Number(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>1年</span>
          <span>50年</span>
        </div>
      </div>

      {/* 3. 返済方法 (元利均等 / 元金均等) */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-slate-500 block mb-2">
          返済方法
        </label>
        <div className="grid grid-cols-2 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
          <button
            type="button"
            onClick={() => onChangeField("repaymentType", 0)}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeScenario.repaymentType === 0
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            元利均等
          </button>
          <button
            type="button"
            onClick={() => onChangeField("repaymentType", 1)}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeScenario.repaymentType === 1
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            元金均等
          </button>
        </div>
      </div>

      {/* 4. 金利タイプ */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-slate-500 block mb-2">
          金利タイプ
        </label>
        <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
          <button
            type="button"
            onClick={() => onChangeField("interestType", 0)}
            className={`py-2 text-[10px] font-semibold rounded-lg transition-all cursor-pointer ${
              activeScenario.interestType === 0
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            変動金利
          </button>
          <button
            type="button"
            onClick={() => onChangeField("interestType", 1)}
            className={`py-2 text-[10px] font-semibold rounded-lg transition-all cursor-pointer ${
              activeScenario.interestType === 1
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            全期間固定
          </button>
          <button
            type="button"
            onClick={() => onChangeField("interestType", 2)}
            className={`py-2 text-[10px] font-semibold rounded-lg transition-all cursor-pointer ${
              activeScenario.interestType === 2
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            当初固定
          </button>
        </div>
      </div>

      {/* 5. 金利条件設定 (当初固定) */}
      {activeScenario.interestType === 2 && (
        <div className="p-4 bg-blue-50/40 border border-blue-100/60 rounded-2xl mb-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500 font-medium">
                当初金利
              </span>
              <span className="text-sm font-bold text-slate-800">
                {activeScenario.initialRate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.05"
              value={activeScenario.initialRate}
              onChange={(e) =>
                onChangeField("initialRate", Number(e.target.value))
              }
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500 font-medium">
                当初固定期間
              </span>
              <span className="text-sm font-bold text-slate-800">
                {activeScenario.fixedYears} 年
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={activeScenario.fixedYears}
              onChange={(e) =>
                onChangeField("fixedYears", Number(e.target.value))
              }
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500 font-medium">
                4年目以降の想定金利
              </span>
              <span className="text-sm font-bold text-slate-800">
                {activeScenario.subsequentRate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.05"
              value={activeScenario.subsequentRate}
              onChange={(e) =>
                onChangeField("subsequentRate", Number(e.target.value))
              }
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      )}

      {/* 6. 繰り上げ返済シミュレーション (モックトグル) */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-500">
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
                ? "bg-blue-600 justify-end"
                : "bg-slate-200 justify-start"
            }`}
          >
            <span className="w-5 h-5 bg-white rounded-full shadow-md"></span>
          </button>
        </div>

        {/* 繰り上げ返済の設定エリア (トグルON時のモック) */}
        {activeScenario.prepaymentEnabled && (
          <div className="mt-4 p-4 bg-slate-50/50 border border-slate-200/50 rounded-xl space-y-4 transition-all">
            {/* 繰上タイプ切り替え */}
            <div>
              <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                返済方法
              </label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100/60 p-0.5 rounded-lg border border-slate-200/40">
                <button
                  type="button"
                  onClick={() => onChangeField("prepaymentType", 0)}
                  className={`py-1 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                    activeScenario.prepaymentType === 0
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  期間短縮
                </button>
                <button
                  type="button"
                  onClick={() => onChangeField("prepaymentType", 1)}
                  className={`py-1 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                    activeScenario.prepaymentType === 1
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  返済額軽減
                </button>
              </div>
            </div>

            {/* 繰上実行年 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-semibold text-slate-400">
                  繰上時期
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {activeScenario.prepaymentYear} 年目
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={activeScenario.periodYears}
                step="1"
                value={activeScenario.prepaymentYear}
                onChange={(e) =>
                  onChangeField("prepaymentYear", Number(e.target.value))
                }
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 繰上金額 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-semibold text-slate-400">
                  繰上金額
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {activeScenario.prepaymentAmount} 万円
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={activeScenario.prepaymentAmount}
                onChange={(e) =>
                  onChangeField("prepaymentAmount", Number(e.target.value))
                }
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
