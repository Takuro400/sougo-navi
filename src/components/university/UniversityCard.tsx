import Link from "next/link";
import { MatchResult } from "@/types";
import ScoreBadge from "./ScoreBadge";

interface Props {
  result: MatchResult;
  rank: number;
  isSaved?: boolean;
  onSave?: (id: string) => void;
}

export default function UniversityCard({ result, rank, isSaved, onSave }: Props) {
  const { university: univ, score, matchReasons, readinessLevel } = result;

  const readinessConfig = {
    高: { color: "bg-green-100 text-green-700", label: "準備度：高" },
    中: { color: "bg-yellow-100 text-yellow-700", label: "準備度：中" },
    低: { color: "bg-orange-100 text-orange-700", label: "準備度：低" },
  };

  const sougoConfig = {
    高: "bg-blue-100 text-blue-700",
    中: "bg-indigo-100 text-indigo-700",
    低: "bg-gray-100 text-gray-600",
  };

  const typeConfig = {
    国立: "bg-purple-100 text-purple-700",
    公立: "bg-teal-100 text-teal-700",
    私立: "bg-pink-100 text-pink-700",
  };

  return (
    <div className="card relative overflow-hidden group hover:shadow-md transition-all duration-200">
      {/* ランク表示 */}
      <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary-600 text-white text-xs font-black flex items-center justify-center">
        {rank}
      </div>

      {/* 保存ボタン */}
      {onSave && (
        <button
          onClick={() => onSave(univ.id)}
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
            isSaved ? "text-accent-500" : "text-gray-300 hover:text-accent-400"
          }`}
          aria-label={isSaved ? "保存済み" : "気になる大学に保存"}
        >
          <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      )}

      <div className="pl-10 pr-8 pt-0">
        {/* 大学名・学部 */}
        <h3 className="font-display font-black text-gray-900 text-lg leading-tight">{univ.name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{univ.faculty}</p>

        {/* バッジ群 */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className={`badge ${typeConfig[univ.type]}`}>{univ.type}</span>
          <span className="badge bg-gray-100 text-gray-600">{univ.prefecture}</span>
          <span className={`badge ${sougoConfig[univ.sougoCompatibility]}`}>
            総合型選抜相性：{univ.sougoCompatibility}
          </span>
          <span className={`badge ${readinessConfig[readinessLevel].color}`}>
            {readinessConfig[readinessLevel].label}
          </span>
        </div>

        {/* スコア */}
        <div className="mt-3">
          <ScoreBadge score={score} />
        </div>

        {/* おすすめ理由 */}
        <div className="mt-3 space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">なぜおすすめ？</p>
          {matchReasons.slice(0, 2).map((reason, i) => (
            <div key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
              <span className="mt-0.5 text-primary-500 shrink-0">✓</span>
              <span>{reason}</span>
            </div>
          ))}
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/universities/${univ.id}`}
            className="flex-1 text-center py-2.5 text-sm font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors"
          >
            詳細を見る
          </Link>
          <Link
            href={`/mentors?university=${univ.id}`}
            className="flex-1 text-center py-2.5 text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            先輩に相談
          </Link>
        </div>
      </div>
    </div>
  );
}
