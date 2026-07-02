"use client";

import React from "react";
import { Scenario, SimulationResult } from "@/app/page";

interface SummaryCardsProps {
  scenarios: Scenario[];
  result: (SimulationResult | null)[];
  activeScenarioIndex: number;
  setActiveScenarioIndex: (idx: number) => void;
  onAddScenarioIndex: () => void;
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
  // 比較する3つのシナリオのダミーデータ
  const cardStyles = [
    {
      color: "border-emerald-200 bg-emerald-50/20",
      activeColor:
        "ring-2 ring-emerald-500 border-transparent shadow-emerald-100",
      textColor: "text-emerald-700",
    },
    {
      color: "border-blue-200 bg-blue-50/20",
      activeColor: "ring-2 ring-blue-500 border-transparent shadow-blue-100",
      textColor: "text-blue-700",
    },
    {
      color: "border-violet-200 bg-violet-50/20",
      activeColor:
        "ring-2 ring-violet-500 border-transparent shadow-violet-100",
      textColor: "text-violet-700",
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
            className={`relative border rounded-2xl p-4 shadow-sm backdrop-blur-sm transition-all cursor-pointer min-h-[140px] hover:shadow-md flex flex-col justify-between ${
              style.color
            } ${isActive ? `${style.activeColor} shadow-lg scale-[1.02]` : "opacity-80"}`}
          >
            {/* ✕ 削除ボタン (プランが2つ以上の時だけ表示、かつAは残す) */}
            {scenarios.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // カード本体のクリックイベントが走るのを防ぎます
                  onRemoveScenario(s.id);
                }}
                className="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:scale-110 transition-all font-bold p-1 cursor-pointer rounded-full hover:bg-slate-100/50 w-6 h-6 flex items-center justify-center"
                title="プランを削除"
              >
                ✕
              </button>
            )}

            <div>
              <div className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                {/* 編集中のプランにはピンを表示 */}
                {isActive && (
                  <span className="text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded-full">
                    編集枠
                  </span>
                )}
                {s.name}
              </div>

              {/* 毎月返済額の表示 */}
              <div className="mb-2">
                <div className="text-[10px] text-slate-400">毎月返済額</div>
                {loading && !res ? (
                  <span className="text-sm font-semibold text-slate-400 animate-pulse">
                    計算中...
                  </span>
                ) : res ? (
                  <div className="flex flex-wrap items-baseline gap-x-1">
                    <span className={`text-xl font-bold ${style.textColor}`}>
                      {res.monthly_payment_initial.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">円</span>
                    {res.monthly_payment_after &&
                      res.monthly_payment_after !==
                        res.monthly_payment_initial && (
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                          ➔ 後半 {res.monthly_payment_after.toLocaleString()}円
                        </span>
                      )}
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-slate-400">
                    --- 円
                  </span>
                )}
              </div>
            </div>

            {/* 総返済額の表示 */}
            <div className="border-t border-slate-200/50 pt-2">
              <div className="text-[10px] text-slate-400">総返済額</div>
              {loading && !res ? (
                <span className="text-sm font-semibold text-slate-400 animate-pulse">
                  計算中...
                </span>
              ) : res ? (
                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg font-bold text-slate-700">
                    {(res.total_payment / 10000).toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">万円</span>
                </div>
              ) : (
                <span className="text-sm font-semibold text-slate-400">
                  --- 万円
                </span>
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
          className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-blue-400    
  hover:bg-blue-50/10 transition-all cursor-pointer min-h-[140px] text-slate-400 hover:text-blue-500 group"
        >
          <span className="text-2xl font-bold group-hover:scale-110 transition-all">
            +
          </span>
          <span className="text-xs font-semibold">比較プランを追加</span>
        </button>
      )}
    </div>
  );
}
