"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MentorCard from "@/components/mentor/MentorCard";
import { mentors } from "@/data/mentors";
import { universities } from "@/data/universities";
import { Mentor } from "@/types";

// ===========================
// 大学生相談ページ（内部）
// ===========================
function MentorsContent() {
  const searchParams = useSearchParams();
  const filterUnivId = searchParams.get("university") || "all";

  const [selectedUniv, setSelectedUniv] = useState<string>(filterUnivId);
  const [showModal, setShowModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [formSent, setFormSent] = useState(false);

  const filteredMentors =
    selectedUniv === "all"
      ? mentors
      : mentors.filter((m) => m.universityId === selectedUniv);

  const handleConsult = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowModal(true);
    setFormSent(false);
  };

  const getUnivName = (id: string) =>
    universities.find((u) => u.id === id)?.name || id;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* ページタイトル */}
      <div className="text-center mb-8">
        <span className="inline-block bg-primary-50 text-primary-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
          先輩メンター一覧
        </span>
        <h1 className="font-display font-black text-2xl text-gray-900 mb-2">
          実際の大学生に話を聞こう
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          各大学に在籍する先輩に、総合型選抜の体験談や大学生活を相談できます。<br />
          気になる大学の先輩を探してみましょう。
        </p>
      </div>

      {/* 大学フィルター */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button
          onClick={() => setSelectedUniv("all")}
          className={`shrink-0 px-4 py-2 text-sm font-bold rounded-full border-2 transition-colors whitespace-nowrap
            ${selectedUniv === "all"
              ? "bg-primary-600 border-primary-600 text-white"
              : "bg-white border-surface-200 text-gray-600 hover:border-primary-300"
            }`}
        >
          すべて ({mentors.length})
        </button>
        {universities.map((u) => {
          const count = mentors.filter((m) => m.universityId === u.id).length;
          return (
            <button
              key={u.id}
              onClick={() => setSelectedUniv(u.id)}
              className={`shrink-0 px-4 py-2 text-sm font-bold rounded-full border-2 transition-colors whitespace-nowrap
                ${selectedUniv === u.id
                  ? "bg-primary-600 border-primary-600 text-white"
                  : "bg-white border-surface-200 text-gray-600 hover:border-primary-300"
                }`}
            >
              {u.name.replace("大学", "大")} ({count})
            </button>
          );
        })}
      </div>

      {/* メンター一覧 */}
      {filteredMentors.length > 0 ? (
        <div className="space-y-4">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              universityName={getUnivName(mentor.universityId)}
              onConsult={handleConsult}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12 text-gray-500">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-sm">条件に合うメンターが見つかりませんでした</p>
        </div>
      )}

      {/* 注意書き */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 leading-relaxed">
        <p className="font-bold mb-1">⚠️ ご利用にあたって</p>
        <ul className="list-disc list-inside space-y-1">
          <li>メンターはすべてダミーデータです（MVP版）</li>
          <li>相談申込は実際には送信されません</li>
          <li>本番リリース時は実際の大学生メンターとマッチングします</li>
        </ul>
      </div>
    </div>
  );
}

// ===========================
// 相談申込モーダル（ページ内）
// ===========================
function ConsultModalInPage({
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
  const [form, setForm] = useState({ studentName: "", grade: "", question: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("相談申込:", { mentorId: mentor.id, ...form });
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
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
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-gray-900 mb-2">相談申込を受け付けました！</h3>
              <p className="text-sm text-gray-500 mb-4">
                {mentor.name}から数日以内にご連絡があります。
              </p>
              <p className="text-xs text-gray-400 mb-6">
                ※ MVP版のため、実際にはメッセージは送信されていません。
              </p>
              <button onClick={onClose} className="btn-primary w-full justify-center">閉じる</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">お名前</label>
                <input type="text" name="studentName" value={form.studentName} onChange={handleChange}
                  placeholder="例：たろう" required
                  className="w-full border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">学年</label>
                <select name="grade" value={form.grade} onChange={handleChange} required
                  className="w-full border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 bg-white">
                  <option value="">選択してください</option>
                  <option value="高校1年生">高校1年生</option>
                  <option value="高校2年生">高校2年生</option>
                  <option value="高校3年生">高校3年生</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">相談したいこと</label>
                <textarea name="question" value={form.question} onChange={handleChange}
                  placeholder="例：志望理由書の書き方について教えてください。"
                  required rows={4}
                  className="w-full border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 resize-none" />
              </div>
              <p className="text-xs text-gray-400">
                ※ MVP版のため申込情報は実際には送信されません。
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

// ===========================
// メインエクスポート（Suspenseラップ）
// ===========================
export default function MentorsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <Suspense fallback={<div className="text-center py-24 text-gray-400">読み込み中…</div>}>
        <MentorsContentWrapper
          onConsult={(m) => { setSelectedMentor(m); setShowModal(true); setFormSent(false); }}
        />
      </Suspense>
      {showModal && selectedMentor && (
        <ConsultModalInPage
          mentor={selectedMentor}
          universityName={universities.find(u => u.id === selectedMentor.universityId)?.name || ""}
          formSent={formSent}
          onSubmit={() => setFormSent(true)}
          onClose={() => setShowModal(false)}
        />
      )}
      <Footer />
    </div>
  );
}

// SearchParams を使う部分だけ Suspense 内に
function MentorsContentWrapper({ onConsult }: { onConsult: (m: Mentor) => void }) {
  const searchParams = useSearchParams();
  const filterUnivId = searchParams.get("university") || "all";
  const [selectedUniv, setSelectedUniv] = useState<string>(filterUnivId);

  const filteredMentors =
    selectedUniv === "all"
      ? mentors
      : mentors.filter((m) => m.universityId === selectedUniv);

  const getUnivName = (id: string) =>
    universities.find((u) => u.id === id)?.name || id;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <span className="inline-block bg-primary-50 text-primary-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
          先輩メンター一覧
        </span>
        <h1 className="font-display font-black text-2xl text-gray-900 mb-2">
          実際の大学生に話を聞こう
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          各大学に在籍する先輩に、総合型選抜の体験談や大学生活を相談できます。
        </p>
      </div>

      {/* 大学フィルター */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        <button
          onClick={() => setSelectedUniv("all")}
          className={`shrink-0 px-4 py-2 text-sm font-bold rounded-full border-2 transition-colors whitespace-nowrap
            ${selectedUniv === "all" ? "bg-primary-600 border-primary-600 text-white" : "bg-white border-surface-200 text-gray-600 hover:border-primary-300"}`}
        >
          すべて ({mentors.length})
        </button>
        {universities.map((u) => {
          const count = mentors.filter((m) => m.universityId === u.id).length;
          return (
            <button key={u.id} onClick={() => setSelectedUniv(u.id)}
              className={`shrink-0 px-4 py-2 text-sm font-bold rounded-full border-2 transition-colors whitespace-nowrap
                ${selectedUniv === u.id ? "bg-primary-600 border-primary-600 text-white" : "bg-white border-surface-200 text-gray-600 hover:border-primary-300"}`}
            >
              {u.name.replace("大学", "大").replace("（APU）", "")} ({count})
            </button>
          );
        })}
      </div>

      {/* メンター一覧 */}
      {filteredMentors.length > 0 ? (
        <div className="space-y-4">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor}
              universityName={getUnivName(mentor.universityId)}
              onConsult={onConsult} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12 text-gray-500">
          <p className="text-sm">条件に合うメンターが見つかりませんでした</p>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 leading-relaxed">
        <p className="font-bold mb-1">⚠️ MVP版のご注意</p>
        <ul className="list-disc list-inside space-y-1">
          <li>メンターはすべてダミーデータです</li>
          <li>相談申込は実際には送信されません</li>
          <li>本番では実際の大学生メンターとマッチングします</li>
        </ul>
      </div>
    </div>
  );
}
