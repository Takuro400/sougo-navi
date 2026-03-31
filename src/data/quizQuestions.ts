import { QuizQuestion } from "@/types";

// ===========================
// 診断質問データ（15問・5軸設計）
// 軸①何を学びたいか (Q1-Q3)
// 軸②どう学びたいか (Q4-Q6)
// 軸③どこで・どんな環境で学びたいか (Q7-Q9)
// 軸④卒業後どうなりたいか (Q10-Q12)
// 軸⑤今の自分の状況 (Q13-Q15)
// ===========================

export const quizQuestions: QuizQuestion[] = [

  // ── 追加問①：学年（Q0）──────────────────────────────────────────
  {
    id: "q_grade",
    category: "academic",
    text: "今の学年を教えてください",
    options: [
      { value: "a", label: "高校1年生", tags: ["high1"] },
      { value: "b", label: "高校2年生", tags: ["high2"] },
      { value: "c", label: "高校3年生", tags: ["high3"] },
      { value: "d", label: "浪人生",    tags: ["ronin"] },
      { value: "e", label: "その他",    tags: ["other"] },
    ],
  },

  // ── 軸①：何を学びたいか（Q1〜Q3）──────────────────────────────

  {
    id: "q1",
    category: "interest",
    text: "学校の授業や勉強の中で、一番「面白い・好き」と感じる科目・分野は？",
    options: [
      {
        value: "a",
        label: "数学・物理・化学・情報など理系科目（論理や仕組みを考えるのが好き）",
        tags: ["stem", "tech", "engineering", "math"],
      },
      {
        value: "b",
        label: "英語・世界史・地理など語学・国際系の科目（外の世界に興味がある）",
        tags: ["global", "international", "english", "language"],
      },
      {
        value: "c",
        label: "国語・倫理・歴史・現代文など文系科目（言葉や人間・社会を深く考えるのが好き）",
        tags: ["humanities", "culture", "interdisciplinary", "social"],
      },
      {
        value: "d",
        label: "体育・家庭科・芸術・音楽など実技系科目（体を動かしたり作ったりするのが好き）",
        tags: ["hands-on", "practical", "community", "welfare"],
      },
    ],
  },
  {
    id: "q2",
    category: "career",
    text: "将来、社会のどんな問題・課題を解決したいと思いますか？",
    options: [
      {
        value: "a",
        label: "気候変動・エネルギー・AI・テクノロジーなど地球規模の問題を科学や技術で解決したい",
        tags: ["stem", "engineering", "global", "innovation"],
      },
      {
        value: "b",
        label: "地域の過疎化・若者が戻れる町づくり・地元の経済や文化を守る活動に関わりたい",
        tags: ["community", "social", "kyushu", "fieldwork"],
      },
      {
        value: "c",
        label: "医療格差・高齢化・子どもの貧困など、身近な社会的弱者を支える仕組みを作りたい",
        tags: ["welfare", "medical", "community", "social"],
      },
      {
        value: "d",
        label: "ビジネスや起業で新しい価値を生み出し、経済・産業・社会の仕組みを変えたい",
        tags: ["business", "entrepreneurship", "innovation", "leadership"],
      },
    ],
  },
  {
    id: "q3",
    category: "campus_life",
    text: "大学の4年間で、これだけは絶対やってみたいと思うことは？",
    options: [
      {
        value: "a",
        label: "海外留学・国際交流プログラム・外国人と一緒に学ぶ環境に飛び込む",
        tags: ["global", "international", "english", "language"],
      },
      {
        value: "b",
        label: "研究室で専門的な実験・研究・論文執筆に取り組み、学問の最前線に触れる",
        tags: ["stem", "tech", "engineering", "innovation"],
      },
      {
        value: "c",
        label: "インターンシップ・学生起業・社会課題解決プロジェクトに挑戦する",
        tags: ["business", "entrepreneurship", "leadership", "practical"],
      },
      {
        value: "d",
        label: "ボランティア・地域連携・NPO活動など、現場で人や社会の役に立つ経験を積む",
        tags: ["community", "welfare", "social", "fieldwork"],
      },
    ],
  },

  // ── 軸②：どう学びたいか（Q4〜Q6）──────────────────────────────

  {
    id: "q4",
    category: "learning",
    text: "新しいことを学ぶとき、一番「自分に合う」と感じる勉強スタイルは？",
    options: [
      {
        value: "a",
        label: "実験・実習・手を動かして試行錯誤しながら体験的に学ぶ",
        tags: ["hands-on", "practical", "stem", "engineering"],
      },
      {
        value: "b",
        label: "グループでのディスカッション・発表・議論を通じて理解を深める",
        tags: ["business", "collaborative", "leadership", "entrepreneurship"],
      },
      {
        value: "c",
        label: "現場に出てフィールドワーク・インタビュー・観察から学ぶ",
        tags: ["fieldwork", "community", "social", "welfare"],
      },
      {
        value: "d",
        label: "一人で本や論文を読み込み、じっくり考えながら理解を積み上げる",
        tags: ["humanities", "interdisciplinary", "culture", "tech"],
      },
    ],
  },
  {
    id: "q5",
    category: "personality",
    text: "グループ作業と一人作業、あなたはどちらが得意（または好き）ですか？",
    options: [
      {
        value: "a",
        label: "グループが得意・みんなで協力してひとつのものを作り上げるのが好き",
        tags: ["collaborative", "community", "business", "social"],
      },
      {
        value: "b",
        label: "リーダーとしてチームを引っ張ったり、プロジェクトを仕切るのが好き",
        tags: ["leadership", "entrepreneurship", "business", "innovation"],
      },
      {
        value: "c",
        label: "一人で黙々と作業・研究・制作に集中するのが得意",
        tags: ["stem", "tech", "engineering", "humanities"],
      },
      {
        value: "d",
        label: "どちらでもOK・状況や役割に合わせて柔軟に動ける",
        tags: ["interdisciplinary", "global", "practical", "collaborative"],
      },
    ],
  },
  {
    id: "q6",
    category: "personality",
    text: "何かに失敗したり、うまくいかなかったとき、あなたはどう対処しますか？",
    options: [
      {
        value: "a",
        label: "失敗の原因をデータや事実で分析して、論理的に次の改善策を考える",
        tags: ["stem", "tech", "engineering", "math"],
      },
      {
        value: "b",
        label: "気持ちを素早く切り替えて、すぐに次の行動・チャレンジに移る",
        tags: ["entrepreneurship", "leadership", "business", "innovation"],
      },
      {
        value: "c",
        label: "信頼できる人に相談し、周りの意見を聞きながら一緒に解決策を探す",
        tags: ["community", "welfare", "social", "collaborative"],
      },
      {
        value: "d",
        label: "じっくり振り返り、自分なりの気づきや教訓を言葉にして整理する",
        tags: ["humanities", "interdisciplinary", "culture", "global"],
      },
    ],
  },

  // ── 軸③：どこで・どんな環境で学びたいか（Q7〜Q9）──────────────

  {
    id: "q7",
    category: "campus_life",
    text: "大学のキャンパスや学習環境として、一番魅力的だと思うのは？",
    options: [
      {
        value: "a",
        label: "最新の研究設備・実験室・専門機器が充実した理系・研究重視の環境",
        tags: ["stem", "tech", "engineering", "innovation"],
      },
      {
        value: "b",
        label: "留学生・外国人教員が多く、英語でも授業が受けられる国際的な環境",
        tags: ["global", "international", "english", "language"],
      },
      {
        value: "c",
        label: "地域や企業・NPOとの連携が活発で、フィールドワークや実践活動が多い環境",
        tags: ["community", "fieldwork", "social", "welfare"],
      },
      {
        value: "d",
        label: "ビジネスコンテスト・インターン・起業支援など実践的なチャンスが多い環境",
        tags: ["business", "entrepreneurship", "leadership", "practical"],
      },
    ],
  },
  {
    id: "q8",
    category: "location",
    text: "大学を選ぶうえで、住む場所・地域についてどう考えていますか？",
    options: [
      {
        value: "a",
        label: "地元（九州・沖縄内）で学びたい・家から通える範囲を優先したい",
        tags: ["kyushu", "local", "community", "national"],
      },
      {
        value: "b",
        label: "東京・大阪・名古屋などの大都市に出て、刺激的な環境で学びたい",
        tags: ["nationwide", "business", "innovation", "leadership"],
      },
      {
        value: "c",
        label: "国内ならどこでもOK・学びの質や大学の環境を最優先に選びたい",
        tags: ["nationwide", "stem", "global", "interdisciplinary"],
      },
      {
        value: "d",
        label: "海外への留学や、海外大学への進学も積極的に視野に入れている",
        tags: ["global", "international", "english", "language"],
      },
    ],
  },
  {
    id: "q9",
    category: "school_type",
    text: "国公立大学と私立大学、どちらを希望しますか？",
    options: [
      {
        value: "a",
        label: "国公立大学を第一志望にしたい（学費・研究環境・ブランドを重視）",
        tags: ["national", "public", "stem"],
      },
      {
        value: "b",
        label: "国公立が第一希望だが、私立の特色ある学部も視野に入れている",
        tags: ["national", "public", "private"],
      },
      {
        value: "c",
        label: "私立でもよい・大学の個性・専門性・キャンパスの雰囲気を重視したい",
        tags: ["private", "business", "global"],
      },
      {
        value: "d",
        label: "国公立・私立にこだわらず、自分に一番合う大学を総合的に選びたい",
        tags: ["national", "public", "private", "interdisciplinary"],
      },
    ],
  },

  // ── 軸④：卒業後どうなりたいか（Q10〜Q12）──────────────────────

  {
    id: "q10",
    category: "graduation_vision",
    text: "10年後、どんな場面で活躍している自分を想像しますか？",
    options: [
      {
        value: "a",
        label: "AIや最先端テクノロジー・研究開発の現場で革新的なプロダクトを生み出している",
        tags: ["tech", "stem", "engineering", "innovation"],
      },
      {
        value: "b",
        label: "起業家・経営者として自分のビジネスや組織を率い、社会に新しい価値を届けている",
        tags: ["business", "entrepreneurship", "leadership", "innovation"],
      },
      {
        value: "c",
        label: "医療・教育・福祉・地域の現場で、目の前の人の生活や人生を支えている",
        tags: ["welfare", "medical", "community", "social"],
      },
      {
        value: "d",
        label: "海外の組織・国際機関・グローバルなプロジェクトで世界を相手に仕事している",
        tags: ["global", "international", "english", "language"],
      },
    ],
  },
  {
    id: "q11",
    category: "graduation_vision",
    text: "卒業後、どんな場所・組織で働くイメージを持っていますか？",
    options: [
      {
        value: "a",
        label: "大企業・官公庁・研究機関など安定した組織で専門性を活かしたい",
        tags: ["national", "public", "stem", "humanities"],
      },
      {
        value: "b",
        label: "スタートアップ・社会起業・NPO・自分で立ち上げた組織で働きたい",
        tags: ["business", "entrepreneurship", "innovation", "leadership"],
      },
      {
        value: "c",
        label: "地域・コミュニティ・医療・福祉の現場に密着した職場で働きたい",
        tags: ["community", "welfare", "social", "fieldwork"],
      },
      {
        value: "d",
        label: "海外・国際機関・外資系・国を超えたプロジェクトの現場で働きたい",
        tags: ["global", "international", "english", "language"],
      },
    ],
  },
  {
    id: "q12",
    category: "career",
    text: "仕事を選ぶとき、「お金・やりがい・安定」のどれを最も優先しますか？",
    options: [
      {
        value: "a",
        label: "安定・将来の安心を最優先（公務員・大手企業・年金が安心な職業）",
        tags: ["national", "public", "humanities", "community"],
      },
      {
        value: "b",
        label: "やりがい・使命感を最優先（多少収入が低くても自分が信じる仕事がしたい）",
        tags: ["welfare", "community", "social", "fieldwork"],
      },
      {
        value: "c",
        label: "高収入・キャリアアップを最優先（成果を出して稼ぎ、どんどん上を目指したい）",
        tags: ["business", "entrepreneurship", "leadership", "innovation"],
      },
      {
        value: "d",
        label: "自由・裁量を最優先（自分のペースや判断で動ける働き方・フリーランスも視野）",
        tags: ["interdisciplinary", "global", "tech", "humanities"],
      },
    ],
  },

  // ── 軸⑤：今の自分の状況（Q13〜Q15）────────────────────────────

  {
    // ⚠️ このIDはmatchingEngine.ts（calcReadinessLevel）で参照されています
    // a=hensachi-high, b=hensachi-mid-high の順序を変えないでください
    id: "q13",
    category: "academic",
    text: "今の自分の学力・偏差値はどのくらいだと思いますか？",
    options: [
      {
        value: "a",
        label: "模試の偏差値が60以上・学校内でも上位の成績（難関大も視野に入る）",
        tags: ["hensachi-high", "high-academic"],
      },
      {
        value: "b",
        label: "模試の偏差値が53〜59・平均より上（中堅上位〜難関を目指している）",
        tags: ["hensachi-mid-high", "mid-high-academic"],
      },
      {
        value: "c",
        label: "模試の偏差値が46〜52・平均的なレベル（中堅大学を中心に考えている）",
        tags: ["hensachi-mid", "mid-academic"],
      },
      {
        value: "d",
        label: "模試の偏差値が45以下、またはまだよく分からない（挑戦しやすい大学も見ている）",
        tags: ["hensachi-low", "specialty-academic"],
      },
    ],
  },
  {
    id: "q14",
    category: "activity",
    text: "高校でこれまで一番力を入れたこと（またはこれから力を入れたいこと）は？",
    options: [
      {
        value: "a",
        label: "スポーツ・音楽・演劇など、競技や発表系の部活動（大会・コンクールに向け本気で取り組んだ）",
        tags: ["hands-on", "collaborative", "leadership", "practical"],
      },
      {
        value: "b",
        label: "プログラミング・科学研究・数学・ロボット系の活動（コンテストや探究活動に挑戦した）",
        tags: ["tech", "stem", "engineering", "innovation"],
      },
      {
        value: "c",
        label: "ボランティア・地域活動・国際交流・環境問題への取り組み（社会と関わる活動をした）",
        tags: ["community", "welfare", "social", "global"],
      },
      {
        value: "d",
        label: "生徒会・学校行事の企画・部活や委員会のリーダー（人をまとめる立場を経験した）",
        tags: ["leadership", "entrepreneurship", "business", "collaborative"],
      },
    ],
  },
  {
    id: "q15",
    category: "academic",
    text: "総合型選抜（AO入試）に向けた準備は、今どのくらい進んでいますか？",
    options: [
      {
        value: "a",
        label: "志望理由や自己PRをすでに考えている・書いたことがある（かなり準備が進んでいる）",
        tags: ["high-academic", "practical", "humanities"],
      },
      {
        value: "b",
        label: "学びたいことや将来像はあるが、まだ言葉にできていない（これから本格的に動く）",
        tags: ["mid-high-academic", "interdisciplinary", "global"],
      },
      {
        value: "c",
        label: "何から始めればいいかよく分からない・情報収集を始めたばかり",
        tags: ["mid-academic", "community", "social"],
      },
      {
        value: "d",
        label: "総合型より一般入試のほうが向いていると思っている・学力重視で進む予定",
        tags: ["specialty-academic", "stem", "tech"],
      },
    ],
  },

  // ── 追加問②：困っていること（最終問）─────────────────────────────
  {
    id: "q_concern",
    category: "activity",
    text: "総合型選抜の対策で、今一番困っていることは何ですか？",
    options: [
      {
        value: "a",
        label: "志望校・学部が決まらない",
        tags: ["needs-university-advice", "sougo-beginner"],
      },
      {
        value: "b",
        label: "志望理由書・自己PRの書き方が分からない",
        tags: ["needs-writing-support", "sougo-aware"],
      },
      {
        value: "c",
        label: "面接・プレゼンが不安",
        tags: ["needs-interview-support", "sougo-aware"],
      },
      {
        value: "d",
        label: "活動実績・課外活動が足りない気がする",
        tags: ["needs-activity-support", "sougo-aware"],
      },
    ],
  },
];
