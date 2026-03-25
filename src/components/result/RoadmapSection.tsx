"use client";

import { UserType } from "@/types";
import { roadmapMap } from "@/data/resultData";

interface Props {
  userType: UserType;
}

export default function RoadmapSection({ userType }: Props) {
  const steps = roadmapMap[userType];
  if (!steps) return null;

  const selfCount = steps.filter((s) => s.tag === "self").length;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mincho font-bold text-slate-800 text-base">これからのロードマップ</h2>
      </div>

      {/* 凡例 */}
      <div className="flex gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          自分で進められる
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-violet-300" />
          サポートがあると◎
        </span>
      </div>

      <div className="relative">
        {/* 縦線 */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-200" aria-hidden />

        <div className="space-y-0">
          {steps.map((step, i) => {
            const isSelf = step.tag === "self";
            const isLast = i === steps.length - 1;
            return (
              <div key={step.step} className="relative flex items-start gap-4 pb-5">
                {/* アイコン */}
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10
                    ${isSelf
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-violet-100 text-violet-500"
                    }`}
                >
                  <span className="text-sm font-black">{step.step}</span>
                </div>

                {/* テキスト */}
                <div className={`flex-1 bg-white rounded-xl border px-4 py-3 shadow-sm
                  ${isSelf ? "border-slate-200" : "border-violet-200/80"}
                  ${isLast ? "" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-slate-700">{step.title}</p>
                    {!isSelf && (
                      <span className="text-xs font-medium text-violet-500 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full shrink-0">
                        サポートがあると◎
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 注釈 */}
      <p className="text-xs text-slate-400 leading-relaxed mt-1">
        STEP 1〜{selfCount} は今日から自分で進められます。STEP {selfCount + 1} 以降は、個別サポートがあると完成度が大きく上がります。
      </p>
    </div>
  );
}
