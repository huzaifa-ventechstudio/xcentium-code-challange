/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:any*",
  //       destination: "/",
  //     },
  //   ];
  // },
  images: {
    domains: ["m.media-amazon.com"],
  },
};

module.exports = nextConfig;
