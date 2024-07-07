import { Inter } from "next/font/google";
import { Template } from "@/components/page-view";
import TokenSuccessContent from "@/components/page-view/studio/TokenSuccessContent";

const inter = Inter({ subsets: ["latin"] });

export default function TemplatePage() {
  return <TokenSuccessContent />;
}
