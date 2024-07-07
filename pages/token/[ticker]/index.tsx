import { Inter } from "next/font/google";
import ConfigureTokenContent from "@/components/page-view/studio/ConfigureTokenContent";

const inter = Inter({ subsets: ["latin"] });

export default function TemplatePage() {
  return <ConfigureTokenContent />;
}
