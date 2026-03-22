interface Props {
  score: number;
}

export default function ScoreBadge({ score }: Props) {
  // スコアに応じた色を設定
  const getColor = (s: number) => {
    if (s >= 70) return { bar: "bg-green-500", text: "text-green-700", bg: "bg-green-50" };
    if (s >= 45) return { bar: "bg-yellow-500", text: "text-yellow-700", bg: "bg-yellow-50" };
    return { bar: "bg-orange-400", text: "text-orange-700", bg: "bg-orange-50" };
  };

  const getLabel = (s: number) => {
    if (s >= 70) return "相性が高い";
    if (s >= 45) return "まずまず合っている";
    return "別の観点で可能性あり";
  };

  const colors = getColor(score);

  return (
    <div className={`rounded-xl px-3 py-2 ${colors.bg}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-bold ${colors.text}`}>{getLabel(score)}</span>
        <span className={`text-sm font-black ${colors.text}`}>{score}点</span>
      </div>
      {/* プログレスバー */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={`${colors.bar} h-1.5 rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">相性スコア（参考値）</p>
    </div>
  );
}
