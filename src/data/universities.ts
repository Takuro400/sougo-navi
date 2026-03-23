import { University } from "@/types";

// ===========================
// 大学ダミーデータ
// 後でSupabaseのDBに置き換え可能な構造
// ===========================

export const universities: University[] = [
  {
    id: "kyushu",
    name: "九州大学",
    faculty: "文学部・理学部・工学部・医学部他",
    department: "各学科",
    region: "九州",
    prefecture: "福岡県",
    type: "国立",
    description:
      "九州を代表する旧帝国大学。文系から理系・医学系まで幅広い学部を擁し、研究水準も非常に高い。国際連携や産学連携にも積極的で、九州全域から優秀な学生が集まる。総合型選抜では学問への深い関心と探究心が問われる。",
    features: ["旧帝大", "総合大学", "研究力が高い", "国立", "医学部あり"],
    sougoCompatibility: "高",
    idealStudent:
      "特定の学問分野に対して強い探究心を持ち、自ら課題を設定して取り組める学生。研究や社会貢献への高い志を持つ人。",
    requiredActivities: [
      "志望分野に関する自主研究・探究活動",
      "学外の研究機関やコンテストへの参加",
      "高い学業成績と課外活動の実績",
    ],
    matchTags: ["academic", "research", "stem", "national", "kyushu", "medicine", "prestigious"],
    links: {
      official: "https://www.kyushu-u.ac.jp/",
      admissions: "https://www.kyushu-u.ac.jp/ja/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E4%B9%9D%E5%B7%9E%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kyushu-u.ac.jp/ja/events/",
    },
    mentorCount: 5,
  },
  {
    id: "kumamoto",
    name: "熊本大学",
    faculty: "文学部・理学部・工学部・医学部他",
    department: "各学科",
    region: "九州",
    prefecture: "熊本県",
    type: "国立",
    description:
      "熊本県の中心に位置する総合国立大学。医学・薬学・工学など幅広い分野で高い研究実績を持つ。地域社会との連携が深く、地元熊本の課題解決に取り組む機会が多い。総合型選抜では地域貢献への意欲と専門性への意識が評価される。",
    features: ["総合大学", "医学・薬学", "地域連携", "国立", "研究重視"],
    sougoCompatibility: "高",
    idealStudent:
      "地域や社会の課題に関心を持ち、専門的な知識を身につけて貢献したいと考える学生。探究心と行動力を兼ね備えた人。",
    requiredActivities: [
      "志望分野に関連する探究活動や研究",
      "地域ボランティアや社会貢献活動",
      "課題解決に向けた自主的な取り組み",
    ],
    matchTags: ["academic", "research", "medicine", "national", "kyushu", "community", "local"],
    links: {
      official: "https://www.kumamoto-u.ac.jp/",
      admissions: "https://www.kumamoto-u.ac.jp/daigakujouhou/nyuugakuannai/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E7%86%8A%E6%9C%AC%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kumamoto-u.ac.jp/daigakujouhou/campus/",
    },
    mentorCount: 3,
  },
  {
    id: "nagasaki",
    name: "長崎大学",
    faculty: "水産学部・医学部・環境科学部他",
    department: "各学科",
    region: "九州",
    prefecture: "長崎県",
    type: "国立",
    description:
      "海洋・水産・熱帯医学の分野で国際的に知られる国立大学。長崎という地理的特性を活かした国際交流や海洋研究が盛ん。感染症研究所など医療分野の研究拠点を擁し、グローバルな視点での学びが魅力。",
    features: ["海洋・水産", "熱帯医学", "国際連携", "国立", "医学系が強い"],
    sougoCompatibility: "高",
    idealStudent:
      "海洋・環境・医療など特定分野への強い関心を持ち、国際的な視野で研究・社会貢献を志す学生。",
    requiredActivities: [
      "志望分野（海洋・医療・環境等）の探究活動",
      "英語学習や国際交流の経験",
      "ボランティアや社会課題への関与",
    ],
    matchTags: ["marine", "medicine", "global", "national", "kyushu", "research", "environment"],
    links: {
      official: "https://www.nagasaki-u.ac.jp/",
      admissions: "https://www.nagasaki-u.ac.jp/ja/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E9%95%B7%E5%B4%8E%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.nagasaki-u.ac.jp/ja/events/",
    },
    mentorCount: 2,
  },
  {
    id: "saga",
    name: "佐賀大学",
    faculty: "理工学部・農学部・医学部・経済学部他",
    department: "各学科",
    region: "九州",
    prefecture: "佐賀県",
    type: "国立",
    description:
      "佐賀県の唯一の国立大学として地域密着型の教育・研究を推進。農業・バイオ・環境分野の研究に力を入れており、地域産業との連携も盛ん。少人数教育によるきめ細かい指導が特徴で、学生と教員の距離が近い。",
    features: ["農学・バイオ", "地域密着", "少人数教育", "国立", "医学部あり"],
    sougoCompatibility: "高",
    idealStudent:
      "地元・地域に貢献したい気持ちが強く、農業・環境・医療などの分野で専門性を身につけたい学生。",
    requiredActivities: [
      "農業・環境・地域課題に関する探究活動",
      "地域ボランティアやフィールドワーク",
      "志望分野に関する自主学習や資格取得",
    ],
    matchTags: ["agriculture", "environment", "community", "national", "kyushu", "local", "research"],
    links: {
      official: "https://www.saga-u.ac.jp/",
      admissions: "https://www.saga-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E4%BD%90%E8%B3%80%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.saga-u.ac.jp/event/",
    },
    mentorCount: 1,
  },
  {
    id: "oita",
    name: "大分大学",
    faculty: "経済学部・理工学部・医学部・福祉健康科学部他",
    department: "各学科",
    region: "九州",
    prefecture: "大分県",
    type: "国立",
    description:
      "大分県の国立大学として、医療・福祉・理工系に強みを持つ。地域医療への貢献を重視した医学教育と、産業連携型の理工学教育が特徴。少人数授業が多く、学生一人ひとりへのサポートが手厚い。",
    features: ["医療・福祉", "理工系", "地域医療", "国立", "少人数サポート"],
    sougoCompatibility: "高",
    idealStudent:
      "医療・福祉・工学分野に関心があり、地域社会の課題解決に貢献したいと考える学生。",
    requiredActivities: [
      "医療・福祉・工学に関するボランティアや体験活動",
      "地域課題への関心を示すエピソード",
      "志望分野への主体的な学習実績",
    ],
    matchTags: ["medicine", "welfare", "engineering", "national", "kyushu", "community", "local"],
    links: {
      official: "https://www.oita-u.ac.jp/",
      admissions: "https://www.oita-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%A4%A7%E5%88%86%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.oita-u.ac.jp/event/",
    },
    mentorCount: 1,
  },
  {
    id: "miyazaki",
    name: "宮崎大学",
    faculty: "農学部・工学部・医学部・教育学部他",
    department: "各学科",
    region: "九州",
    prefecture: "宮崎県",
    type: "国立",
    description:
      "農学・獣医・医学分野に強い宮崎県の国立大学。農業県である宮崎の特性を活かした農学・畜産・獣医学研究が盛ん。フィールドワークや実習が充実しており、実践的な学びができる環境が整っている。",
    features: ["農学・獣医", "医学系", "フィールドワーク", "国立", "実践的な学び"],
    sougoCompatibility: "高",
    idealStudent:
      "農業・動物・医療などに興味があり、自然や現場での学びを大切にしたいと考える学生。",
    requiredActivities: [
      "農業・動物・医療に関する体験活動やボランティア",
      "フィールドワークや実験への積極的な参加",
      "志望分野に関する自主研究や探究活動",
    ],
    matchTags: ["agriculture", "veterinary", "medicine", "national", "kyushu", "fieldwork", "local"],
    links: {
      official: "https://www.miyazaki-u.ac.jp/",
      admissions: "https://www.miyazaki-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%AE%AE%E5%B4%8E%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.miyazaki-u.ac.jp/event/",
    },
    mentorCount: 1,
  },
  {
    id: "kagoshima",
    name: "鹿児島大学",
    faculty: "農学部・水産学部・医学部・工学部他",
    department: "各学科",
    region: "九州",
    prefecture: "鹿児島県",
    type: "国立",
    description:
      "南九州・奄美・沖縄を含む広域の課題に取り組む国立大学。農学・水産・医学分野が充実しており、島嶼地域の研究や熱帯性農業研究でも知られる。豊かな自然環境の中でフィールドワーク中心の実践的な教育を展開。",
    features: ["農学・水産", "島嶼研究", "医学系", "国立", "フィールドワーク"],
    sougoCompatibility: "高",
    idealStudent:
      "自然・環境・医療・地域などに広い関心を持ち、現場での実践的な学びを好む学生。南九州の地域課題に関心がある人。",
    requiredActivities: [
      "農業・水産・環境・医療に関する体験活動",
      "地域課題への関心や取り組み",
      "フィールドワークや実習への積極的な姿勢",
    ],
    matchTags: ["agriculture", "marine", "medicine", "national", "kyushu", "fieldwork", "environment"],
    links: {
      official: "https://www.kagoshima-u.ac.jp/",
      admissions: "https://www.kagoshima-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E9%B9%BF%E5%85%90%E5%B3%B6%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kagoshima-u.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "seinan",
    name: "西南学院大学",
    faculty: "神学部・文学部・法学部・商学部・経済学部・国際文化学部・人間科学部",
    department: "各学科",
    region: "九州",
    prefecture: "福岡県",
    type: "私立",
    description:
      "キリスト教精神に基づく人格教育を重視する福岡の伝統私立大学。英語教育と国際交流に力を入れており、留学プログラムも充実。文系総合大学として、法学・商学・人文科学など幅広い分野で学べる。総合型選抜では人物重視の選考が特徴。",
    features: ["キリスト教教育", "英語・国際交流", "文系総合", "私立", "伝統校"],
    sougoCompatibility: "高",
    idealStudent:
      "人と関わることが好きで、英語や国際社会に興味を持つ学生。社会貢献や人道支援への関心が高い人。",
    requiredActivities: [
      "ボランティアや社会貢献活動の実績",
      "英語学習や国際交流の経験",
      "リーダーシップや協調性を示すエピソード",
    ],
    matchTags: ["global", "english", "humanities", "private", "kyushu", "community", "leadership"],
    links: {
      official: "https://www.seinan-gu.ac.jp/",
      admissions: "https://www.seinan-gu.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E8%A5%BF%E5%8D%97%E5%AD%A6%E9%99%A2%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.seinan-gu.ac.jp/event/",
    },
    mentorCount: 3,
  },
  {
    id: "kurume",
    name: "久留米大学",
    faculty: "医学部・法学部・経済学部・商学部・文学部",
    department: "各学科",
    region: "九州",
    prefecture: "福岡県",
    type: "私立",
    description:
      "医学部を中心に医療系に強みを持つ福岡県久留米市の私立大学。附属病院を有し、医療現場に直結した実践的な医学・看護教育が特徴。文系学部も充実しており、地域社会に根ざした人材育成を推進している。",
    features: ["医学部", "附属病院", "医療系が強い", "私立", "地域密着"],
    sougoCompatibility: "高",
    idealStudent:
      "医療・福祉・法律などの専門分野に強い関心を持ち、地域社会での実践的な学びを求める学生。",
    requiredActivities: [
      "医療・福祉・法律に関するボランティアや体験",
      "志望分野への強い動機を示すエピソード",
      "課外活動や学外経験による人物的な成長",
    ],
    matchTags: ["medicine", "welfare", "law", "private", "kyushu", "community", "local"],
    links: {
      official: "https://www.kurume-u.ac.jp/",
      admissions: "https://www.kurume-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E4%B9%85%E7%95%99%E7%B1%B3%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kurume-u.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "kyusanko",
    name: "九州産業大学",
    faculty: "芸術学部・建築都市工学部・理工学部・国際文化学部・経済・商学部他",
    department: "各学科",
    region: "九州",
    prefecture: "福岡県",
    type: "私立",
    description:
      "芸術・デザインから工学・ビジネスまで幅広い学部を持つ福岡の総合私立大学。特に芸術学部のデザイン・写真・映像系は高い評価を受けており、クリエイティブ分野への進路も多い。産学連携プロジェクトや就職支援も充実。",
    features: ["芸術・デザイン", "工学・建築", "産学連携", "私立", "総合大学"],
    sougoCompatibility: "高",
    idealStudent:
      "デザイン・アート・建築・エンジニアリングなどクリエイティブな分野に興味があり、実践的な制作や表現活動を積んできた学生。",
    requiredActivities: [
      "デザイン・アート・工学に関する作品制作やコンテスト参加",
      "自分の創造性を示すポートフォリオや作品集",
      "部活・文化活動での創作経験",
    ],
    matchTags: ["arts", "design", "engineering", "private", "kyushu", "creative", "hands-on"],
    links: {
      official: "https://www.kyusan-u.ac.jp/",
      admissions: "https://www.kyusan-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E4%B9%9D%E5%B7%9E%E7%94%A3%E6%A5%AD%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kyusan-u.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "fit",
    name: "福岡工業大学",
    faculty: "工学部・情報工学部・社会環境学部",
    department: "各学科",
    region: "九州",
    prefecture: "福岡県",
    type: "私立",
    description:
      "理工系・情報系に特化した福岡の私立大学。少人数制の丁寧な指導と充実した実験・実習設備が特徴で、就職率が非常に高い。企業との連携が密接で、在学中からインターンシップや産学連携プロジェクトに参加できる。",
    features: ["理工系特化", "高い就職率", "少人数教育", "私立", "産学連携"],
    sougoCompatibility: "高",
    idealStudent:
      "工学・IT・情報技術に興味があり、実験や実習を通じて実践的なスキルを身につけたい学生。就職を強く意識している人。",
    requiredActivities: [
      "プログラミング・電子工作・ロボット製作などの実績",
      "理系科目や情報系の得意分野をアピール",
      "インターンシップや職場体験の経験",
    ],
    matchTags: ["tech", "stem", "engineering", "private", "kyushu", "hands-on", "career-focused"],
    links: {
      official: "https://www.fit.ac.jp/",
      admissions: "https://www.fit.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E7%A6%8F%E5%B2%A1%E5%B7%A5%E6%A5%AD%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.fit.ac.jp/event/",
    },
    mentorCount: 2,
  },
  // ===========================
  // 北海道・東北
  // ===========================
  {
    id: "hokkaido",
    name: "北海道大学",
    faculty: "文学部・理学部・工学部・農学部・医学部他",
    department: "各学科",
    region: "北海道",
    prefecture: "北海道",
    type: "国立",
    description:
      "札幌に本部を置く旧帝国大学。広大なキャンパスと豊かな自然環境の中で、農学・水産・環境・医学など幅広い分野の研究が盛ん。国際連携が活発でグローバル人材の育成にも力を入れている。総合型選抜では学問への深い探究心と主体的な学びの姿勢が問われる。",
    features: ["旧帝大", "総合大学", "農学・環境が強い", "国立", "広大なキャンパス"],
    sougoCompatibility: "高",
    idealStudent:
      "特定の学問分野に強い探究心を持ち、広大な自然環境の中で主体的に研究・学習に取り組みたい学生。グローバルな視野も持つ人。",
    requiredActivities: [
      "志望分野に関する探究活動や自主研究",
      "学外コンテスト・研究発表への参加",
      "英語学習や国際交流の経験",
    ],
    matchTags: ["academic", "research", "agriculture", "environment", "national", "global", "stem", "prestigious"],
    links: {
      official: "https://www.hokudai.ac.jp/",
      admissions: "https://www.hokudai.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%8C%97%E6%B5%B7%E9%81%93%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.hokudai.ac.jp/event/",
    },
    mentorCount: 4,
  },
  {
    id: "tohoku",
    name: "東北大学",
    faculty: "文学部・理学部・工学部・医学部・農学部他",
    department: "各学科",
    region: "東北",
    prefecture: "宮城県",
    type: "国立",
    description:
      "「研究第一」「門戸開放」「実学尊重」を建学の精神に掲げる旧帝国大学。理工系・医学系の研究水準が特に高く、世界トップレベルの研究機関として知られる。総合型選抜（AO入試）の先駆け的存在で、学力だけでなく個性・意欲を重視した選考が特徴。",
    features: ["旧帝大", "研究力トップレベル", "AO入試の先駆け", "国立", "理工・医学が強い"],
    sougoCompatibility: "高",
    idealStudent:
      "研究・探究活動に強い情熱を持ち、自ら課題を設定して取り組める学生。学力だけでなく、個性や意欲・体験を持ち合わせた人。",
    requiredActivities: [
      "自主研究・探究活動の実績（レポート・論文など）",
      "科学系コンテストや発表会への参加",
      "志望分野に関する深い学習と言語化",
    ],
    matchTags: ["academic", "research", "stem", "medicine", "national", "prestigious", "innovation", "hands-on"],
    links: {
      official: "https://www.tohoku.ac.jp/",
      admissions: "https://www.tohoku.ac.jp/japanese/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E6%9D%B1%E5%8C%97%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.tohoku.ac.jp/japanese/event/",
    },
    mentorCount: 5,
  },
  {
    id: "otaru_shoka",
    name: "小樽商科大学",
    faculty: "商学部",
    department: "各学科",
    region: "北海道",
    prefecture: "北海道",
    type: "国立",
    description:
      "商学・経営・経済に特化した国立大学。少人数で専門性の高い教育が受けられ、ビジネス・会計・情報システムなど実践的なカリキュラムが充実。学生と教員の距離が近く、就職支援も手厚い。北海道内外から商学を学びたい学生が集まる。",
    features: ["商学特化", "少人数教育", "高い就職実績", "国立", "コスパが高い"],
    sougoCompatibility: "高",
    idealStudent:
      "ビジネス・経営・会計・経済に明確な関心を持ち、専門性を高めてキャリアに活かしたいと考える学生。",
    requiredActivities: [
      "ビジネスコンテストや経済系の課外活動への参加",
      "簿記・ITパスポートなど関連資格の取得",
      "志望理由を具体的に言語化する練習",
    ],
    matchTags: ["business", "academic", "career-focused", "national", "leadership", "entrepreneurship", "math"],
    links: {
      official: "https://www.otaru-uc.ac.jp/",
      admissions: "https://www.otaru-uc.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%B0%8F%E6%A8%BD%E5%95%86%E7%A7%91%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.otaru-uc.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "sapporo_city",
    name: "札幌市立大学",
    faculty: "デザイン学部・看護学部",
    department: "各学科",
    region: "北海道",
    prefecture: "北海道",
    type: "公立",
    description:
      "デザインと看護の2学部を擁する札幌市の公立大学。デザイン学部では社会課題をデザインで解決する実践的な教育が特徴で、プロダクト・コミュニケーション・環境デザインなど幅広い領域を学べる。少人数制で学生一人ひとりへのサポートが充実している。",
    features: ["デザイン特化", "看護学部", "少人数教育", "公立", "実践的なカリキュラム"],
    sougoCompatibility: "高",
    idealStudent:
      "デザインや医療・看護に強い関心を持ち、実践的な制作・実習を通じて専門スキルを身につけたい学生。",
    requiredActivities: [
      "デザイン・アート作品の制作やポートフォリオの作成",
      "医療・福祉ボランティアや看護体験",
      "社会課題への関心をデザインや看護と結びつけて言語化する",
    ],
    matchTags: ["design", "arts", "welfare", "community", "hands-on", "creative", "medicine", "local"],
    links: {
      official: "https://www.scu.ac.jp/",
      admissions: "https://www.scu.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E6%9C%AD%E5%B9%8C%E5%B8%82%E7%AB%8B%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.scu.ac.jp/event/",
    },
    mentorCount: 1,
  },
  // ===========================
  // 中部・北陸
  // ===========================
  {
    id: "nagoya",
    name: "名古屋大学",
    faculty: "文学部・理学部・工学部・医学部・農学部他",
    department: "各学科",
    region: "中部",
    prefecture: "愛知県",
    type: "国立",
    description:
      "中部地方を代表する旧帝国大学。ノーベル賞受賞者を多数輩出した研究環境が世界的に有名で、特に理工系・医学系の研究水準は国内トップクラス。「自由闊達」な学風のもと、学生の主体的な探究を重視している。総合型選抜では学問への深い関心と探究実績が問われる。",
    features: ["旧帝大", "ノーベル賞輩出", "研究力が高い", "国立", "理工・医学が強い"],
    sougoCompatibility: "高",
    idealStudent:
      "科学・研究に強い情熱を持ち、自ら問いを立てて探究できる学生。特定の学問分野に深くのめり込んだ経験がある人。",
    requiredActivities: [
      "志望分野に関する自主研究・探究活動",
      "科学系コンテストや論文発表への参加",
      "高い学業成績と明確な学習動機の言語化",
    ],
    matchTags: ["academic", "research", "stem", "medicine", "national", "prestigious", "innovation", "math"],
    links: {
      official: "https://www.nagoya-u.ac.jp/",
      admissions: "https://www.nagoya-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%90%8D%E5%8F%A4%E5%B1%8B%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.nagoya-u.ac.jp/event/",
    },
    mentorCount: 4,
  },
  {
    id: "kanazawa",
    name: "金沢大学",
    faculty: "人間社会学域・理工学域・医薬保健学域",
    department: "各学科",
    region: "北陸",
    prefecture: "石川県",
    type: "国立",
    description:
      "北陸を代表する国立総合大学。医薬保健・理工・人文社会の3学域制を採用し、学際的な学びを推進している。金沢という文化・歴史の豊かな地にあり、伝統と先端研究が融合したユニークな環境が特徴。総合型選抜では主体的な学びの姿勢と探究心が重視される。",
    features: ["総合大学", "医薬保健が強い", "3学域制", "国立", "文化・歴史豊かな立地"],
    sougoCompatibility: "高",
    idealStudent:
      "特定の分野に強い関心を持ちながら、異分野にも好奇心を持って学べる学生。地域・文化・社会への関心も持つ人。",
    requiredActivities: [
      "志望分野に関する探究活動や自主学習",
      "地域・社会課題への関心を示す活動",
      "志望理由を具体的に深める読書・調査",
    ],
    matchTags: ["academic", "research", "medicine", "national", "interdisciplinary", "community", "culture"],
    links: {
      official: "https://www.kanazawa-u.ac.jp/",
      admissions: "https://www.kanazawa-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E9%87%91%E6%B2%A2%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.kanazawa-u.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "toyama",
    name: "富山大学",
    faculty: "人文学部・教育学部・理学部・工学部・医学部・薬学部他",
    department: "各学科",
    region: "北陸",
    prefecture: "富山県",
    type: "国立",
    description:
      "薬学部・医学部を擁し、医薬系の研究・教育が特に充実した北陸の国立総合大学。漢方・和漢薬研究の分野では国内トップクラスの実績を持つ。豊かな自然環境と住みやすい地域性のなか、落ち着いた環境で専門を深められる。",
    features: ["薬学・医学が強い", "和漢薬研究", "総合大学", "国立", "穏やかな環境"],
    sougoCompatibility: "高",
    idealStudent:
      "医薬・理工・教育などの分野に強い関心を持ち、落ち着いた環境で専門性を深めたい学生。地域医療や自然科学への興味がある人。",
    requiredActivities: [
      "医療・薬学・理科に関するボランティアや体験活動",
      "志望分野に関する自主学習や探究活動",
      "地域課題や自然環境に関する取り組み",
    ],
    matchTags: ["medicine", "research", "science", "national", "community", "local", "hands-on", "welfare"],
    links: {
      official: "https://www.u-toyama.ac.jp/",
      admissions: "https://www.u-toyama.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%AF%8C%E5%B1%B1%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.u-toyama.ac.jp/event/",
    },
    mentorCount: 1,
  },
  {
    id: "shizuoka",
    name: "静岡大学",
    faculty: "人文社会科学部・教育学部・理学部・工学部・農学部・情報学部他",
    department: "各学科",
    region: "中部",
    prefecture: "静岡県",
    type: "国立",
    description:
      "情報学部を全国に先駆けて設置した中部の国立総合大学。農学・理工・情報系の研究が充実しており、産学連携も盛ん。温暖な気候と豊かな自然環境の中で、幅広い分野をバランスよく学べる。総合型選抜では主体的な学びの実績と明確な志望動機が求められる。",
    features: ["情報学部が先進的", "農学・理工系", "産学連携", "国立", "温暖な環境"],
    sougoCompatibility: "高",
    idealStudent:
      "情報・理工・農学などの分野に関心を持ち、実践的な学びや産業との連携に興味がある学生。",
    requiredActivities: [
      "情報・理工・農業に関する探究活動や作品制作",
      "プログラミングや実験などの自主的な取り組み",
      "インターンシップや職場体験の経験",
    ],
    matchTags: ["tech", "stem", "agriculture", "engineering", "national", "hands-on", "innovation", "research"],
    links: {
      official: "https://www.shizuoka.ac.jp/",
      admissions: "https://www.shizuoka.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E9%9D%99%E5%B2%A1%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.shizuoka.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "nanzan",
    name: "南山大学",
    faculty: "人文学部・外国語学部・経済学部・経営学部・法学部・理工学部・国際教養学部他",
    department: "各学科",
    region: "中部",
    prefecture: "愛知県",
    type: "私立",
    description:
      "カトリック精神に基づく教育を行う名古屋の伝統的私立大学。外国語教育・国際交流に特に力を入れており、英語をはじめ多言語教育が充実。中部地区の私立大学の中でもトップクラスの評価を受けており、文系から理系・国際系まで幅広い学部を持つ。",
    features: ["外国語・国際交流が強い", "カトリック系", "中部トップ私大", "私立", "多言語教育"],
    sougoCompatibility: "高",
    idealStudent:
      "語学や国際交流に強い関心を持ち、多文化環境の中でグローバルな視野を身につけたい学生。",
    requiredActivities: [
      "英語・外国語学習や語学検定の取得（英検・TOEIC等）",
      "国際交流・異文化体験の経験",
      "ボランティアやリーダーシップ活動の実績",
    ],
    matchTags: ["global", "english", "humanities", "private", "international", "culture", "leadership", "language"],
    links: {
      official: "https://www.nanzan-u.ac.jp/",
      admissions: "https://www.nanzan-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%8D%97%E5%B1%B1%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.nanzan-u.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "hiroshima",
    name: "広島大学",
    faculty: "文学部・教育学部・理学部・工学部・医学部他",
    department: "各学科",
    region: "中国・四国",
    prefecture: "広島県",
    type: "国立",
    description:
      "中国・四国地方を代表する総合国立大学。教育・医学・工学など幅広い分野で高い研究実績を誇る。東広島キャンパスを中心に、広大な敷地でのびのびと学べる環境が整っている。総合型選抜では志望分野への深い関心と探究心が重視される。",
    features: ["旧官立大学", "総合大学", "研究力が高い", "国立", "医学部あり"],
    sougoCompatibility: "高",
    idealStudent:
      "特定の学問分野に対して強い探究心を持ち、自ら課題を設定して取り組める学生。研究や社会貢献への高い志を持つ人。",
    requiredActivities: [
      "志望分野に関する自主研究・探究活動",
      "学外コンテストや研究発表への参加",
      "高い学業成績と課外活動の実績",
    ],
    matchTags: ["academic", "research", "stem", "national", "chugoku-shikoku", "medicine", "education"],
    links: {
      official: "https://www.hiroshima-u.ac.jp/",
      admissions: "https://www.hiroshima-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%BA%83%E5%B3%B6%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.hiroshima-u.ac.jp/event/",
    },
    mentorCount: 3,
  },
  {
    id: "okayama",
    name: "岡山大学",
    faculty: "文学部・法学部・経済学部・理学部・工学部・医学部他",
    department: "各学科",
    region: "中国・四国",
    prefecture: "岡山県",
    type: "国立",
    description:
      "岡山県の総合国立大学として、医学・農学・工学など幅広い学問分野を擁する。医療系学部が充実しており、医師・歯科医師・薬剤師など医療専門職の養成でも高い実績を持つ。地域社会との連携も積極的に推進している。",
    features: ["総合大学", "医学・歯学・薬学", "地域連携", "国立", "研究重視"],
    sougoCompatibility: "高",
    idealStudent:
      "医療・理工・人文など特定分野への強い関心を持ち、専門性を深めながら社会に貢献したい学生。",
    requiredActivities: [
      "志望分野に関する探究活動や自主学習",
      "医療・福祉・地域に関するボランティア活動",
      "学外コンテストや発表経験",
    ],
    matchTags: ["medicine", "research", "national", "chugoku-shikoku", "community", "engineering", "agriculture"],
    links: {
      official: "https://www.okayama-u.ac.jp/",
      admissions: "https://www.okayama-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%B2%A1%E5%B1%B1%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.okayama-u.ac.jp/event/",
    },
    mentorCount: 2,
  },
  {
    id: "yamaguchi",
    name: "山口大学",
    faculty: "人文学部・教育学部・経済学部・理学部・工学部・医学部他",
    department: "各学科",
    region: "中国・四国",
    prefecture: "山口県",
    type: "国立",
    description:
      "山口県の総合国立大学。医学・工学・農学など幅広い分野を有し、地域産業との連携教育に力を入れている。少人数教育ときめ細かい学習支援が特徴で、学生一人ひとりの成長をサポートする環境が整っている。",
    features: ["総合大学", "地域産業連携", "少人数教育", "国立", "医学部あり"],
    sougoCompatibility: "高",
    idealStudent:
      "地域や産業の課題に関心を持ち、専門的な知識を身につけて社会に貢献したいと考える学生。",
    requiredActivities: [
      "地域課題や産業に関する探究・フィールドワーク",
      "ボランティアや社会貢献活動",
      "志望分野に関する自主学習や資格取得",
    ],
    matchTags: ["engineering", "medicine", "community", "national", "chugoku-shikoku", "local", "research"],
    links: {
      official: "https://www.yamaguchi-u.ac.jp/",
      admissions: "https://www.yamaguchi-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E5%B1%B1%E5%8F%A3%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.yamaguchi-u.ac.jp/event/",
    },
    mentorCount: 1,
  },
  {
    id: "ehime",
    name: "愛媛大学",
    faculty: "法文学部・教育学部・理学部・工学部・農学部・医学部他",
    department: "各学科",
    region: "中国・四国",
    prefecture: "愛媛県",
    type: "国立",
    description:
      "愛媛県の総合国立大学。農学・水産・環境分野の研究が盛んで、瀬戸内海の豊かな自然を活かしたフィールド研究が特徴。地域の一次産業や食品産業との連携も深く、実践的な学びの機会が豊富。",
    features: ["農学・水産", "環境研究", "地域連携", "国立", "医学部あり"],
    sougoCompatibility: "高",
    idealStudent:
      "農業・水産・環境・医療など地域に密着した分野に関心を持ち、実践的な研究や社会貢献を目指す学生。",
    requiredActivities: [
      "農業・水産・環境に関する探究活動やフィールドワーク",
      "地域ボランティアや社会課題への関与",
      "志望分野への主体的な学習・資格取得",
    ],
    matchTags: ["agriculture", "marine", "environment", "national", "chugoku-shikoku", "community", "local"],
    links: {
      official: "https://www.ehime-u.ac.jp/",
      admissions: "https://www.ehime-u.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E6%84%9B%E5%AA%9B%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.ehime-u.ac.jp/event/",
    },
    mentorCount: 1,
  },
  {
    id: "ryukyu",
    name: "琉球大学",
    faculty: "法文学部・教育学部・理学部・工学部・農学部・医学部他",
    department: "各学科",
    region: "沖縄",
    prefecture: "沖縄県",
    type: "国立",
    description:
      "沖縄県唯一の国立総合大学。亜熱帯の自然環境を活かした海洋・環境・生命科学分野の研究が世界的にも注目される。沖縄の独自文化や地理的優位性を活かした国際交流も盛んで、東アジア・東南アジアとの連携が深い。",
    features: ["海洋・環境研究", "亜熱帯生態系", "国際連携", "国立", "医学部あり"],
    sougoCompatibility: "高",
    idealStudent:
      "海洋・環境・国際問題に強い関心を持ち、沖縄の自然や文化を活かしたフィールドで学びたい学生。",
    requiredActivities: [
      "海洋・環境・生態系に関する探究活動",
      "国際交流や異文化体験の経験",
      "地域課題（沖縄の歴史・文化・環境等）への関与",
    ],
    matchTags: ["marine", "environment", "global", "national", "okinawa", "research", "international"],
    links: {
      official: "https://www.u-ryukyu.ac.jp/",
      admissions: "https://www.u-ryukyu.ac.jp/admission/",
      passnavi: "https://passnavi.obunsha.co.jp/search/univ?keyword=%E7%90%89%E7%90%83%E5%A4%A7%E5%AD%A6",
      openCampus: "https://www.u-ryukyu.ac.jp/event/",
    },
    mentorCount: 1,
  },
];

/** IDで大学を取得 */
export function getUniversityById(id: string): University | undefined {
  return universities.find((u) => u.id === id);
}
