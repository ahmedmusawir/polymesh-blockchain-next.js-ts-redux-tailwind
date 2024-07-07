import PolymeshStudioContent from "@/components/page-view/studio/PolymeshStudioContent";
import withAuth from "../../hoc/withAuth";

function PolymeshPage() {
  return <PolymeshStudioContent />;
}

export default withAuth(PolymeshPage);