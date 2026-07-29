"use client"

import React from "react";
import HelpTooltip from "./HelpTooltip";
import { Scenario } from "@/app/page";

interface RepaymentTypeSelectorProps {
  repaymentType: number;
  onChangeField: (field: keyof Scenario, value: any) => void;
  currentAccent: { text: string };
}

export default function RepaymentTypeSelector({
  repaymentType,
  onChangeField,
  currentAccent
}: RepaymentTypeSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <label className="text-sm font-bold text-stone-600 block mb-2">
          返済方法
        </label>
        <HelpTooltip>
          <div>
            <p className="font-bold mb-1">返済方法について</p>
            <p className="mb-1"><strong>元利均等：</strong>
              毎月の返済額が一定で計画が立てやすい方式です</p>
            <p><strong>元金均等：</strong>
              返済当初の返済額は高めですが、元金の減りが早い方式です</p>
          </div>
        </HelpTooltip>
      </div>
      <div className="grid grid-cols-2 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
        <button
          type="button"
          onClick={() => onChangeField("repaymentType", 0)}
          className={`py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${repaymentType === 0
            ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
            : "text-stone-500 hover:text-stone-850 font-medium"
            }`}
        >
          元利均等
        </button>
        <button
          type="button"
          onClick={() => onChangeField("repaymentType", 1)}
          className={`py-2 text-xs rounded-lg transition-all cursor-pointer border border-transparent ${repaymentType === 1
            ? `bg-white ${currentAccent.text} font-bold shadow-sm border border-stone-200`
            : "text-stone-500 hover:text-stone-850 font-medium"
            }`}
        >
          元金均等
        </button>
      </div>
    </div>
  )
}


