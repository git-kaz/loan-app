"use client";

import React from "react";

export default function ControlPanel() {
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
            <span className="text-2xl font-bold text-blue-600">4,000</span>
            <span className="text-xs font-semibold text-slate-500">万円</span>
          </div>
        </div>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          defaultValue="4000"
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
            <span className="text-2xl font-bold text-blue-600">35</span>
            <span className="text-xs font-semibold text-slate-500">年</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="35"
          step="1"
          defaultValue="35"
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>1年</span>
          <span>35年</span>
        </div>
      </div>

      {/* 3. 返済方法 (元利均等 / 元金均等) */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-slate-500 block mb-2">
          返済方法
        </label>
        <div className="grid grid-cols-2 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
          <button className="py-2 text-xs font-semibold rounded-lg bg-white text-blue-600 shadow-sm border border-slate-200/50 transition-all cursor-pointer">
            元利均等
          </button>
          <button className="py-2 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer">
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
          <button className="py-2 text-[10px] font-semibold rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer">
            変動金利
          </button>
          <button className="py-2 text-[10px] font-semibold rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer">
            全期間固定
          </button>
          <button className="py-2 text-[10px] font-semibold rounded-lg bg-white text-blue-600 shadow-sm border border-slate-200/50 transition-all cursor-pointer">
            当初固定
          </button>
        </div>
      </div>

      {/* 5. 金利条件設定 (当初固定) */}
      <div className="p-4 bg-blue-50/40 border border-blue-100/60 rounded-2xl mb-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-500 font-medium">当初金利</span>
            <span className="text-sm font-bold text-slate-800">0.9 %</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            defaultValue="90"
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-500 font-medium">
              当初固定期間
            </span>
            <span className="text-sm font-bold text-slate-800">3 年</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            defaultValue="3"
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-500 font-medium">
              4年目以降の想定金利
            </span>
            <span className="text-sm font-bold text-slate-800">1.5 %</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            defaultValue="150"
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      {/* 6. 繰り上げ返済シミュレーション (モックトグル) */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-500">
            繰り上げ返済を追加
          </span>
          <button className="w-11 h-6 bg-blue-600 rounded-full p-0.5 transition-all duration-200 focus:outline-none cursor-pointer flex items-center justify-end">
            <span className="w-5 h-5 bg-white rounded-full shadow-md"></span>
          </button>
        </div>

        {/* 繰り上げ返済の設定エリア (トグルON時のモック) */}
        <div className="mt-4 p-3 bg-slate-50/50 border border-slate-200/50 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">返済方法</span>
            <div className="flex gap-2">
              <span className="text-blue-600 bg-white border border-slate-200/60 px-2 py-0.5 rounded-md font-semibold">
                期間短縮
              </span>
              <span className="text-slate-400 px-2 py-0.5 rounded-md font-semibold">
                返済額軽減
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">繰上時期</span>
            <span className="text-slate-800 font-semibold">5年目</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">繰上金額</span>
            <span className="text-slate-800 font-semibold">100 万円</span>
          </div>
        </div>
      </div>
    </div>
  );
}
