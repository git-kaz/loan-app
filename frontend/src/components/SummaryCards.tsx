"use client";

import React from "react";
import { Scenario, SimulationResult } from "@/app/page"; // page.tsxから型定義をインポート

interface SummaryCardsProps {
  scenarios: Scenario[];
  result: (SimulationResult | null)[];
  activeScenarioIndex: number;
  setActiveScenarioIndex: (idx: number) => void;
  onAddScenario: () => void;
  onRemoveScenario: (id: number) => void;
  loading: boolean;
}

export default function SummaryCards({
  scenarios,
  result,
  activeScenarioIndex,
  setActiveScenarioIndex,
  onAddScenario,
  onRemoveScenario,
  loading,
}: SummaryCardsProps) {
  // 🌟 改善: カード背景をご指定のソリッドカラーに変更し、アクティブ時は「太い白のリング(ring-white/70)」でハイライトします
  const cardStyles = [
    {
      color: "border-plan-a bg-plan-a hover:brightness-105",
      activeColor: "ring-4 ring-white/70 shadow-lg shadow-plan-a/30 scale-[1.02]",
      textColor: "text-[#fdfdfd] font-extrabold",
    },
    {
      color: "border-plan-b bg-plan-b hover:brightness-105",
      activeColor: "ring-4 ring-white/70 shadow-lg shadow-plan-b/30 scale-[1.02]",
      textColor: "text-[#fdfdfd] font-extrabold",
    },
    {
      color: "border-plan-c bg-plan-c hover:brightness-105", // プランC (パステルピンク)
      activeColor: "ring-4 ring-white/70 shadow-lg shadow-plan-c/30 scale-[1.02]",
      textColor: "text-[#fdfdfd] font-extrabold",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      
      {/* 1. 存在するプランのカードをループ描画 */}
      {scenarios.map((s, idx) => {
        const isActive = idx === activeScenarioIndex;
        const res = result[idx];
        const style = cardStyles[idx] || cardStyles[0];

        return (
          <div
            key={s.id}
            onClick={() => setActiveScenarioIndex(idx)}
            // 🌟 改善: 非アクティブ時は不透明度を85%にして落ち着かせ、アクティブ時に100%＋太い白枠で目立たせます
            className={`relative border rounded-2xl p-4 shadow-sm backdrop-blur-sm transition-all cursor-pointer min-h-[140px] hover:shadow-md flex flex-col justify-between ${
              style.color
            } ${isActive ? style.activeColor : "border-stone-300/40 opacity-85 hover:opacity-100"}`}
          >
            {/* ✕ 削除ボタン (プランが2つ以上の時だけ表示、白背景ホバー) */}
            {scenarios.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // カード本体のクリックイベントが走るのを防ぎます
                  onRemoveScenario(s.id);
                }}
                className="absolute top-3 right-3 text-white/75 hover:text-white hover:scale-110 transition-all font-bold p-1 cursor-pointer rounded-full hover:bg-white/20 w-6 h-6 flex items-center justify-center z-10"
                title="プランを削除"
              >
                ✕
              </button>
            )}

            <div>
              {/* プラン名の表示 (白抜き & 半透明バッジ) */}
              <div className="text-xs font-bold text-[#fdfdfd] mb-2 flex items-center gap-1.5">
                {isActive && (
                  <span className="text-[10px] bg-white/20 text-[#fdfdfd] border border-white/25 px-1.5 py-0.5 rounded-full font-bold">
                    編集枠
                  </span>
                )}
                {s.name}
              </div>

              {/* 毎月返済額の表示 */}
              <div className="mb-2">
                <div className="text-[10px] text-white/80 font-bold mb-0.5">毎月返済額</div>
                {loading && !res ? (
                  <span className="text-sm font-semibold text-white/85 animate-pulse">計算中...</span>
                ) : res ? (
                  <div className="flex flex-wrap items-baseline gap-x-1">
                    <span className={`text-xl font-black ${style.textColor}`}>
                      {res.monthly_payment_initial.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/90 font-bold">円</span>
                    {res.monthly_payment_after && res.monthly_payment_after !== res.monthly_payment_initial && (
                      <span className="text-[10px] text-white/85 font-extrabold whitespace-nowrap">
                        ➔ 後半 {res.monthly_payment_after.toLocaleString()}円
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm font-bold text-white/80">--- 円</span>
                )}
              </div>
            </div>

            {/* 総返済額の表示 */}
            <div className="border-t border-white/20 pt-2">
              <div className="text-[10px] text-white/80 font-bold mb-0.5">総返済額</div>
              {loading && !res ? (
                <span className="text-sm font-semibold text-white/85 animate-pulse">計算中...</span>
              ) : res ? (
                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg font-black text-[#fdfdfd]">
                    {(res.total_payment / 10000).toFixed(1)}
                  </span>
                  <span className="text-xs text-white/90 font-bold">万円</span>
                </div>
              ) : (
                <span className="text-sm font-bold text-white/80">--- 万円</span>
              )}
            </div>

          </div>
        );
      })}

      {/* 2. プランが3つ未満なら「+ プラン追加」ボタンを表示 */}
      {scenarios.length < 3 && (
        <button
          type="button"
          onClick={onAddScenario}
          // サンドグレー背景の上で映えるよう、枠を少し濃くしています
          className="border-2 border-dashed border-stone-400 bg-white/70 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-stone-500 hover:bg-stone-100 transition-all cursor-pointer min-h-[140px] text-stone-600 hover:text-stone-850 group"
        >
          <span className="text-2xl font-bold group-hover:scale-110 transition-all">+</span>
          <span className="text-xs font-bold">比較プランを追加</span>
        </button>
      )}

    </div>
  );
}
