"use client";

import { PageTransitionShell } from "@/components/motion/PageTransitionShell";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransitionShell>{children}</PageTransitionShell>;
}
