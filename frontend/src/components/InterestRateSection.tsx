"use client"

import React from "react";
import { Scenario } from "@/app/page";
import SliderWithInput from "./SliderWithInput";
import HelpTooltip from "./HelpTooltip";

interface InterestRateSectionProps {
  activeScenario: Scenario;
  onChangeField: (field: keyof Scenario, value: any) => void;
  currentAccent: any;
}

export default function InterestRateSection({
  activeScenario,
  onChangeField,
  currentAccent
}: InterestRateSectionProps) {
  return (
    <>
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
