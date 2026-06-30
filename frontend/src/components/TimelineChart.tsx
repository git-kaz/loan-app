"use client";

import React, { useEffect, useState } from "react";

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

export default function TimelineChart() {
  // マウント状態を管理（Next.jsのSSRエラー対策）
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 35年分の返済額の変化を表すダミーデータ（折れ線がカクカク動くように変化をつけます）
  const dummyData = Array.from({ length: 35 }, (_, i) => {
    const year = i + 1;
    let payment = 111059; // 1〜3年目 (当初金利 0.9%)
    if (year >= 4 && year <= 5) {
      payment = 121522; // 4〜5年目 (金利上昇 1.5%)
    } else if (year >= 6) {
      payment = 104327; // 6年目以降 (5年目に100万円を返済額軽減型で繰り上げ返済)
    }
    return { year, payment };
  });

  // マウントされるまでは骨組み（ローディングプレースホルダー）を表示しておく
  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-400">
        グラフを読み込み中...
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
        毎月返済額の推移 (35年シミュレーション)
      </h3>

      <div className="w-full h-[320px]">
        {/* レスポンシブに親要素の幅いっぱいにグラフを広げるコンテナ */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dummyData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            {/* 薄いグリッド背景線 */}
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            {/* X軸（年数） */}
            <XAxis
              dataKey="year"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              unit="年"
            />

            {/* Y軸（返済額。万円単位にフォーマット） */}
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              tickFormatter={(value) => `${(value / 10000).toFixed(1)}万`}
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
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              }}
            />

            {/* 5年目の繰り上げ返済タイミングを示す垂直の補助線 */}
            <ReferenceLine
              x={5}
              stroke="#cbd5e1"
              strokeDasharray="4 4"
              label={{
                value: "5年目: 繰上返済",
                position: "insideTopRight",
                fill: "#64748b",
                fontSize: 10,
                fontWeight: "600",
              }}
            />

            {/* 折れ線グラフ本体 */}
            {/* type="stepAfter" にすることで、ローン金利切り替え特有の「カクカクとした階段状の線」を描画します */}
            <Line
              type="stepAfter"
              dataKey="payment"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#2563eb" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
