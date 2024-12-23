// app/add-news/page.tsx
"use client";  // Ensure this is marked if you're using App Router in Next.js

import dynamic from "next/dynamic";

// Dynamically import EnhancedEditor with no SSR
const EnhancedEditor = dynamic(() => import("@/components/EnhancedEditor"), {
  ssr: false,
});

export default function AddNewsPage() {
  return <EnhancedEditor />;
}
