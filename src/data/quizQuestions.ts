import { QuizQuestion } from "@/types";

// ===========================
// 診断質問データ（15問）
// 順番：答えやすい具体的な行動ベース → 深い価値観・ビジョン系
// ===========================

export const quizQuestions: QuizQuestion[] = [
  // ── ① 答えやすい・具体的な行動ベース（Q1〜Q5）──────────────────
  {
    id: "q1",
    category: "interest",
    text: "自由な休日、気づいたら自然にやっていることに一番近いのは？",
    options: [
      {
        value: "a",
        label: "パソコンやスマホで何かを作ったり、仕組みを調べている（プログラム・ゲーム・DIYなど）",
        tags: ["tech", "stem", "engineering", "hands-on"],
      },
      {
        value: "b",
        label: "SNSやニュースでビジネス・社会の動きをチェックしたり、アイデアを考えている",
        tags: ["business", "entrepreneurship", "innovation", "leadership"],
      },
      {
        value: "c",
        label: "友達と出かけたり、地域のイベント・ボランティアに顔を出している",
        tags: ["community", "social", "collaborative", "fieldwork"],
      },
      {
        value: "d",
        label: "本・映画・音楽・アートなど文化的なコンテンツに触れてゆっくり過ごしている",
        tags: ["humanities", "culture", "interdisciplinary", "language"],
      },
    ],
  },
  {
    id: "q2",
    category: "personality",
    text: "友達や周囲から「あなたに頼みたい」「向いてそう」と言われることは？",
    options: [
      {
        value: "a",
        label: "調べ物・データ整理・パソコンや機械のトラブル対応",
        tags: ["tech", "stem", "engineering", "math"],
      },
      {
        value: "b",
        label: "計画を立てること・みんなをまとめること・企画を仕切ること",
        tags: ["leadership", "entrepreneurship", "business", "collaborative"],
      },
      {
        value: "c",
        label: "悩みを聞くこと・人と人をつなぐこと・気持ちに寄り添うこと",
        tags: ["welfare", "community", "social", "collaborative"],
      },
      {
        value: "d",
        label: "英語の翻訳・海外のこと・異文化の話をすること",
        tags: ["global", "international", "english", "language"],
      },
    ],
  },
  {
    id: "q3",
    category: "subject",
    text: "学校の授業で「楽しい」「得意」と感じるのはどれですか？",
    options: [
      {
        value: "a",
        label: "数学・物理・化学・情報（理系科目）",
        tags: ["stem", "tech", "engineering", "math"],
      },
      {
        value: "b",
        label: "英語・外国語（読む・話す・書く全般）",
        tags: ["global", "international", "english", "language"],
      },
      {
        value: "c",
        label: "国語・歴史・倫理・現代社会（文系科目）",
        tags: ["humanities", "culture", "social", "interdisciplinary"],
      },
      {
        value: "d",
        label: "体育・芸術・音楽・家庭・情報実習（実技系）",
        tags: ["hands-on", "practical", "community", "welfare"],
      },
    ],
  },
  {
    id: "q4",
    category: "info_gathering",
    text: "YouTubeや本で「つい見てしまう・読んでしまう」コンテンツのジャンルは？",
    options: [
      {
        value: "a",
        label: "テック・AI・プログラミング・科学・宇宙系",
        tags: ["tech", "stem", "engineering", "innovation"],
      },
      {
        value: "b",
        label: "ビジネス・起業家・自己啓発・社会の仕組みを変える話",
        tags: ["business", "entrepreneurship", "leadership", "innovation"],
      },
      {
        value: "c",
        label: "社会問題・環境・ドキュメンタリー・地域の取り組み",
        tags: ["community", "social", "welfare", "fieldwork"],
      },
      {
        value: "d",
        label: "旅行・異文化・語学学習・海外の暮らし・グローバルな話題",
        tags: ["global", "international", "english", "culture"],
      },
    ],
  },
  {
    id: "q5",
    category: "activity",
    text: "高校で一番力を入れた（またはこれから入れたい）活動は？",
    options: [
      {
        value: "a",
        label: "スポーツ・音楽・演劇など競技・発表系の部活動",
        tags: ["hands-on", "collaborative", "leadership", "practical"],
      },
      {
        value: "b",
        label: "プログラミング・ロボット・科学研究・探究活動",
        tags: ["tech", "stem", "engineering", "innovation"],
      },
      {
        value: "c",
        label: "ボランティア・地域活動・国際交流・環境活動",
        tags: ["community", "welfare", "social", "global"],
      },
      {
        value: "d",
        label: "生徒会・学校行事の企画・部活や委員会のリーダー",
        tags: ["leadership", "entrepreneurship", "business", "collaborative"],
      },
    ],
  },

  // ── ② 中間・学習スタイル・条件系（Q6〜Q10）────────────────────
  {
    // ⚠️ このIDはmatchingEngine.ts（calcReadinessLevel）で参照されています
    // a=high-academic, b=mid-high-academic の順序を変えないでください
    id: "q6",
    category: "academic",
    text: "現在の成績・評定について率直に教えてください",
    options: [
      {
        value: "a",
        label: "評定平均4.0以上・成績は上位",
        tags: ["high-academic"],
      },
      {
        value: "b",
        label: "評定平均3.5〜4.0・平均より上",
        tags: ["mid-high-academic"],
      },
      {
        value: "c",
        label: "評定平均3.0〜3.5・平均的",
        tags: ["mid-academic"],
      },
      {
        value: "d",
        label: "評定は気にしていない・得意なことに特化している",
        tags: ["specialty-academic"],
      },
    ],
  },
  {
    id: "q7",
    category: "learning",
    text: "新しいことを学ぶとき、一番「自分に合う」と感じる方法は？",
    options: [
      {
        value: "a",
        label: "実際に手を動かし、試行錯誤しながら体験して身につける",
        tags: ["hands-on", "practical", "stem", "engineering"],
      },
      {
        value: "b",
        label: "みんなでディスカッションし、意見をぶつけ合いながら深める",
        tags: ["business", "collaborative", "entrepreneurship", "leadership"],
      },
      {
        value: "c",
        label: "現場に出て、実際の人や地域と関わりながら学ぶ",
        tags: ["fieldwork", "community", "social", "welfare"],
      },
      {
        value: "d",
        label: "英語や海外の情報・視点を取り入れながら広く学ぶ",
        tags: ["global", "international", "english", "language"],
      },
    ],
  },
  {
    id: "q8",
    category: "personality",
    text: "困っている人を見かけたとき、自然と出てくる行動に一番近いのは？",
    options: [
      {
        value: "a",
        label: "すぐに声をかけて、直接助けに行く",
        tags: ["welfare", "community", "social", "collaborative"],
      },
      {
        value: "b",
        label: "状況を分析して、一番効率的な解決方法を考える",
        tags: ["stem", "tech", "engineering", "math"],
      },
      {
        value: "c",
        label: "仕組みや制度の問題だと感じ、根本から変えたいと思う",
        tags: ["entrepreneurship", "innovation", "business", "leadership"],
      },
      {
        value: "d",
        label: "じっくり観察して、背景・文脈を理解しようとする",
        tags: ["humanities", "interdisciplinary", "culture", "social"],
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
        label: "国公立を第一志望にしたい",
        tags: ["national", "public"],
      },
      {
        value: "b",
        label: "国公立が希望だが、私立も視野に入れている",
        tags: ["national", "public", "private"],
      },
      {
        value: "c",
        label: "私立でもよい・大学の特色や環境を重視して選びたい",
        tags: ["private"],
      },
      {
        value: "d",
        label: "国公立・私立にこだわらず、自分に合う大学を選びたい",
        tags: ["national", "public", "private"],
      },
    ],
  },
  {
    id: "q10",
    category: "finance",
    text: "大学の学費や通学スタイルについて、優先したいのは？",
    options: [
      {
        value: "a",
        label: "学費をできるだけ抑えたい（奨学金も検討中）",
        tags: ["national", "public", "kyushu"],
      },
      {
        value: "b",
        label: "一人暮らし可・費用より環境・大学の質を優先",
        tags: ["nationwide", "private", "global"],
      },
      {
        value: "c",
        label: "自宅から通える範囲で選びたい",
        tags: ["local", "kyushu"],
      },
      {
        value: "d",
        label: "費用よりも大学の充実度・サポート体制を最優先",
        tags: ["private", "national", "global"],
      },
    ],
  },

  // ── ③ 深い価値観・将来ビジョン系（Q11〜Q15）──────────────────
  {
    id: "q11",
    category: "graduation_vision",
    text: "10年後、どんな場面で活躍している自分を想像しますか？",
    options: [
      {
        value: "a",
        label: "テクノロジー・研究・開発の最前線で革新的なプロダクトを作っている",
        tags: ["tech", "stem", "engineering", "innovation"],
      },
      {
        value: "b",
        label: "起業・経営・ビジネスで組織や社会に新しい価値をもたらしている",
        tags: ["business", "entrepreneurship", "leadership", "innovation"],
      },
      {
        value: "c",
        label: "医療・福祉・教育の現場で、目の前の人の生活を支えている",
        tags: ["welfare", "medical", "community", "social"],
      },
      {
        value: "d",
        label: "海外を舞台に、グローバルな課題に取り組む仕事をしている",
        tags: ["global", "international", "english", "language"],
      },
    ],
  },
  {
    id: "q12",
    category: "career",
    text: "将来の仕事を選ぶとき、一番大切にしたいのは？",
    options: [
      {
        value: "a",
        label: "専門性・スキル（その分野のプロになりたい）",
        tags: ["stem", "tech", "engineering", "humanities"],
      },
      {
        value: "b",
        label: "影響力・規模（多くの人・社会に届く仕事をしたい）",
        tags: ["entrepreneurship", "innovation", "business", "global"],
      },
      {
        value: "c",
        label: "つながり・人（人と深く関わり、支え合う仕事がしたい）",
        tags: ["community", "welfare", "social", "collaborative"],
      },
      {
        value: "d",
        label: "自由・裁量（自分のペースや判断で動ける仕事がしたい）",
        tags: ["interdisciplinary", "innovation", "global", "leadership"],
      },
    ],
  },
  {
    id: "q13",
    category: "interest",
    text: "今の世の中で「これは変えたい・解決したい」と感じる問題に近いのは？",
    options: [
      {
        value: "a",
        label: "テクノロジー格差・AI活用の遅れ・デジタル社会の課題",
        tags: ["tech", "stem", "engineering", "innovation"],
      },
      {
        value: "b",
        label: "地域の過疎化・地元の活性化・若者が戻れる町づくり",
        tags: ["community", "social", "kyushu", "fieldwork"],
      },
      {
        value: "c",
        label: "環境問題・国際的な格差・難民・国境を越えた支援",
        tags: ["global", "international", "community", "social"],
      },
      {
        value: "d",
        label: "貧困・医療アクセス・福祉・教育の不平等",
        tags: ["welfare", "medical", "community", "humanities"],
      },
    ],
  },
  {
    id: "q14",
    category: "personality",
    text: "初めての挑戦に向き合うとき、自分に一番近いスタイルは？",
    options: [
      {
        value: "a",
        label: "仕組みや理論を調べて、計画を立ててから一歩ずつ進む",
        tags: ["stem", "tech", "engineering", "math"],
      },
      {
        value: "b",
        label: "とにかく飛び込んで行動し、やりながら改善していく",
        tags: ["entrepreneurship", "leadership", "business", "innovation"],
      },
      {
        value: "c",
        label: "実際にやっている人に話を聞いて、現場感を掴んでから動く",
        tags: ["community", "social", "welfare", "fieldwork"],
      },
      {
        value: "d",
        label: "複数の選択肢を比較・検討し、最善の方法を慎重に選ぶ",
        tags: ["humanities", "interdisciplinary", "global", "culture"],
      },
    ],
  },
  {
    id: "q15",
    category: "campus_life",
    text: "大学の4年間で一番「手に入れたい」ものは？",
    options: [
      {
        value: "a",
        label: "最先端の知識・研究スキル（専門的な強みを徹底的に磨く）",
        tags: ["tech", "stem", "engineering", "innovation", "humanities"],
      },
      {
        value: "b",
        label: "起業・プロジェクト経験・社会で即戦力になる実践スキル",
        tags: ["entrepreneurship", "business", "leadership", "practical"],
      },
      {
        value: "c",
        label: "多様な人とのネットワーク・コミュニティ・仲間",
        tags: ["community", "collaborative", "global", "interdisciplinary"],
      },
      {
        value: "d",
        label: "留学・異文化体験・グローバルな視野と語学力",
        tags: ["global", "international", "english", "language"],
      },
    ],
  },
  {
    id: "q16",
    category: "academic",
    text: "今の自分の学力・成績はどのくらいだと思いますか？",
    options: [
      {
        value: "a",
        label: "模試偏差値60以上",
        tags: ["hensachi-high"],
      },
      {
        value: "b",
        label: "模試偏差値53〜59",
        tags: ["hensachi-mid-high"],
      },
      {
        value: "c",
        label: "模試偏差値46〜52",
        tags: ["hensachi-mid"],
      },
      {
        value: "d",
        label: "模試偏差値45以下・まだよく分からない",
        tags: ["hensachi-low"],
      },
    ],
  },
];
