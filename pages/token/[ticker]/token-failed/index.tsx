import { Inter } from "next/font/google";
import { Template } from "@/components/page-view";
import TokenFailedContent from "@/components/page-view/studio/TokenFailedContent";

const inter = Inter({ subsets: ["latin"] });

export default function TemplatePage() {
  return <TokenFailedContent />;
}
