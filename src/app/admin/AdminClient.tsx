"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type DiagnosisRow = {
  id: string;
  created_at: string;
  user_type: string | null;
  top_university: string | null;
  top_faculty: string | null;
  score: number | null;
  prefecture: string | null;
  line_clicked: boolean;
  answers: Record<string, unknown> | null;
};

const SESSION_KEY = "admin_authed";
const ADMIN_PASSWORD = "sougougata1019";

// ─── グラフバー（シンプルCSS） ─────────────────────────
function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2 text-sm">
          <span className="w-24 shrink-0 text-right text-slate-500 truncate text-xs">{d.label}</span>
          <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="w-6 text-slate-700 font-bold text-xs shrink-0">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── ドーナツ風の円グラフ（SVG） ──────────────────────
function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <p className="text-slate-400 text-sm">データなし</p>;
  let cumulative = 0;
  const cx = 70, cy = 70, r = 50;
  const slices = data.map((d) => {
    const pct = d.value / total;
    const start = cumulative;
    cumulative += pct;
    const startAngle = start * 2 * Math.PI - Math.PI / 2;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = pct > 0.5 ? 1 : 0;
    return { ...d, path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z` };
  });
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {slices.map((s) => (
          <path key={s.label} d={s.path} fill={s.color} />
        ))}
        <circle cx={cx} cy={cy} r={28} fill="white" />
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="12" fill="#64748b">{total}</text>
      </svg>
      <div className="space-y-1.5">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="truncate max-w-[120px]">{s.label}</span>
            <span className="font-bold text-slate-800 ml-1">{s.value}</span>
            <span className="text-slate-400">({Math.round((s.value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── メインコンポーネント ─────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);

  const [rows, setRows] = useState<DiagnosisRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // セッション復元
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("diagnosis_results")
      .select("id, created_at, user_type, top_university, top_faculty, score, prefecture, line_clicked, answers")
      .order("created_at", { ascending: false })
      .limit(500);
    if (err) {
      setError(err.message);
    } else {
      setRows((data as DiagnosisRow[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  // ─── パスワード画面 ───────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-slate-800 mb-1">管理者ページ</h1>
          <p className="text-sm text-slate-400 mb-6">パスワードを入力してください</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="パスワード"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 mb-3"
          />
          {pwError && <p className="text-red-500 text-xs mb-3">パスワードが違います</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
          >
            ログイン
          </button>
        </div>
      </div>
    );
  }

  // ─── 集計 ────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10);
  const totalCount = rows.length;
  const todayCount = rows.filter((r) => r.created_at.slice(0, 10) === today).length;
  const lineCount = rows.filter((r) => r.line_clicked).length;

  // 大学TOP3
  const univCount: Record<string, number> = {};
  rows.forEach((r) => {
    if (r.top_university) univCount[r.top_university] = (univCount[r.top_university] ?? 0) + 1;
  });
  const top3Univs = Object.entries(univCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // 都道府県別
  const prefCount: Record<string, number> = {};
  rows.forEach((r) => {
    if (r.prefecture) prefCount[r.prefecture] = (prefCount[r.prefecture] ?? 0) + 1;
  });
  const prefData = Object.entries(prefCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([label, value]) => ({ label, value }));

  // ユーザータイプ別
  const typeCount: Record<string, number> = {};
  rows.forEach((r) => {
    if (r.user_type) typeCount[r.user_type] = (typeCount[r.user_type] ?? 0) + 1;
  });
  const typeColors = [
    "#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#14b8a6",
  ];
  const typeData = Object.entries(typeCount)
    .sort((a, b) => b[1] - a[1])
    .map(([label, value], i) => ({ label, value, color: typeColors[i % typeColors.length] }));

  // ─── ダッシュボード ───────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold text-slate-800">📊 管理者ダッシュボード</h1>
          <p className="text-xs text-slate-400">sougo-navi 診断結果分析</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="text-xs bg-indigo-50 text-indigo-600 font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            {loading ? "読込中…" : "↻ 更新"}
          </button>
          <button
            onClick={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            ログアウト
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
            ⚠️ エラー: {error}
          </div>
        )}

        {/* ── 1. サマリーカード ── */}
        <section>
          <h2 className="text-base font-bold text-slate-700 mb-3">サマリー</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard label="総診断数" value={totalCount} icon="🎯" color="indigo" />
            <SummaryCard label="今日の診断数" value={todayCount} icon="📅" color="violet" />
            <SummaryCard label="LINE誘導クリック数" value={lineCount} icon="💬" color="green" />
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <p className="text-xs text-slate-400 mb-2">🏆 人気大学TOP3</p>
              {top3Univs.length === 0
                ? <p className="text-slate-300 text-sm">データなし</p>
                : top3Univs.map(([name, cnt], i) => (
                  <div key={name} className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-amber-400">{i + 1}.</span>
                    <span className="text-xs text-slate-700 truncate flex-1">{name}</span>
                    <span className="text-xs font-bold text-slate-500">{cnt}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        {/* ── 2. グラフ ── */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* 都道府県別 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-base font-bold text-slate-700 mb-4">📍 都道府県別集計</h2>
            {prefData.length === 0
              ? <p className="text-slate-400 text-sm">データなし</p>
              : <BarChart data={prefData} />
            }
          </div>

          {/* ユーザータイプ別 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-base font-bold text-slate-700 mb-4">👤 ユーザータイプ別集計</h2>
            <DonutChart data={typeData} />
          </div>
        </section>

        {/* ── 3. 診断結果一覧 ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-700">📋 診断結果一覧（最新{Math.min(rows.length, 500)}件）</h2>
            <span className="text-xs text-slate-400">{rows.length}件</span>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {["日時","ユーザータイプ","1位の大学","学部","スコア","都道府県","LINE"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-slate-500 font-bold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                        {loading ? "読み込み中…" : "データがありません"}
                      </td>
                    </tr>
                  ) : (
                    rows.map((r, i) => (
                      <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">
                          {new Date(r.created_at).toLocaleString("ja-JP", {
                            month: "2-digit", day: "2-digit",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                            {r.user_type ?? "—"}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-700 max-w-[140px] truncate">{r.top_university ?? "—"}</td>
                        <td className="px-4 py-2.5 text-slate-500 max-w-[120px] truncate">{r.top_faculty ?? "—"}</td>
                        <td className="px-4 py-2.5 font-bold text-slate-700">{r.score ?? "—"}</td>
                        <td className="px-4 py-2.5 text-slate-500">{r.prefecture ?? "—"}</td>
                        <td className="px-4 py-2.5">
                          {r.line_clicked
                            ? <span className="text-green-600 font-bold">✓ クリック</span>
                            : <span className="text-slate-300">—</span>
                          }
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Vercel環境変数設定メモ ── */}
        <section className="bg-slate-800 text-slate-300 rounded-2xl p-5 text-xs font-mono">
          <p className="font-bold text-slate-100 mb-2">Vercel環境変数の追加コマンド</p>
          <p className="mb-1 text-slate-400"># 以下のコマンドをターミナルで実行してください</p>
          <p>vercel env add NEXT_PUBLIC_SUPABASE_URL</p>
          <p>vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
        </section>
      </main>
    </div>
  );
}

// ─── サマリーカード ────────────────────────────────────
function SummaryCard({
  label, value, icon, color,
}: {
  label: string;
  value: number;
  icon: string;
  color: "indigo" | "violet" | "green";
}) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    violet: "bg-violet-50 text-violet-600",
    green: "bg-green-50 text-green-600",
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-lg mb-3 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-2xl font-black text-slate-800">{value.toLocaleString()}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}
