"use client";

import { UserType } from "@/types";
import { strengthWeaknessMap } from "@/data/resultData";

interface Props {
  userType: UserType;
}

export default function StrengthWeaknessCard({ userType }: Props) {
  const data = strengthWeaknessMap[userType];
  if (!data) return null;

  return (
    <div className="mb-6 space-y-4">
      {/* 強み */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-xs font-black flex items-center justify-center shrink-0">✓</span>
          <h3 className="font-mincho font-bold text-slate-800 text-sm">あなたの強み</h3>
        </div>
        <div className="space-y-3">
          {data.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">{s.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-700 mb-0.5">{s.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 課題・伸びしろ */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-black flex items-center justify-center shrink-0">→</span>
          <h3 className="font-mincho font-bold text-slate-800 text-sm">伸びしろ・対策ポイント</h3>
        </div>
        <div className="space-y-3">
          {data.challenges.map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">{c.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-700 mb-0.5">{c.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{c.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
