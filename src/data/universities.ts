import { University } from "@/types";

// ===========================
// 大学ダミーデータ
// 後でSupabaseのDBに置き換え可能な構造
// ===========================

export const universities: University[] = [
  {
    id: "kyutech",
    name: "九州工業大学",
    faculty: "工学部・情報工学部",
    department: "情報・電気電子工学科",
    region: "九州",
    prefecture: "福岡県",
    type: "国立",
    description:
      "ものづくりと情報技術に強い国立理工系大学。実践的なエンジニア育成に定評があり、企業との連携も盛ん。情報工学部は全学生がプログラミングから始め、AIや組み込みまで幅広く学べる。",
    features: ["理工系", "ものづくり", "AI・プログラミング", "国立", "就職率が高い"],
    sougoCompatibility: "高",
    idealStudent:
      "工学や情報技術に興味があり、実験や実習が好きな学生。論理的思考が得意で、粘り強く課題に取り組める人。",
    requiredActivities: [
      "プログラミングや電子工作の経験",
      "理系科目の得意さをアピール",
      "部活や研究での問題解決経験",
    ],
    matchTags: ["tech", "stem", "engineering", "national", "kyushu", "hands-on", "local"],
    links: {
      official: "https://www.kyutech.ac.jp/",
      admissions: "https://www.kyutech.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E4%B9%9D%E5%B7%9E%E5%B7%A5%E6%A5%AD%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kyutech.ac.jp/event/opencampus/",
    },
    mentorCount: 3,
  },
  {
    id: "kitakyushu",
    name: "北九州市立大学",
    faculty: "地域創生学群・国際環境工学部",
    department: "地域創生学科・環境システム学科",
    region: "九州",
    prefecture: "福岡県",
    type: "公立",
    description:
      "地域社会と密接に連携した学びが特徴の公立大学。地域課題の解決を学術的に探究する「地域創生学群」は全国でも珍しい学部構成。学費が比較的安く、地元志向の学生に人気。",
    features: ["地域創生", "公立", "フィールドワーク", "文理融合", "学費が安い"],
    sougoCompatibility: "高",
    idealStudent:
      "地域や社会に貢献したいという気持ちが強い学生。ボランティアや地域活動の経験を持ち、人との関わりを大切にできる人。",
    requiredActivities: [
      "地域ボランティアや社会貢献活動",
      "フィールドワークや調査研究の経験",
      "地元や社会への関心を示すエピソード",
    ],
    matchTags: ["community", "social", "welfare", "public", "kyushu", "fieldwork", "local"],
    links: {
      official: "https://www.kitakyu-u.ac.jp/",
      admissions: "https://www.kitakyu-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%8C%97%E4%B9%9D%E5%B7%9E%E5%B8%82%E7%AB%8B%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kitakyu-u.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "fukuoka",
    name: "福岡大学",
    faculty: "商学部・工学部・人文学部",
    department: "経営学科・機械工学科・文化学科",
    region: "九州",
    prefecture: "福岡県",
    type: "私立",
    description:
      "九州最大規模の総合大学。多様な学部・学科を持ち、様々な分野を横断して学べる環境が整っている。課外活動も活発で、総合型選抜では人物重視の選考が行われる。学内施設が充実。",
    features: ["総合大学", "私立", "多分野", "課外活動", "キャンパスが広い"],
    sougoCompatibility: "高",
    idealStudent:
      "勉強だけでなく課外活動にも積極的に取り組んできた学生。リーダーシップや協調性があり、大学で多様な経験をしたい人。",
    requiredActivities: [
      "部活・生徒会などでのリーダー経験",
      "志望学部に関連する自主学習や資格",
      "チームで取り組んだプロジェクトの経験",
    ],
    matchTags: ["business", "interdisciplinary", "private", "kyushu", "collaborative", "leadership"],
    links: {
      official: "https://www.fukuoka-u.ac.jp/",
      admissions: "https://www.fukuoka-u.ac.jp/admissions/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E7%A6%8F%E5%B2%A1%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.fukuoka-u.ac.jp/event/opencampus/",
    },
    mentorCount: 4,
  },
  {
    id: "apu",
    name: "立命館アジア太平洋大学（APU）",
    faculty: "アジア太平洋学部・サステイナビリティ観光学部",
    department: "アジア太平洋学科・観光・ホスピタリティ学科",
    region: "九州",
    prefecture: "大分県",
    type: "私立",
    description:
      "世界100カ国以上からの留学生が集まる国際色豊かなキャンパス。授業の半分以上が英語で行われ、グローバル人材育成に特化。大分県別府市というユニークな立地で、多文化共生を日常的に体験できる。",
    features: ["グローバル", "英語授業", "多文化共生", "私立", "留学生50%"],
    sougoCompatibility: "高",
    idealStudent:
      "海外や異文化に強い興味を持ち、英語で学ぶことに挑戦したい学生。多様な価値観を受け入れ、グローバルな環境で成長したい人。",
    requiredActivities: [
      "英語学習・TOEFL/IELTS等のスコア",
      "海外交流・国際ボランティアの経験",
      "異文化理解を示すエピソード",
    ],
    matchTags: ["global", "international", "english", "private", "interdisciplinary", "innovation"],
    links: {
      official: "https://www.apu.ac.jp/",
      admissions: "https://www.apu.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E7%AB%8B%E5%91%BD%E9%A4%A8%E3%82%A2%E3%82%B8%E3%82%A2%E5%A4%AA%E5%B9%B3%E6%B4%8B",
      openCampus: "https://www.apu.ac.jp/event/",
    },
    mentorCount: 5,
  },
  {
    id: "kwansei",
    name: "関西学院大学",
    faculty: "国際学部・社会学部・経済学部",
    department: "国際学科・社会学科・経済学科",
    region: "関西",
    prefecture: "兵庫県",
    type: "私立",
    description:
      "「Mastery for Service（奉仕のための練達）」を建学精神に持つ全国区の名門私立大学。国際学部は全授業英語・留学必須で、本格的なグローバル教育を受けられる。就職実績も非常に高く、関西圏の企業に強い。",
    features: ["グローバル", "伝統校", "英語教育", "私立", "関西"],
    sougoCompatibility: "中",
    idealStudent:
      "全国・海外を舞台に活躍したい意欲的な学生。学業だけでなく社会貢献活動や海外体験も積んできた、バランスのとれた人。",
    requiredActivities: [
      "英語資格（TOEFL・IELTS・英検準1級以上）",
      "留学・海外経験または国内での国際交流",
      "社会課題への関心を示す活動実績",
    ],
    matchTags: ["global", "international", "business", "private", "nationwide", "english", "leadership"],
    links: {
      official: "https://www.kwansei.ac.jp/",
      admissions: "https://www.kwansei.ac.jp/admissions/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E9%96%A2%E8%A5%BF%E5%AD%A6%E9%99%A2%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kwansei.ac.jp/event/",
    },
    mentorCount: 3,
  },
];

/** IDで大学を取得 */
export function getUniversityById(id: string): University | undefined {
  return universities.find((u) => u.id === id);
}
