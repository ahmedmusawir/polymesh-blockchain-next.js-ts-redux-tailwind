import { Inter } from "next/font/google";
import { Template } from "@/components/page-view";
import PostReduxTest from "@/components/test/PostReduxTest";

const inter = Inter({ subsets: ["latin"] });

export default function TestPage() {
  return <PostReduxTest />;
}
