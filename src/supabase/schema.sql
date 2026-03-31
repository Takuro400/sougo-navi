-- Supabase SQL Editor で実行してください
-- 診断結果テーブル

CREATE TABLE diagnosis_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_type TEXT,
  top_university TEXT,
  top_faculty TEXT,
  score INTEGER,
  prefecture TEXT,
  answers JSONB,
  line_clicked BOOLEAN DEFAULT FALSE,
  user_agent TEXT
);

-- RLS（Row Level Security）を有効化
ALTER TABLE diagnosis_results ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーからの INSERT を許可（診断結果の保存）
CREATE POLICY "Allow anonymous insert" ON diagnosis_results
  FOR INSERT TO anon
  WITH CHECK (true);

-- 匿名ユーザーからの UPDATE を許可（line_clicked の更新）
CREATE POLICY "Allow anonymous update" ON diagnosis_results
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- Service role からの SELECT を許可（管理者ダッシュボード）
CREATE POLICY "Allow service role select" ON diagnosis_results
  FOR SELECT TO anon
  USING (true);

-- カラム追加（既存テーブルへの追加）
-- Supabase SQL Editor で実行してください
ALTER TABLE diagnosis_results ADD COLUMN IF NOT EXISTS nickname TEXT;
ALTER TABLE diagnosis_results ADD COLUMN IF NOT EXISTS grade TEXT;
ALTER TABLE diagnosis_results ADD COLUMN IF NOT EXISTS concern TEXT;
