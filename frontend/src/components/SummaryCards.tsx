"use client";

import React from "react";

export default function SummaryCards() {
  // 比較する3つのシナリオのダミーデータ
  const scenarios = [
    {
      id: 1,
      name: "シナリオA (変動)",
      initialPayment: 98450,
      afterPayment: null,
      totalPayment: 41349000,
      color: "border-emerald-200 bg-emerald-50/30",
      textColor: "text-emerald-700",
    },
    {
      id: 2,
      name: "シナリオB (全期間固定)",
      initialPayment: 107408,
      afterPayment: 107408,
      totalPayment: 45111275,
      color: "border-blue-200 bg-blue-50/30",
      textColor: "text-blue-700",
    },
    {
      id: 3,
      name: "シナリオC (当初固定)",
      initialPayment: 111059,
      afterPayment: 121522,
      totalPayment: 50662572,
      color: "border-violet-200 bg-violet-50/30",
      textColor: "text-violet-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {scenarios.map((s) => (
        <div
          key={s.id}
          className={`border rounded-2xl p-4 shadow-sm backdrop-blur-sm ${s.color} transition-all`}
        >
          <div className="text-xs font-bold text-slate-500 mb-1">{s.name}</div>

          {/* 返済額の表示 */}
          <div className="mb-3">
            <div className="text-[10px] text-slate-400">毎月返済額</div>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-bold ${s.textColor}`}>
                {s.initialPayment.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">円</span>
              {s.afterPayment && s.afterPayment !== s.initialPayment && (
                <span className="text-[10px] text-slate-400 font-medium">
                  ➔ 後半 {s.afterPayment.toLocaleString()}円
                </span>
              )}
            </div>
          </div>

          {/* 総返済額の表示 */}
          <div>
            <div className="text-[10px] text-slate-400">総返済額</div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-slate-700">
                {(s.totalPayment / 10000).toFixed(1)}
              </span>
              <span className="text-xs text-slate-500">万円</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
