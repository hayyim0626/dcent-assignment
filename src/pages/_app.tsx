import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { QueryProvider } from "@/providers/queryProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <div className="max-w-[480px] min-h-screen mx-auto">
        <Component {...pageProps} />
      </div>
    </QueryProvider>
  );
}

export default appWithTranslation(App);
