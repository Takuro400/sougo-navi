import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
);

export type DiagnosisResult = {
  id?: string;
  created_at?: string;
  user_type: string | null;
  top_university: string | null;
  top_faculty: string | null;
  score: number | null;
  prefecture: string | null;
  answers: Record<string, unknown>;
  line_clicked: boolean;
  user_agent: string | null;
};
