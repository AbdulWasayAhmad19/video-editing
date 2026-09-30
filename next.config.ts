import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move the development build indicator ("N" icon) out of the way
  devIndicators: {
    position: "bottom-left",
  },

  // Drop the `X-Powered-By: Next.js` response header.
  poweredByHeader: false,

  compiler: {
    // Strip `console.*` from production bundles, keeping error/warn for
    // monitoring. Left on in dev so logs stay available.
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Long-lived caching for static assets (hero portrait, project screenshots, CV) so repeat
  // visits and in-page transitions never refetch them.
  async headers() {
    const year = "public, max-age=31536000, immutable";
    return [
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: year }] },
      { source: "/:file(.*\\.(?:pdf|png|jpg|jpeg|webp|avif|svg|ico|woff2))", headers: [{ key: "Cache-Control", value: year }] },
    ];
  },

  experimental: {
    // Tree-shake icon packs so only the icons used ship to the client.
    optimizePackageImports: ["react-icons", "react-icons/fa", "react-icons/fi"],
  },

  images: {
    // Optimised variants are cached by the image optimiser for a year.
    minimumCacheTTL: 31536000,
    // Modern formats — smaller than JPEG/PNG; the browser picks what it supports.
    formats: ["image/avif", "image/webp"],
    // Breakpoints `next/image` uses to build `srcset`. `deviceSizes` covers
    // full-width images (aligned with the adaptive-grid breakpoints + retina);
    // `imageSizes` covers smaller, fixed-width images and icons.
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // React Compiler (automatic memoisation) is an opt-in performance win.
  // It requires the `babel-plugin-react-compiler` dev dependency and routes
  // the build through Babel — enable once installed:
  // reactCompiler: true,
};

export default nextConfig;
