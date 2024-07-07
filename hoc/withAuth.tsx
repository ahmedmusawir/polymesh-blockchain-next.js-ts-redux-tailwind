import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { useSession } from "next-auth/client"

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [session, loading] = useSession()
    const router = useRouter();

    if (loading) return null

    // If user is not authenticated, redirect to home
    if (!loading && !session) {
      router.replace('/');
      return null;
    }

    // If user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
