"use client";

import React, { useEffect, useState } from "react";
import { Scenario } from "@/app/page"; // page.tsxから型定義をインポート
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface TimelineChartProps {
  chartData: any[];
  scenarios: Scenario[];
}

export default function TimelineChart({ chartData, scenarios }: TimelineChartProps) {
  // マウント状態を管理（Next.jsのSSRエラー対策）
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🌟 改善: カードの色と連動した「グリーン、テラコッタ、パステルピンク」の3線色
  const colors = [
    "#70B837", // プランA: グリーン
    "#EEA045", // プランB: オレンジ
    "#FF9999", // 👈 プランC: パステルピンクに変更
  ];

  // マウントされるまでは骨組み（ローディングプレースホルダー）を表示しておく
  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center text-stone-400">
        グラフを読み込み中...
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 bg-white rounded-3xl">
      <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#70B837] animate-pulse"></span>
        毎月返済額の推移 (プラン比較シミュレーション)
      </h3>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 25, left: -10, bottom: 0 }}
          >
            {/* 薄いグリッド背景線 */}
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            {/* X軸（年数） */}
            <XAxis
              dataKey="year"
              stroke="#8c857b"
              fontSize={11}
              tickLine={false}
              unit="年"
            />

            {/* Y軸（返済額。万円単位にフォーマット） */}
            <YAxis
              stroke="#8c857b"
              fontSize={11}
              tickLine={false}
              tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
            />

            {/* マウスホバー時のツールチップ */}
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [
                value ? `${Number(value).toLocaleString()}円` : "0円",
                "毎月返済額",
              ]}
              labelFormatter={(label) => `${label}年目`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                border: "1px solid #e5e2db",
                borderRadius: "16px",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                color: "#2d2a26"
              }}
            />

            {/* 繰り上げ返済が有効なプランの数だけ、縦の補助点線を引く */}
            {scenarios.map((s, idx) => {
              if (!s.prepaymentEnabled) return null;
              const color = colors[idx] || colors[0];
              return (
                <ReferenceLine
                  key={`ref-${s.id}`}
                  x={s.prepaymentYear}
                  stroke={color}
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: `${s.name}: 繰上`,
                    position: "insideTopRight",
                    fill: color,
                    fontSize: 9,
                    fontWeight: "700",
                  }}
                />
              );
            })}

            {/* 存在するプランの数だけ、対応する色の折れ線を描画する */}
            {scenarios.map((s, idx) => {
              const color = colors[idx] || colors[0];
              return (
                <Line
                  key={s.id}
                  type="stepAfter"
                  dataKey={`payment${s.id}`}
                  stroke={color}
                  strokeWidth={2.8}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: color }}
                  animationDuration={300}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
