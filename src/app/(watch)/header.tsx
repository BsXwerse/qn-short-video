'use client';

import { useSearchParams } from 'next/navigation';
import LoginBar from './loginbar';
import MobileTag from './mobile-tag';
import MobileNav from './moblie-nav';

export default function Header() {
const searchParams = useSearchParams();
	return (
		<header className="h-12 fixed inset-x-0 mx-auto max-w-5xl flex items-center justify-between  bg-background/30 rounded backdrop-blur-[10px] shadow-md text-foreground z-[200] lg:hidden">
			<LoginBar showName={false} />
			<span className=" font-semibold">
				{searchParams.get('tag') ?? ''}
			</span>
			<div className="flex items-center justify-center px-8 gap-5">
				<MobileTag />
				<MobileNav />
			</div>
		</header>
	);
}
