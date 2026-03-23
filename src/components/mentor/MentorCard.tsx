import { Mentor } from "@/types";

interface Props {
  mentor: Mentor;
  universityName: string;
  onConsult: (mentor: Mentor) => void;
}

export default function MentorCard({ mentor, universityName, onConsult }: Props) {
  return (
    <div className="card hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-3">
        {/* アバター */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0"
          style={{ backgroundColor: mentor.avatarColor }}
        >
          {mentor.imageInitial}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-gray-900">{mentor.name}</p>
            <span className="badge bg-primary-50 text-primary-700">{mentor.grade}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {universityName}・{mentor.faculty}
          </p>
          <p className="text-xs text-gray-500">{mentor.hometown}出身</p>
        </div>
      </div>

      {/* メッセージ */}
      <p className="text-sm text-gray-700 mt-3 bg-surface-50 rounded-xl px-3 py-2 border border-surface-200">
        💬 {mentor.message}
      </p>

      {/* 得意分野 */}
      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-1.5">相談できること</p>
        <div className="flex flex-wrap gap-1.5">
          {mentor.specialties.map((s, i) => (
            <span key={i} className="badge bg-surface-100 text-gray-600">{s}</span>
          ))}
        </div>
      </div>

      {/* 相談可能日 */}
      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>相談可能：{mentor.availableDays.join("・")}</span>
      </div>

      {/* 相談申込ボタン */}
      <button
        onClick={() => onConsult(mentor)}
        className="w-full mt-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 rounded-xl transition-all active:scale-95 shadow-sm shadow-indigo-200/50"
      >
        この先輩に相談する
      </button>
    </div>
  );
}
