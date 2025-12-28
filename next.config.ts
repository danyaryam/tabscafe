import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    const isSandbox =
      process.env.NEXT_PUBLIC_MIDTRANS_ENVIRONMENT === "sandbox";

    const snapAssets = "https://snap-assets.al-pc-id-bd.cdn.gtflabs.io";

    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'", // penting untuk Snap popup
      snapAssets,
      "https://app.sandbox.midtrans.com",
      "https://app.midtrans.com",
      "https://pay.google.com",
      // opsional (kalau memang dipakai)
      "https://js-agent.newrelic.com",
      "https://bam.nr-data.net",
      "https://gwk.gopayapi.com",
      "https://va.vercel-scripts.com",
    ].join(" ");

    const cspHeader = `
      default-src 'self';
      script-src ${scriptSrc};
      style-src 'self' 'unsafe-inline' ${snapAssets};
      img-src 'self' data: https:;
      frame-src 'self' https://app.sandbox.midtrans.com ${
        isSandbox ? "" : "https://app.midtrans.com"
      } https://pay.google.com;
      connect-src 'self'
        https://api.sandbox.midtrans.com ${
          isSandbox ? "" : "https://api.midtrans.com"
        }
        https://app.sandbox.midtrans.com ${
          isSandbox ? "" : "https://app.midtrans.com"
        }
        https://pay.google.com
        https://js-agent.newrelic.com
        https://bam.nr-data.net
        http://localhost:3000;
      font-src 'self' data:;
    `.replace(/\n\s+/g, " ");

    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: cspHeader }],
      },
    ];
  },
};

export default nextConfig;
