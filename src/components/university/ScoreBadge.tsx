interface Props {
  score: number;
}

export default function ScoreBadge({ score }: Props) {
  const getConfig = (s: number) => {
    if (s >= 70) return {
      bar: "bg-gradient-to-r from-emerald-500 to-teal-400",
      text: "text-emerald-600",
      label: "相性が高い",
    };
    if (s >= 45) return {
      bar: "bg-gradient-to-r from-amber-500 to-yellow-400",
      text: "text-amber-600",
      label: "まずまず合っている",
    };
    return {
      bar: "bg-gradient-to-r from-orange-500 to-rose-400",
      text: "text-orange-600",
      label: "別の観点で可能性あり",
    };
  };

  const cfg = getConfig(score);

  return (
    <div className="rounded-xl px-3 py-2.5 bg-slate-50 border border-slate-200">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-500">{cfg.label}</span>
        <span className={`text-lg font-black ${cfg.text}`}>{score}<span className="text-xs font-bold ml-0.5">点</span></span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5">
        <div
          className={`${cfg.bar} h-1.5 rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-slate-400 mt-1.5">相性スコア（参考値）</p>
    </div>
  );
}
