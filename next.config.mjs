/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Photos and logos are served from the live TIS site's static media folder.
    // Allowing only that path keeps the image optimiser from fetching anything else.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tis.edu.in",
        pathname: "/_next/static/media/**",
      },
    ],
  },
};

export default nextConfig;
