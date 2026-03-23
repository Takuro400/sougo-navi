"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MentorCard from "@/components/mentor/MentorCard";
import { getUniversityById } from "@/data/universities";
import { getMentorsByUniversityId } from "@/data/mentors";
import { useState, useEffect } from "react";
import { Mentor } from "@/types";

const COMPARE_KEY = "sougo_navi_compare_ids";

// ===========================
// 大学詳細ページ
// ===========================
export default function UniversityDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const university = getUniversityById(id);
  const mentors = getMentorsByUniversityId(id);

  const [showConsultModal, setShowConsultModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(COMPARE_KEY);
    setCompareIds(raw ? JSON.parse(raw) : []);
  }, []);

  const isCompared = compareIds.includes(id);
  const isFull = compareIds.length >= 3 && !isCompared;

  const handleCompareToggle = () => {
    const next = isCompared
      ? compareIds.filter((x) => x !== id)
      : [...compareIds, id];
    setCompareIds(next);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("compare-updated"));
  };

  if (!university) {
    return (
      <div className="min-h-screen bg-white">
        <Header variant="light" />
        <div className="text-center py-24 px-4">
          <p className="text-slate-500 mb-6">大学情報が見つかりませんでした。</p>
          <Link href="/" className="btn-primary">トップへ戻る</Link>
        </div>
      </div>
    );
  }

  const typeColor = {
    国立: "bg-purple-50 text-purple-700 border border-purple-200",
    公立: "bg-teal-50 text-teal-700 border border-teal-200",
    私立: "bg-pink-50 text-pink-700 border border-pink-200",
  };

  const sougoColor = {
    高: "text-emerald-700 bg-emerald-50 border border-emerald-200",
    中: "text-amber-700 bg-amber-50 border border-amber-200",
    低: "text-orange-700 bg-orange-50 border border-orange-200",
  };

  const handleConsult = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowConsultModal(true);
    setFormSent(false);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-white to-sky-50/50 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-violet-100/35 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Header variant="light" />

      {/* ページヘッダー */}
      <div className="relative border-b border-slate-200/60 bg-gradient-to-br from-violet-50/80 to-indigo-50/60 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="inline-flex items-center gap-1 text-slate-500 text-sm hover:text-slate-800 transition-colors">
              ← 戻る
            </Link>
            <button
              onClick={handleCompareToggle}
              disabled={isFull}
              className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl transition-all active:scale-95
                ${isCompared
                  ? "bg-indigo-500 text-white shadow-md"
                  : isFull
                    ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                    : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
                }`}
            >
              {isCompared ? "✓ 比較中" : isFull ? "比較は最大3校" : "⚖️ 比較に追加"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`badge ${typeColor[university.type]}`}>{university.type}</span>
            <span className="badge bg-slate-100 text-slate-600 border border-slate-200">{university.prefecture}</span>
            <span className={`badge ${sougoColor[university.sougoCompatibility]}`}>
              総合型選抜相性：{university.sougoCompatibility}
            </span>
          </div>
          <h1 className="font-mincho font-bold text-2xl md:text-3xl text-slate-800 mb-1">{university.name}</h1>
          <p className="text-slate-500 text-sm">{university.faculty}・{university.department}</p>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* 比較バナー */}
        {isCompared && (
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
            <p className="text-sm text-indigo-700 font-bold">✓ 比較リストに追加済みです</p>
            <Link href="/compare" className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1">
              比較ページを見る →
            </Link>
          </div>
        )}

        {/* 学びの特徴 */}
        <div className="card">
          <h2 className="font-mincho font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-indigo-500">📖</span> 学びの特徴
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">{university.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {university.features.map((f, i) => (
              <span key={i} className="badge bg-indigo-50 text-indigo-700 border border-indigo-200">{f}</span>
            ))}
          </div>
        </div>

        {/* 向いている学生像 */}
        <div className="card border-emerald-200 bg-emerald-50/60">
          <h2 className="font-mincho font-bold text-slate-800 mb-2 flex items-center gap-2">
            <span>🧑‍🎓</span> 向いている学生像
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">{university.idealStudent}</p>
        </div>

        {/* 必要になりそうな活動 */}
        <div className="card">
          <h2 className="font-mincho font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-amber-500">📋</span> 出願に向けて準備しておきたい活動
          </h2>
          <ul className="space-y-2">
            {university.requiredActivities.map((act, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                {act}
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-400 mt-3">
            ※ この情報は参考情報です。必ず各大学の募集要項を確認してください。
          </p>
        </div>

        {/* 外部リンク */}
        <div className="card">
          <h2 className="font-mincho font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span>🔗</span> 公式情報・詳細リンク
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={university.links.official}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-200"
            >
              🏫 公式サイト
            </a>
            <a
              href={university.links.admissions}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 text-sm font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-xl transition-colors border border-violet-200"
            >
              📄 入試情報
            </a>
            <a
              href={university.links.passnavi}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 text-sm font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors border border-orange-200"
            >
              🔍 パスナビ
            </a>
            {university.links.openCampus && (
              <a
                href={university.links.openCampus}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
              >
                🎪 オープンキャンパス
              </a>
            )}
          </div>
        </div>

        {/* 先輩メンター一覧 */}
        <div>
          <h2 className="font-mincho font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span>👥</span> この大学の先輩に相談する
          </h2>
          {mentors.length > 0 ? (
            <div className="space-y-4">
              {mentors.map((m) => (
                <MentorCard
                  key={m.id}
                  mentor={m}
                  universityName={university.name}
                  onConsult={handleConsult}
                />
              ))}
            </div>
          ) : (
            <div className="card text-center py-8 text-slate-500 text-sm">
              現在、この大学のメンターは準備中です。
            </div>
          )}
        </div>

        {/* 免責 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 leading-relaxed">
          ⚠️ 掲載情報は参考情報です。入試情報は変更になる場合があるため、必ず各大学の公式サイトで最新情報を確認してください。
        </div>
      </div>

      {/* 相談申込モーダル */}
      {showConsultModal && selectedMentor && (
        <ConsultModal
          mentor={selectedMentor}
          universityName={university.name}
          formSent={formSent}
          onSubmit={() => setFormSent(true)}
          onClose={() => setShowConsultModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}

// ===========================
// 相談申込モーダル
// ===========================
function ConsultModal({
  mentor,
  universityName,
  formSent,
  onSubmit,
  onClose,
}: {
  mentor: Mentor;
  universityName: string;
  formSent: boolean;
  onSubmit: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    studentName: "",
    grade: "",
    question: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("相談申込:", { mentorId: mentor.id, ...form });
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* モーダルヘッダー */}
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70">{universityName}</p>
            <p className="font-mincho font-bold">{mentor.name}に相談する</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          {formSent ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-mincho font-bold text-slate-800 mb-2">相談申込を受け付けました！</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {mentor.name}から数日以内にご連絡があります。<br />
                しばらくお待ちください。
              </p>
              <p className="text-xs text-slate-400 mb-6">
                ※ MVP版のため、実際にはメッセージは送信されていません。
              </p>
              <button onClick={onClose} className="btn-primary w-full justify-center">
                閉じる
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">お名前（ニックネームでOK）</label>
                <input
                  type="text"
                  name="studentName"
                  value={form.studentName}
                  onChange={handleChange}
                  placeholder="例：たろう"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">学年</label>
                <select
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 bg-white"
                >
                  <option value="">選択してください</option>
                  <option value="高校1年生">高校1年生</option>
                  <option value="高校2年生">高校2年生</option>
                  <option value="高校3年生">高校3年生</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">相談したいこと</label>
                <textarea
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  placeholder="例：総合型選抜の志望理由書の書き方について教えてください。"
                  required
                  rows={4}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                ※ MVP版のため、申込情報は実際には送信されません。<br />
                本番実装時にSupabaseへの保存・メール通知を追加します。
              </p>
              <button type="submit" className="btn-primary w-full justify-center py-3">
                相談申込を送る
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
