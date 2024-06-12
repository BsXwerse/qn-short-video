/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true, //vercel limit
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.qiniu.bsxwerse.top',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
