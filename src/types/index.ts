// ===========================
// 型定義
// ===========================

/** 診断の1問分 */
export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  category: QuizCategory;
}

export interface QuizOption {
  value: string;
  label: string;
  tags: string[]; // マッチングに使うタグ
}

export type QuizCategory =
  | "interest"          // 興味分野
  | "career"            // 将来の目標
  | "learning"          // 学び方の好み
  | "personality"       // 性格・行動特性
  | "activity"          // 高校での活動
  | "academic"          // 学力・評定
  | "location"          // 地域志向
  | "school_type"       // 国公立/私立
  | "finance"           // 学費・通学
  | "subject"           // 得意科目
  | "club"              // 部活の種類
  | "graduation_vision" // 卒業後のなりたい姿
  | "campus_life"       // 大学生活に求めること
  | "info_gathering";   // 情報収集の好み

/** ユーザータイプ */
export type UserType = "global" | "stem" | "community" | "business" | "culture";

export interface UserTypeInfo {
  type: UserType;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  traits: string[];
}

/** 診断の回答セット */
export type QuizAnswers = Record<string, string>;

export type FacultyType = "文系" | "理系" | "文理融合";

export type MajorField =
  | "経済・経営"
  | "法・政治"
  | "文学・語学"
  | "社会・福祉"
  | "理工・情報"
  | "医療・生命"
  | "芸術・デザイン"
  | "農・環境"
  | "教育"
  | "国際";

/** オープンキャンパス情報 */
export interface OpenCampusEvent {
  date: string;       // 例："2025年8月3日（日）"
  title: string;      // 例："夏のオープンキャンパス2025"
  url: string;        // 公式サイトURL
  isOnline: boolean;  // オンライン開催か
  note: string;       // 例："要予約・先着300名"
}

/** 総合型選抜情報 */
export interface SougouAdmission {
  available: boolean;           // 総合型選抜があるか
  timing: string;               // 出願時期（例："9月出願・11月選考"）
  selectionMethod: string[];    // 選考方法（例：["志望理由書", "面接", "小論文"]）
  quota: string;                // 募集人数目安（例："若干名"）
  difficulty: "高" | "中" | "低"; // 総合型の難易度
  point: string;                // 総合型選抜の特徴・ポイント（1〜2文）
}

/** 大学データ（大学×学部で1レコード） */
export interface University {
  id: string;
  name: string;
  faculty: string;        // 学部名
  department: string;     // 学科名
  facultyType: FacultyType; // 文系・理系・文理融合
  majorField: MajorField;   // 専攻分野カテゴリ
  region: string;         // 地域
  prefecture: string;     // 都道府県
  type: "国立" | "公立" | "私立";
  description: string;    // 学びの特徴
  features: string[];     // 特徴タグ
  sougoCompatibility: "高" | "中" | "低"; // 総合型選抜との相性
  idealStudent: string;   // 向いている学生像
  requiredActivities: string[]; // 必要になりそうな活動
  matchTags: string[];    // マッチングタグ
  links: UniversityLinks;
  mentorCount: number;    // 相談可能な先輩数
  hensachi?: number;       // 一般入試の偏差値目安
  hensachiRange?: "最難関" | "難関" | "中堅上位" | "中堅" | "挑戦しやすい"; // 偏差値帯（最難関:70以上 難関:65〜69 中堅上位:60〜64 中堅:55〜59 挑戦しやすい:54以下）
  sougouAdmission?: SougouAdmission; // 総合型選抜情報
  openCampusEvents?: OpenCampusEvent[]; // オープンキャンパス情報
}

export interface UniversityLinks {
  official: string;
  admissions: string;
  passnavi: string;
  openCampus?: string;
}

/** 診断結果の1件 */
export interface MatchResult {
  university: University;
  score: number;           // 0-100
  matchReasons: string[];  // おすすめ理由
  readinessLevel: "高" | "中" | "低"; // 準備度
  requiredActions: string[]; // 出願までに必要な行動
  userType: UserTypeInfo;  // 判定されたユーザータイプ
  aiComment?: string;      // AIによる一言コメント（AIマッチング時のみ）
}

/** generateMatchResults の戻り値 */
export interface DiagnosisResult {
  matchResults: MatchResult[];
  userType: UserTypeInfo;
}

/** メンター（先輩大学生）データ */
export interface Mentor {
  id: string;
  universityId: string;
  name: string;           // ニックネーム
  faculty: string;
  grade: string;          // 学年
  hometown: string;       // 出身地
  highSchoolType: string; // 高校の種別
  message: string;        // 一言メッセージ
  specialties: string[];  // 相談得意分野
  availableDays: string[]; // 相談可能な曜日
  imageInitial: string;   // アバター用頭文字
  avatarColor: string;    // アバター背景色
}

/** 相談申請フォーム */
export interface ConsultationRequest {
  mentorId: string;
  studentName: string;
  email: string;
  grade: string;
  question: string;
  preferredDate: string;
}

/** マイページ保存データ */
export interface MyPageData {
  quizAnswers: QuizAnswers | null;
  savedUniversities: string[]; // university IDs
  lastDiagnosisDate: string | null;
  matchResults: MatchResult[];
}
