export type Platform = "android" | "ios";
export type Language = "ko" | "en";
export type BuildEnv = "dev" | "stage" | "prod";

export const detectPlatform = (): Platform => {
  if (typeof window === "undefined") {
    return "android";
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "ios";
  }

  if (/android/.test(userAgent)) {
    return "android";
  }

  return "android";
};

export const detectLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "ko";
  }

  const browserLang = window.navigator.language.toLowerCase();

  if (browserLang.startsWith("ko")) {
    return "ko";
  }

  return "en";
};

export const environment = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api/mock",
  platform: detectPlatform(),
  language: detectLanguage(),
  buildEnv: (process.env.NEXT_PUBLIC_BUILD_ENV as BuildEnv) || "dev"
};
