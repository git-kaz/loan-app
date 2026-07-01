"use client";

import React from "react";

interface ControlPanelProps {
  principal: number;
  setPrincipal: (val: number) => void;
  periodYears: number;
  setPeriodYears: (val: number) => void;
  repaymentType: number;
  setRepaymentType: (val: number) => void;
  interestType: number;
  setInterestType: (val: number) => void;
  initialRate: number;
  setInitialRate: (val: number) => void;
  fixedYears: number;
  setFixedYears: (val: number) => void;
  subsequentRate: number;
  setSubsequentRate: (val: number) => void;
  prepaymentEnabled: boolean;
  setPrepaymentEnabled: (val: boolean) => void;
  prepaymentType: number;
  setPrepaymentType: (val: number) => void;
  prepaymentYear: number;
  setPrepaymentYear: (val: number) => void;
  prepaymentAmount: number;
  setPrepaymentAmount: (val: number) => void;
}

export default function ControlPanel({
  principal,
  setPrincipal,
  periodYears,
  setPeriodYears,
  repaymentType,
  setRepaymentType,
  interestType,
  setInterestType,
  initialRate,
  setInitialRate,
  fixedYears,
  setFixedYears,
  subsequentRate,
  setSubsequentRate,
  prepaymentEnabled,
  setPrepaymentEnabled,
  prepaymentType,
  setPrepaymentType,
  prepaymentYear,
  setPrepaymentYear,
  prepaymentAmount,
  setPrepaymentAmount,
}: ControlPanelProps) {
  return (
    <div className="w-full bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-100 text-slate-800">
      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
        借入条件設定
      </h2>

      {/* 1. 借入金額 (スライダー & 入力フィールド) */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-500">
            借入金額
          </label>
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-bold text-blue-600">
              {principal.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-500">万円</span>
          </div>
        </div>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
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
              {periodYears}
            </span>
            <span className="text-xs font-semibold text-slate-500">年</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={periodYears}
          onChange={(e) => setPeriodYears(Number(e.target.value))}
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
            onClick={() => setRepaymentType(0)}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              repaymentType === 0
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            元利均等
          </button>
          <button
            type="button"
            onClick={() => setRepaymentType(1)}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              repaymentType === 1
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
            onClick={() => setInterestType(0)}
            className={`py-2 text-[10px] font-semibold rounded-lg transition-all cursor-pointer ${
              interestType === 0
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            変動金利
          </button>
          <button
            type="button"
            onClick={() => setInterestType(1)}
            className={`py-2 text-[10px] font-semibold rounded-lg transition-all cursor-pointer ${
              interestType === 1
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            全期間固定
          </button>
          <button
            type="button"
            onClick={() => setInterestType(2)}
            className={`py-2 text-[10px] font-semibold rounded-lg transition-all cursor-pointer ${
              interestType === 2
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            当初固定
          </button>
        </div>
      </div>

      {/* 5. 金利条件設定 (当初固定) */}
      {interestType === 2 && (
        <div className="p-4 bg-blue-50/40 border border-blue-100/60 rounded-2xl mb-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500 font-medium">
                当初金利
              </span>
              <span className="text-sm font-bold text-slate-800">
                {initialRate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.05"
              value={initialRate}
              onChange={(e) => setInitialRate(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500 font-medium">
                当初固定期間
              </span>
              <span className="text-sm font-bold text-slate-800">
                {fixedYears} 年
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={fixedYears}
              onChange={(e) => setFixedYears(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500 font-medium">
                4年目以降の想定金利
              </span>
              <span className="text-sm font-bold text-slate-800">
                {subsequentRate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.05"
              value={subsequentRate}
              onChange={(e) => setSubsequentRate(Number(e.target.value))}
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
            onClick={() => setPrepaymentEnabled(!prepaymentEnabled)}
            className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 focus:outline-none cursor-pointer flex items-center ${
              prepaymentEnabled
                ? "bg-blue-600 justify-end"
                : "bg-slate-200 justify-start"
            }`}
          >
            <span className="w-5 h-5 bg-white rounded-full shadow-md"></span>
          </button>
        </div>

        {/* 繰り上げ返済の設定エリア (トグルON時のモック) */}
        {prepaymentEnabled && (
          <div className="mt-4 p-4 bg-slate-50/50 border border-slate-200/50 rounded-xl space-y-4 transition-all">
            {/* 繰上タイプ切り替え */}
            <div>
              <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                返済方法
              </label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100/60 p-0.5 rounded-lg border border-slate-200/40">
                <button
                  type="button"
                  onClick={() => setPrepaymentType(0)}
                  className={`py-1 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                    prepaymentType === 0
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  期間短縮
                </button>
                <button
                  type="button"
                  onClick={() => setPrepaymentType(1)}
                  className={`py-1 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                    prepaymentType === 1
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
                  {prepaymentYear} 年目
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={periodYears}
                step="1"
                value={prepaymentYear}
                onChange={(e) => setPrepaymentYear(Number(e.target.value))}
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
                  {prepaymentAmount} 万円
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={prepaymentAmount}
                onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
