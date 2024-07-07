import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/theme/ThemeProvider";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider as SessionProvider } from "next-auth/client"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
            <ToastContainer />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </SessionProvider>
  );
}
