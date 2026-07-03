"use client";

import React, { useState, useEffect } from "react";
import ControlPanel from "@/components/ControlPanel";
import SummaryCards from "@/components/SummaryCards";
import TimelineChart from "@/components/TimelineChart";

// 各シナリオの型定義
export interface Scenario {
  id: number;
  name: string;
  principal: number; // 借入額 (万円)
  periodYears: number; // 期間 (年)
  repaymentType: number; // 0: 元利均等, 1: 元金均等
  interestType: number; // 0: 変動, 1: 全固定, 2: 当初固定
  initialRate: number; // 当初金利 (%)
  fixedYears: number; // 当初固定期間 (年)
  subsequentRate: number; // 4年目以降の想定金利 (%)
  prepaymentEnabled: boolean; // 繰上返済の有無
  prepaymentType: number; // 0: 期間短縮, 1: 返済額軽減
  prepaymentYear: number; // 繰上実行年目
  prepaymentAmount: number; // 繰上金額 (万円)
}

// バックエンドから返ってくる結果の型定義
export interface SimulationResult {
  monthly_payment_initial: number;
  monthly_payment_after: number;
  total_payment: number;
  chart_data: { year: number; payment: number }[];
}

export default function Home() {
  // 初期値生成の関数
  const createDefaultScenario = (id: number, name: string): Scenario => ({
    id,
    name,
    principal: 4000,
    periodYears: 35,
    repaymentType: 0,
    interestType: 0,
    initialRate: 0.9,
    fixedYears: 3,
    subsequentRate: 1.5,
    prepaymentEnabled: false,
    prepaymentType: 0,
    prepaymentYear: 5,
    prepaymentAmount: 100,
  });

  // 状態管理(State)、初期はプランAのみ存在
  const [scenarios, setScenarios] = useState<Scenario[]>([
    createDefaultScenario(1, "プランA"),
  ]);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [apiResults, setApiResults] = useState<(SimulationResult | null)[]>([
    null,
    null,
    null,
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  // 編集中のシナリオを書き換える
  const updateActiveScenarioField = (field: keyof Scenario, value: any) => {
    setScenarios((prev) =>
      prev.map((s, idx) =>
        idx === activeScenarioIndex ? { ...s, [field]: value } : s,
      ),
    );
  };

  // 比較するプランを追加
  const addScenario = () => {
    if (scenarios.length >= 3) return;

    const activeScenario = scenarios[activeScenarioIndex];
    const nextId = Math.max(...scenarios.map((s) => s.id)) + 1;
    const names = ["プランA", "プランB", "プランC"];
    const newName = names[scenarios.length] || `プラン${nextId}`;

    const newScenario: Scenario = {
      ...activeScenario,
      id: nextId,
      name: newName,
    };

    setScenarios((prev) => [...prev, newScenario]);
    // 追加したシナリオに編集フォーカスを当てる
    setActiveScenarioIndex(scenarios.length);
  };

  // プランを削除する
  const removeScenario = (id: number) => {
    if (scenarios.length <= 1) return;

    const targetIndex = scenarios.findIndex((s) => s.id === id);
    setScenarios((prev) => prev.filter((s) => s.id !== id));
    setApiResults((prev) => prev.filter((_, idx) => idx !== targetIndex));

    // 削除によるインデックスの順番を補正
    setActiveScenarioIndex((prev) => {
      // 一番最後のプランを消したケース
      if (prev >= scenarios.length - 1) {
        return Math.max(0, scenarios.length - 2);
      }
      // 編集中のプランよりも前のプランを消したケース
      if (prev > targetIndex) {
        return prev - 1;
      }
      // 後ろのプランを消したケース
      return prev;
    });
  };

  // Rails APIとの通信
  useEffect(() => {
    const fetchCalculations = async () => {
      setLoading(true);
      try {
        // fetchリクエストを作成
        const promises = scenarios.map((s) =>
          fetch("http://localhost:3000/api/v1/simulations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: s.principal,
              years: s.periodYears,
              repayment_type: s.repaymentType,
              interest_type: s.interestType,
              initial_rate: s.initialRate,
              fixed_years: s.fixedYears,
              subsequent_rate: s.subsequentRate,
              prepayment_enabled: s.prepaymentEnabled,
              prepayment_type: s.prepaymentType,
              prepayment_year: s.prepaymentYear,
              prepayment_amount: s.prepaymentAmount,
            }),
          }).then((res) => {
            if (!res.ok) throw new Error("API通信エラー");
            return res.json();
          }),
        );
        // Promise.allを使ってRailsへリクエストを送る
        const data = await Promise.all(promises);
        setApiResults(data);
      } catch (error) {
        console.error("Failed to fetch simulation results:", error);
      } finally {
        setLoading(false);
      }
    };
    // 200ms以内に操作があった場合は通信を延期する
    const timer = setTimeout(() => {
      fetchCalculations();
    }, 200);

    // 次の操作が来た瞬間に前のタイマーをキャンセル
    return () => clearTimeout(timer);
  }, [scenarios]);

  //recharts用に1~50年分のデータを配列に生成
  // 返済期間に応じてグラフも変動
  const maxYears = Math.max(...scenarios.map((s) => s.periodYears), 1);
  const chartData = Array.from({ length: maxYears }, (_, i) => {
    const year = i + 1;
    const dataPoint: any = { year };

    scenarios.forEach((s, idx) => {
      const result = apiResults[idx];
      if (result && result.chart_data && result.chart_data[i]) {
        // 各プランの金額をpayment1,2,3のキーで格納
        dataPoint[`payment${s.id}`] = result.chart_data[i].payment;
      } else {
        dataPoint[`payment${s.id}`] = 0;
      }
    });

    return dataPoint;
  });

  //
  return (
    // クリーンなライトブルーからホワイトへのグラデーション背景
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-slate-50 to-blue-50/20 p-8 flex items-start justify-center">
      {/* 画面幅に合わせたメインコンテナ (最大幅 1200px) */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左カラム：条件設定パネル (3カラムのうちの1つを使用) */}
        <div className="md:col-span-1">
          <ControlPanel
            scenarios={scenarios}
            activeScenarioIndex={activeScenarioIndex}
            setActiveScenarioIndex={setActiveScenarioIndex}
            onChangeField={updateActiveScenarioField}
          />
        </div>

        {/* 右カラム：結果表示エリア (3カラムのうちの残り2つを使用) */}
        <div className="md:col-span-2 flex flex-col gap-6 w-full">
          {/* 右上段：3つのシナリオ比較カード */}
          <SummaryCards
            scenarios={scenarios}
            result={apiResults}
            activeScenarioIndex={activeScenarioIndex}
            setActiveScenarioIndex={setActiveScenarioIndex}
            onAddScenario={addScenario}
            onRemoveScenario={removeScenario}
            loading={loading}
          />

          {/* 右下段：Rechartsグラフが入るプレースホルダー */}
          <div className="flex items-center justify-center border border-dashed border-slate-200 rounded-3xl h-[420px] text-slate-400 bg-white/50 backdrop-blur-sm shadow-sm">
            <TimelineChart chartData={chartData} scenarios={scenarios} />
          </div>
        </div>
      </div>
    </main>
  );
}
