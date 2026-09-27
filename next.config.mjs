/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // The old WordPress addresses, so links already shared keep working.
  async redirects() {
    return [
      ["/about-us", "/about"],
      ["/about-us-2", "/about"],
      ["/meet-our-founder", "/founder"],
      ["/join-us", "/join"],
      ["/the-valiants-pledge", "/pledge"],
      ["/code-of-ethics-conduct", "/ethics"],
      ["/contact-us", "/contact"],
      ["/event", "/events"],
      ["/vidoes", "/gallery"],
      ["/videos", "/gallery"],
      ["/downloads", "/about"],
      ["/the-valiant-choir-competition-registration", "/programmes/choir"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
