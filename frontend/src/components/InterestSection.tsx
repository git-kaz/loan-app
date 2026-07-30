"use client"

import React from "react";
import { Scenario } from "@/app/page";
import SliderWithInput from "./SliderWithInput";
import HelpTooltip from "./HelpTooltip";

interface InterestSectionProps {
  activeScenario: Scenario;
  onChangeField: (field: keyof Scenario, value: any) => void;
  currentAccent: any;
}

export default function InterestRateSection({
  activeScenario,
  onChangeField,
  currentAccent
}: InterestSectionProps) {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <label className="text-sm font-bold text-stone-600 block mb-2">
            金利タイプ
          </label>
          <HelpTooltip>
            <div>
              <p className="font-bold mb-1">金利タイプについて</p>
              <p className="mb-1"><strong>変動金利：</strong>
                金利が低めですが金額が変動する可能性があります</p>
              <p className="mb-1"><strong>全期間固定：</strong>
                金利が高めですが、完済まで金利が固定されます</p>
              <p className="mb-1"><strong>当初固定：</strong>
                任意の期間のみ金利が固定されます</p>
            </div>
          </HelpTooltip>
        </div>
        <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 mb-4">
          <button
            type="button"
            onClick={() => onChangeField("interestType", 0)}
            className={`py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${activeScenario.interestType === 0
              ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
              : "text-stone-500 hover:text-stone-850 font-medium"
              }`}
          >
            変動金利
          </button>
          <button
            type="button"
            onClick={() => onChangeField("interestType", 1)}
            className={`py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${activeScenario.interestType === 1
              ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
              : "text-stone-500 hover:text-stone-850 font-medium"
              }`}
          >
            全期間固定
          </button>
          <button
            type="button"
            onClick={() => onChangeField("interestType", 2)}
            className={`py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${activeScenario.interestType === 2
              ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
              : "text-stone-500 hover:text-stone-850 font-medium"
              }`}
          >
            当初固定
          </button>
        </div>
      </div>
      {
        (activeScenario.interestType === 0 ||
          activeScenario.interestType === 1) && (
          <div
            className={`p-2 ${currentAccent.bgSubtle} border ${currentAccent.borderCard} rounded-2xl mb-6 transition-all`}
          >
            <SliderWithInput
              label="借入金利"
              value={activeScenario.initialRate}
              tooltipContent={
                <div>
                  <p className="font-bold mb-1">借入金利とは</p>
                  <p>各金融機関により異なります。複数を比較して検討しましょう</p>
                </div>
              }

              min={0.1}
              max={10.0}
              step={0.05}
              unit="%"
              onChange={(v) => onChangeField("initialRate", v)}
              accentClass={currentAccent}
              size="lg"
            />
          </div>
        )}


      {/* 5-B. 当初固定(2) の場合は、3つの詳細スライダーを表示 */}
      {
        activeScenario.interestType === 2 && (
          <div
            className={`p-4 ${currentAccent.bgSubtle} border ${currentAccent.borderCard} rounded-2xl mb-6 transition-all`}
          >
            <SliderWithInput
              label="当初金利"
              value={activeScenario.initialRate}
              tooltipContent={
                <div>
                  <p className="font-bold mb-1">当初金利とは</p>
                  <p>任意の年数固定される金利です</p>
                </div>
              }

              min={0.1}
              max={10.0}
              step={0.05}
              unit="%"
              onChange={(v) => onChangeField("initialRate", v)}
              accentClass={currentAccent}
            />

            <SliderWithInput
              label="当初固定期間"
              value={activeScenario.fixedYears}
              tooltipContent={
                <div>
                  <p className="font-bold mb-1">当初固定期間とは</p>
                  <p>金利が固定される年数です。年数が長いほど金利は高くなります</p>
                </div>
              }

              min={1}
              max={20}
              step={1}
              unit="年"
              onChange={(v) => onChangeField("fixedYears", v)}
              accentClass={currentAccent}
            />
            <SliderWithInput
              label="固定期間以降の金利"
              value={activeScenario.subsequentRate}
              min={0.1}
              max={10.0}
              step={0.05}
              unit="%"
              onChange={(v) => onChangeField("subsequentRate", v)}
              accentClass={currentAccent}
            />
          </div>
        )}
    </>
  );
}
