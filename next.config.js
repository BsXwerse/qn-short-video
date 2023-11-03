const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'http',
        hostname: 's3h4ivnuq.hn-bkt.clouddn.com',
        pathname: '/**'
      },
    ],
  },
};

module.exports = nextConfig;
