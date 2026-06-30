import React from "react";
import ControlPanel from "@/components/ControlPanel";
import SummaryCards from "@/components/SummaryCards";
import TimelineChart from "@/components/TimelineChart";

export default function Home() {
  return (
    // クリーンなライトブルーからホワイトへのグラデーション背景
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-slate-50 to-blue-50/20 p-8 flex items-start justify-center">
      {/* 画面幅に合わせたメインコンテナ (最大幅 1200px) */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左カラム：条件設定パネル (3カラムのうちの1つを使用) */}
        <div className="md:col-span-1">
          <ControlPanel />
        </div>

        {/* 右カラム：結果表示エリア (3カラムのうちの残り2つを使用) */}
        <div className="md:col-span-2 flex flex-col gap-6 w-full">
          {/* 右上段：3つのシナリオ比較カード */}
          <SummaryCards />

          {/* 右下段：Rechartsグラフが入るプレースホルダー */}
          <div className="flex items-center justify-center border border-dashed border-slate-200 rounded-3xl h-[420px] text-slate-400 bg-white/50 backdrop-blur-sm shadow-sm">
            <TimelineChart />
          </div>
        </div>
      </div>
    </main>
  );
}
