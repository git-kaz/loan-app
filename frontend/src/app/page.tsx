"use client";

import React, { useState } from "react";
import ControlPanel from "@/components/ControlPanel";
import SummaryCards from "@/components/SummaryCards";
import TimelineChart from "@/components/TimelineChart";

export default function Home() {
  // 基本情報のstate
  const [principal, setPrincipal] = useState<number>(4000); //借入金額
  const [periodYears, setPeriodYears] = useState<number>(35); //返済期間
  const [repaymentType, setRepaymentType] = useState<number>(0); //返済方法（0: 元利均等、1: 元金均等）
  const [interestType, setInterestType] = useState<number>(2); //金利タイプ（0: 変動, 1: 全期間固定, 2: 当初固定)

  // 当初固定のstate
  const [initialRate, setInitialRate] = useState<number>(0.9); //当初固定金利
  const [fixedYears, setFixedYears] = useState<number>(3); //当初固定金利期間
  const [subsequentRate, setSubsequentRate] = useState<number>(1.5); //4年目以降の想定金利

  // 繰り上げ返済のstate
  const [prepaymentEnabled, setPrepaymentEnabled] = useState<boolean>(true); // 繰り上げ返済のON/OFF
  const [prepaymentType, setPrepaymentType] = useState<number>(0); // 繰上タイプ (0: 期間短縮, 1: 返済額軽減)
  const [prepaymentYear, setPrepaymentYear] = useState<number>(5); // 繰上実行年目
  const [prepaymentAmount, setPrepaymentAmount] = useState<number>(100); // 繰上金額 (万円)

  return (
    // クリーンなライトブルーからホワイトへのグラデーション背景
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-slate-50 to-blue-50/20 p-8 flex items-start justify-center">
      {/* 画面幅に合わせたメインコンテナ (最大幅 1200px) */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左カラム：条件設定パネル (3カラムのうちの1つを使用) */}
        <div className="md:col-span-1">
          <ControlPanel
            principal={principal}
            setPrincipal={setPrincipal}
            periodYears={periodYears}
            setPeriodYears={setPeriodYears}
            repaymentType={repaymentType}
            setRepaymentType={setRepaymentType}
            interestType={interestType}
            setInterestType={setInterestType}
            initialRate={initialRate}
            setInitialRate={setInitialRate}
            fixedYears={fixedYears}
            setFixedYears={setFixedYears}
            subsequentRate={subsequentRate}
            setSubsequentRate={setSubsequentRate}
            prepaymentEnabled={prepaymentEnabled}
            setPrepaymentEnabled={setPrepaymentEnabled}
            prepaymentType={prepaymentType}
            setPrepaymentType={setPrepaymentType}
            prepaymentYear={prepaymentYear}
            setPrepaymentYear={setPrepaymentYear}
            prepaymentAmount={prepaymentAmount}
            setPrepaymentAmount={setPrepaymentAmount}
          />
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
