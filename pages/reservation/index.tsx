import { Inter } from "next/font/google";
import ReservationsContent from "@/components/page-view/studio/ReservationContent";
import withAuth from "../../hoc/withAuth";

const inter = Inter({ subsets: ["latin"] });

function ReservationPage() {
  return <ReservationsContent />;
}

export default withAuth(ReservationPage);