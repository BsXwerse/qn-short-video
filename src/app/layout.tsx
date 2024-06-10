import '@/styles/globals.css';

import { getAllTags } from '@/actions/tag';
import Providers from '@/components/providers';
import SWRProvider from '@/components/swr-provider';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	title: {
		default: 'Qn-video',
		template: '%s | Qn-video',
	},
	description: 'short video application by nextjs, nextAuth, prisma, etc.',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const preTagsData = await getAllTags();
	return (
		<html lang="en">
			<body>
				<Toaster />
				<SWRProvider tagsData={preTagsData}>
					<Providers>{children}</Providers>
				</SWRProvider>
			</body>
		</html>
	);
}
