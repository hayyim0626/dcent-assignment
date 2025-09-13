import path from "path";
import type { UserConfig } from "next-i18next";

const config: UserConfig = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
    localeDetection: false
  },
  localePath: path.resolve("./public/locales"),
  react: {
    useSuspense: false
  },
  interpolation: {
    escapeValue: false
  },
  debug: process.env.NODE_ENV === "development"
};

export default config;
