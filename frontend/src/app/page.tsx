import React from "react";
    import ControlPanel from "@/components/ControlPanel";
  
    export default function Home() {
      return (
        // クリーンなライトブルーからホワイトへのグラデーション背景
        <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-slate-50 to-blue-50/20 p-8 flex items-start justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 左側：条件設定パネル */}
            <div className="md:col-span-1">
              <ControlPanel />
            </div>
  
            {/* 右側：グラフや結果表示用のプレースホルダー */}
            <div className="md:col-span-2 flex items-center justify-center border border-dashed border-slate-200 rounded-3xl h-[600px] text-slate-400 bg-white/50 backdrop-blur-sm">
              ここにグラフと結果カードが入ります
            </div>
  
          </div>
        </main>
      );
    }