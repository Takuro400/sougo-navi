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
    // ヘッダーのカウントバッジを更新
    window.dispatchEvent(new Event("compare-updated"));
  };

  if (!university) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="text-center py-24 px-4">
          <p className="text-gray-500 mb-6">大学情報が見つかりませんでした。</p>
          <Link href="/" className="btn-primary">トップへ戻る</Link>
        </div>
      </div>
    );
  }

  const typeColor = {
    国立: "bg-purple-100 text-purple-700",
    公立: "bg-teal-100 text-teal-700",
    私立: "bg-pink-100 text-pink-700",
  };

  const sougoColor = {
    高: "text-green-700 bg-green-100",
    中: "text-yellow-700 bg-yellow-100",
    低: "text-orange-700 bg-orange-100",
  };

  const handleConsult = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowConsultModal(true);
    setFormSent(false);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />

      {/* ページヘッダー */}
      <div className="bg-gradient-to-br from-primary-700 to-indigo-800 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="inline-flex items-center gap-1 text-white/70 text-sm hover:text-white transition-colors">
              ← 戻る
            </Link>
            <button
              onClick={handleCompareToggle}
              disabled={isFull}
              className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl transition-all active:scale-95
                ${isCompared
                  ? "bg-white text-primary-700 shadow-md"
                  : isFull
                    ? "bg-white/20 text-white/40 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30 text-white border border-white/40"
                }`}
            >
              {isCompared ? "✓ 比較中" : isFull ? "比較は最大3校" : "⚖️ 比較に追加"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`badge ${typeColor[university.type]}`}>{university.type}</span>
            <span className="badge bg-white/20 text-white">{university.prefecture}</span>
            <span className={`badge ${sougoColor[university.sougoCompatibility]}`}>
              総合型選抜相性：{university.sougoCompatibility}
            </span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl mb-1">{university.name}</h1>
          <p className="text-white/80 text-sm">{university.faculty}・{university.department}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* 比較バナー */}
        {isCompared && (
          <div className="flex items-center justify-between bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
            <p className="text-sm text-primary-700 font-bold">✓ 比較リストに追加済みです</p>
            <Link href="/compare" className="text-sm font-bold text-primary-600 hover:underline flex items-center gap-1">
              比較ページを見る →
            </Link>
          </div>
        )}

        {/* 学びの特徴 */}
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-primary-500">📖</span> 学びの特徴
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{university.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {university.features.map((f, i) => (
              <span key={i} className="badge bg-primary-50 text-primary-700">{f}</span>
            ))}
          </div>
        </div>

        {/* 向いている学生像 */}
        <div className="card border-green-100 bg-green-50">
          <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span>🧑‍🎓</span> 向いている学生像
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{university.idealStudent}</p>
        </div>

        {/* 必要になりそうな活動 */}
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-accent-500">📋</span> 出願に向けて準備しておきたい活動
          </h2>
          <ul className="space-y-2">
            {university.requiredActivities.map((act, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-accent-100 text-accent-600 text-xs font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                {act}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-3">
            ※ この情報は参考情報です。必ず各大学の募集要項を確認してください。
          </p>
        </div>

        {/* 外部リンク */}
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>🔗</span> 公式情報・詳細リンク
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={university.links.official}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 text-sm font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors border border-primary-100"
            >
              🏫 公式サイト
            </a>
            <a
              href={university.links.admissions}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-100"
            >
              📄 入試情報
            </a>
            <a
              href={university.links.passnavi}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 text-sm font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors border border-orange-100"
            >
              🔍 パスナビ
            </a>
            {university.links.openCampus && (
              <a
                href={university.links.openCampus}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 text-sm font-bold text-green-700 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-100"
              >
                🎪 オープンキャンパス
              </a>
            )}
          </div>
        </div>

        {/* 先輩メンター一覧 */}
        <div>
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
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
            <div className="card text-center py-8 text-gray-500 text-sm">
              現在、この大学のメンターは準備中です。
            </div>
          )}
        </div>

        {/* 免責 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800 leading-relaxed">
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
    // MVP: 実際にはSupabaseへ保存。今はダミー送信
    console.log("相談申込:", { mentorId: mentor.id, ...form });
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* モーダルヘッダー */}
        <div className="bg-primary-600 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70">{universityName}</p>
            <p className="font-bold">{mentor.name}に相談する</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          {formSent ? (
            // 送信完了画面
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-gray-900 mb-2">相談申込を受け付けました！</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                {mentor.name}から数日以内にご連絡があります。<br />
                しばらくお待ちください。
              </p>
              <p className="text-xs text-gray-400 mb-6">
                ※ MVP版のため、実際にはメッセージは送信されていません。
              </p>
              <button onClick={onClose} className="btn-primary w-full justify-center">
                閉じる
              </button>
            </div>
          ) : (
            // 申込フォーム
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">お名前（ニックネームでOK）</label>
                <input
                  type="text"
                  name="studentName"
                  value={form.studentName}
                  onChange={handleChange}
                  placeholder="例：たろう"
                  required
                  className="w-full border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">学年</label>
                <select
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  required
                  className="w-full border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 bg-white"
                >
                  <option value="">選択してください</option>
                  <option value="高校1年生">高校1年生</option>
                  <option value="高校2年生">高校2年生</option>
                  <option value="高校3年生">高校3年生</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">相談したいこと</label>
                <textarea
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  placeholder="例：総合型選抜の志望理由書の書き方について教えてください。"
                  required
                  rows={4}
                  className="w-full border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 resize-none"
                />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
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
