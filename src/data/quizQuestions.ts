import { QuizQuestion } from "@/types";

// ===========================
// 診断質問データ（15問）
// ===========================

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    category: "interest",
    text: "一番興味を持っていること・好きな分野はどれですか？",
    options: [
      { value: "a", label: "テクノロジー・エンジニアリング・プログラミング", tags: ["tech", "engineering", "stem"] },
      { value: "b", label: "ビジネス・経営・社会課題の解決", tags: ["business", "social", "global"] },
      { value: "c", label: "国際関係・語学・海外文化", tags: ["global", "international", "language"] },
      { value: "d", label: "医療・福祉・人の役に立つ仕事", tags: ["welfare", "medical", "community"] },
    ],
  },
  {
    id: "q2",
    category: "career",
    text: "将来、どんな働き方・生き方をしたいですか？",
    options: [
      { value: "a", label: "専門的な技術や知識を持つプロフェッショナル", tags: ["tech", "stem", "engineering"] },
      { value: "b", label: "世界を舞台に活躍するグローバル人材", tags: ["global", "international", "english"] },
      { value: "c", label: "地域や社会をより良くする人", tags: ["community", "social", "welfare"] },
      { value: "d", label: "起業・新しいビジネスを作る人", tags: ["business", "entrepreneurship", "innovation"] },
    ],
  },
  {
    id: "q3",
    category: "learning",
    text: "どんな学び方が自分に合っていると思いますか？",
    options: [
      { value: "a", label: "実験・実習・ものづくりなど体験重視", tags: ["hands-on", "practical", "stem"] },
      { value: "b", label: "ディスカッション・グループワーク中心", tags: ["discussion", "collaborative", "business"] },
      { value: "c", label: "フィールドワーク・現場に出る学び", tags: ["fieldwork", "community", "social"] },
      { value: "d", label: "英語で学ぶ・海外と交わる環境", tags: ["english", "global", "international"] },
    ],
  },
  {
    id: "q4",
    category: "personality",
    text: "自分の性格に一番近いのはどれですか？",
    options: [
      { value: "a", label: "論理的・分析的・コツコツ取り組む", tags: ["stem", "tech", "engineering"] },
      { value: "b", label: "行動力がある・挑戦が好き・リーダーシップ", tags: ["entrepreneurship", "global", "leadership"] },
      { value: "c", label: "人の気持ちを考える・協調性がある", tags: ["welfare", "community", "collaborative"] },
      { value: "d", label: "好奇心旺盛・いろんな分野に興味がある", tags: ["global", "interdisciplinary", "innovation"] },
    ],
  },
  {
    id: "q5",
    category: "activity",
    text: "高校でどんな活動をしてきましたか（複数あれば最も力を入れたもの）？",
    options: [
      { value: "a", label: "部活動（運動系・文化系）", tags: ["leadership", "collaborative", "community"] },
      { value: "b", label: "ボランティア・地域活動・社会貢献", tags: ["community", "welfare", "social"] },
      { value: "c", label: "プログラミング・ロボット・研究活動", tags: ["tech", "stem", "engineering"] },
      { value: "d", label: "生徒会・学校行事・リーダー経験", tags: ["leadership", "entrepreneurship", "global"] },
    ],
  },
  {
    id: "q6",
    category: "academic",
    text: "自分の学力・評定について率直に教えてください",
    options: [
      { value: "a", label: "評定平均4.0以上・成績は上位", tags: ["high-academic"] },
      { value: "b", label: "評定平均3.5〜4.0・平均より上", tags: ["mid-high-academic"] },
      { value: "c", label: "評定平均3.0〜3.5・平均的", tags: ["mid-academic"] },
      { value: "d", label: "評定は気にしていない・得意科目に特化", tags: ["specialty-academic"] },
    ],
  },
  {
    id: "q7",
    category: "location",
    text: "大学はどのあたりで考えていますか？",
    options: [
      { value: "a", label: "地元・九州内で通いたい", tags: ["kyushu", "local"] },
      { value: "b", label: "九州内なら他県でもOK", tags: ["kyushu"] },
      { value: "c", label: "関西・東京など全国どこでも", tags: ["nationwide"] },
      { value: "d", label: "海外も含めて考えたい", tags: ["global", "international"] },
    ],
  },
  {
    id: "q8",
    category: "school_type",
    text: "国公立と私立、どちらを希望しますか？",
    options: [
      { value: "a", label: "国公立を第一志望にしたい", tags: ["national", "public"] },
      { value: "b", label: "国公立が希望だが私立も視野に", tags: ["national", "public", "private"] },
      { value: "c", label: "私立でもよい・環境や特色重視", tags: ["private"] },
      { value: "d", label: "特にこだわらない", tags: ["national", "public", "private"] },
    ],
  },
  {
    id: "q9",
    category: "finance",
    text: "学費や通学について気になっていることはありますか？",
    options: [
      { value: "a", label: "学費はできるだけ抑えたい（奨学金も検討）", tags: ["national", "public", "kyushu"] },
      { value: "b", label: "一人暮らし可・多少の費用はOK", tags: ["nationwide", "private"] },
      { value: "c", label: "自宅通学できる範囲で選びたい", tags: ["local", "kyushu"] },
      { value: "d", label: "費用よりも大学の質・環境を優先", tags: ["private", "global"] },
    ],
  },
  {
    id: "q10",
    category: "interest",
    text: "大学でどんな経験を一番したいですか？",
    options: [
      { value: "a", label: "海外留学・グローバルな環境で学ぶ", tags: ["global", "international", "english"] },
      { value: "b", label: "最先端の研究・技術を学ぶ", tags: ["tech", "stem", "engineering"] },
      { value: "c", label: "地域課題・社会課題に取り組む", tags: ["community", "social", "welfare"] },
      { value: "d", label: "多様な人と出会い、自分の視野を広げる", tags: ["interdisciplinary", "global", "innovation"] },
    ],
  },
  // ===========================
  // 追加5問
  // ===========================
  {
    id: "q11",
    category: "subject",
    text: "高校で一番得意な（または好きな）科目はどれですか？",
    options: [
      { value: "a", label: "数学・物理・化学などの理系科目", tags: ["stem", "tech", "engineering", "math"] },
      { value: "b", label: "国語・歴史・倫理などの文系科目", tags: ["humanities", "social", "culture"] },
      { value: "c", label: "英語・外国語", tags: ["global", "international", "english", "language"] },
      { value: "d", label: "体育・芸術・家庭科などの実技系", tags: ["hands-on", "practical", "welfare", "community"] },
    ],
  },
  {
    id: "q12",
    category: "club",
    text: "部活動・課外活動はどのタイプに近いですか？",
    options: [
      { value: "a", label: "運動部（スポーツ系）", tags: ["leadership", "collaborative", "hands-on"] },
      { value: "b", label: "文化部（科学・情報・ロボット・研究系）", tags: ["stem", "tech", "engineering", "innovation"] },
      { value: "c", label: "文化部（音楽・演劇・美術・文芸系）", tags: ["humanities", "culture", "interdisciplinary"] },
      { value: "d", label: "生徒会・ボランティア・委員会活動", tags: ["leadership", "community", "social", "entrepreneurship"] },
    ],
  },
  {
    id: "q13",
    category: "graduation_vision",
    text: "大学を卒業したあと、どんな自分になっていたいですか？",
    options: [
      { value: "a", label: "専門職（医師・エンジニア・研究者など）として第一線で活躍している", tags: ["medical", "stem", "engineering", "tech"] },
      { value: "b", label: "起業・ベンチャーで社会に新しい価値を生み出している", tags: ["entrepreneurship", "innovation", "business", "leadership"] },
      { value: "c", label: "海外を舞台に、グローバルな仕事をしている", tags: ["global", "international", "english", "language"] },
      { value: "d", label: "地元・地域で、人や社会の役に立つ仕事をしている", tags: ["community", "welfare", "social", "kyushu"] },
    ],
  },
  {
    id: "q14",
    category: "campus_life",
    text: "大学生活で一番大切にしたいことはどれですか？",
    options: [
      { value: "a", label: "留学・国際交流の機会が豊富な環境", tags: ["global", "international", "english"] },
      { value: "b", label: "研究室・ゼミで専門を深く掘り下げる", tags: ["stem", "tech", "engineering", "humanities"] },
      { value: "c", label: "サークル・課外活動で多様な人と繋がる", tags: ["collaborative", "leadership", "community", "interdisciplinary"] },
      { value: "d", label: "資格取得・就職に向けた実践的なスキルを身につける", tags: ["business", "practical", "entrepreneurship"] },
    ],
  },
  {
    id: "q15",
    category: "info_gathering",
    text: "気になることを調べるとき、どんな方法が一番しっくりきますか？",
    options: [
      { value: "a", label: "本・論文・ニュース記事など文字情報を読む", tags: ["humanities", "stem", "interdisciplinary"] },
      { value: "b", label: "動画・SNS・YouTubeで視覚的に情報収集する", tags: ["innovation", "interdisciplinary", "global"] },
      { value: "c", label: "実際に現場に足を運んだり、人に話を聞く", tags: ["community", "fieldwork", "welfare", "social"] },
      { value: "d", label: "データ・統計・グラフで数値から分析する", tags: ["stem", "tech", "engineering", "math"] },
    ],
  },
  {
    id: "q16",
    category: "subject",
    text: "得意な科目・好きな勉強はどちらですか？",
    options: [
      { value: "a", label: "数学・理科が得意", tags: ["stem", "math", "engineering", "tech"] },
      { value: "b", label: "国語・社会・英語が得意", tags: ["humanities", "language", "culture", "social"] },
      { value: "c", label: "どちらも同じくらい", tags: ["interdisciplinary", "innovation"] },
      { value: "d", label: "まだよくわからない", tags: ["interdisciplinary"] },
    ],
  },
  {
    id: "q17",
    category: "interest",
    text: "将来学びたい分野はどれに近いですか？",
    options: [
      { value: "a", label: "経済・経営・法律", tags: ["business", "career-focused", "leadership", "entrepreneurship"] },
      { value: "b", label: "文学・語学・国際", tags: ["culture", "humanities", "language", "global", "international"] },
      { value: "c", label: "理工・情報・工学", tags: ["stem", "tech", "engineering", "math"] },
      { value: "d", label: "医療・福祉・生命科学", tags: ["medical", "welfare", "medicine", "community"] },
    ],
  },
];
