import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  headers: async () => {
    const cspMode = process.env.CSP_MODE || "dev";
    const isSandbox = process.env.NEXT_PUBLIC_MIDTRANS_ENVIRONMENT === "sandbox";

    // CSP untuk development mode lebih permissive, production lebih strict
    const scriptSrc =
      cspMode === "production"
        ? "'self' https://snap-assets.al-pc-id-b.cdn.gtflabs.io https://app.sandbox.midtrans.com https://app.midtrans.com https://pay.google.com https://va.vercel-scripts.com"
        : "'self' 'unsafe-eval' 'unsafe-inline' https://snap-assets.al-pc-id-b.cdn.gtflabs.io https://app.sandbox.midtrans.com https://app.midtrans.com https://pay.google.com https://js-agent.newrelic.com https://bam.nr-data.net https://gwk.gopayapi.com https://va.vercel-scripts.com";

    const cspHeader = `
      default-src 'self';
      script-src ${scriptSrc};
      style-src 'self' 'unsafe-inline' https://snap-assets.al-pc-id-b.cdn.gtflabs.io;
      img-src 'self' data: https:;
      frame-src 'self' https://app.sandbox.midtrans.com ${isSandbox ? "" : "https://app.midtrans.com"} https://pay.google.com;
      connect-src 'self' https://api.sandbox.midtrans.com ${isSandbox ? "" : "https://api.midtrans.com"} https://app.sandbox.midtrans.com ${isSandbox ? "" : "https://app.midtrans.com"} https://pay.google.com https://js-agent.newrelic.com https://bam.nr-data.net http://localhost:3000;
      font-src 'self' data:;
    `.replace(/\n\s+/g, " ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
