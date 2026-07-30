"use client"

import React from "react";
import { Scenario } from "@/app/page";
import SliderWithInput from "./SliderWithInput";
import HelpTooltip from "./HelpTooltip";

interface PrepaymentSectionProps {
  activeScenario: Scenario;
  onChangeField: (field: keyof Scenario, value: any) => void;
  currentAccent: any;
}

export default function PrepaymentSection({
  activeScenario,
  onChangeField,
  currentAccent
}: PrepaymentSectionProps) {
  return (

    < div className="border-t border-stone-200 pt-4" >
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-stone-600">
          繰り上げ返済を追加
        </span>
        <button
          type="button"
          onClick={() =>
            onChangeField(
              "prepaymentEnabled",
              !activeScenario.prepaymentEnabled,
            )
          }
          className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 focus:outline-none cursor-pointer flex items-center ${activeScenario.prepaymentEnabled
            ? `${currentAccent.toggleActive} justify-end`
            : "bg-stone-300 justify-start"
            }`}
        >
          <span className="w-5 h-5 bg-white rounded-full shadow-md"></span>
        </button>
      </div>

      {/* 繰り上げ返済の設定エリア */}
      {
        activeScenario.prepaymentEnabled && (
          <div className="mt-4 p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-4 transition-all">
            {/* 繰上タイプ切り替え */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <label className="text-sm font-bold text-stone-500 block mb-1">
                  返済方法
                </label>
                <HelpTooltip>
                  <div>
                    <p className="font-bold mb-1">返済方法について</p>
                    <p className="mb-1"><strong>期間短縮：</strong>
                      月々の返済額を変えずに期間を短縮します</p>
                    <p><strong>返済額軽減：</strong>
                      月々の返済額が減りますが、総支払額は期間短縮より多くなります</p>
                  </div>
                </HelpTooltip>
                <div className="px-4 grid grid-cols-2 gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                  <button
                    type="button"
                    onClick={() => onChangeField("prepaymentType", 0)}
                    className={`py-1 text-sm rounded-md transition-all cursor-pointer border border-transparent ${activeScenario.prepaymentType === 0
                      ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                      : "text-stone-500 hover:text-stone-800 font-medium"
                      }`}
                  >
                    期間短縮
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeField("prepaymentType", 1)}
                    className={`py-1 text-sm rounded-md transition-all cursor-pointer border border-transparent ${activeScenario.prepaymentType === 1
                      ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
                      : "text-stone-500 hover:text-stone-800 font-medium"
                      }`}
                  >
                    返済額軽減
                  </button>
                </div>
              </div>
            </div>

            {/* 繰上実行年 */}
            <div>
              <SliderWithInput
                label="繰上時期"
                value={activeScenario.prepaymentYear}
                tooltipContent={
                  <div>
                    <p className="font-bold mb-1">繰上時期とは</p>
                    <p>借入から何年後に返済するかを入力します</p>
                  </div>
                }

                min={1}
                max={activeScenario.periodYears}
                step={1}
                unit="年目"
                onChange={(v) => onChangeField("prepaymentYear", v)}
                accentClass={currentAccent}
              />
            </div>

            {/* 繰上金額 */}
            <SliderWithInput
              label="繰上金額"
              value={activeScenario.prepaymentAmount}
              tooltipContent={
                <div>
                  <p className="font-bold mb-1">繰上金額とは</p>
                  <p>一括でまとめて返済することで返済額を軽減します</p>
                </div>
              }

              min={10}
              max={5000}
              step={10}
              unit="万円"
              onChange={(v) => onChangeField("prepaymentAmount", v)}
              accentClass={currentAccent}
            />
          </div>
        )}
    </div >
  );
}
