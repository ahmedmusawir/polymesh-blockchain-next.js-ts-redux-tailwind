import { Inter } from "next/font/google";
import StudioEntryContent from "@/components/page-view/studio/StudioEntryContent";
import withAuth from "../../hoc/withAuth";

const inter = Inter({ subsets: ["latin"] });

function StudioEntryPage() {
  return <StudioEntryContent />;
}

export default withAuth(StudioEntryPage);