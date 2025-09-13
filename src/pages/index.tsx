import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BannerCarousel } from "@/widgets/bannerCarousel";
import { detectLanguage } from "@/shared/config/environment";

export default function Home() {
  const [lang, setLang] = useState<"ko" | "en">("ko");

  useEffect(() => {
    setLang(detectLanguage());
  }, []);

  return (
    <>
      <Head>
        <title>Decent assignment</title>
        <meta name="description" content="Decent assignment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        <section className="pt-4 pb-6">
          <BannerCarousel lang={lang} />
        </section>
      </main>
    </>
  );
}
