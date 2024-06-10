'use client';

import { createContextState } from 'foxact/context-state';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

const [AutoplayProvider, useAutoplayValue, useSetAutoplay] =
	createContextState(false);

export { useAutoplayValue, useSetAutoplay };

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<SessionProvider>
				<AutoplayProvider>{children}</AutoplayProvider>
			</SessionProvider>
		</ThemeProvider>
	);
}
