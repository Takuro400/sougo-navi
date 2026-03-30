import type { Metadata } from "next";
import { getUniversityById } from "@/data/universities";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sougo-navi.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const university = getUniversityById(id);

  if (!university) {
    return {
      title: "大学情報が見つかりません",
    };
  }

  const title = `${university.name} ${university.faculty} | 総合型選抜対策`;
  const description = `${university.name}${university.faculty}の総合型選抜情報。選考方法・出願時期・難易度・向いている学生像を詳しく解説。総合型相性：${university.sougoCompatibility}。${university.description.slice(0, 60)}…`;
  const pageUrl = `${siteUrl}/universities/${id}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: pageUrl,
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default function UniversityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
