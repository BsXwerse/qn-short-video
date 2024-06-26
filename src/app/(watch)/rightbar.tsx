import Link from 'next/link';
import LoginBar from './loginbar';

export default async function RightBar() {
	return (
		<div className="hidden h-screen right-0 w-60 shrink-0 mr-5 lg:flex flex-col justify-between text-xl border-l-[1px] text-foreground border-foreground/30">
			<div className="flex flex-col gap-4 py-10 px-8">
				<Link href="/">
					<div className=" flex items-center justify-center mb-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-api-app hover:bg-foreground/10 rounded-full transition-colors duration-150"
							width="40"
							height="40"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<title>home button</title>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 15h-6.5a2.5 2.5 0 1 1 0 -5h.5" />
							<path d="M15 12v6.5a2.5 2.5 0 1 1 -5 0v-.5" />
							<path d="M12 9h6.5a2.5 2.5 0 1 1 0 5h-.5" />
							<path d="M9 12v-6.5a2.5 2.5 0 0 1 5 0v.5" />
						</svg>
					</div>
				</Link>
				<hr className=" border-foreground/30" />
				<Link href="/search">
					<div className=" px-5 inline-flex gap-2  h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
						<div className="i-tabler-search text-2xl" />
						<span>search</span>
					</div>
				</Link>
				<Link href="/follow">
					<div className=" px-5 inline-flex gap-2  h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
						<div className="i-tabler-user-plus text-2xl" />
						<span>follow</span>
					</div>
				</Link>
				<Link href="/favorites">
					<div className=" px-5 inline-flex gap-2  h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
						<div className="i-tabler-heart text-2xl" />
						<span>favorites</span>
					</div>
				</Link>
				<Link href="/setting">
					<div className=" px-5 inline-flex gap-2  h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
						<div className="i-tabler-settings text-2xl" />
						<span>setting</span>
					</div>
				</Link>
				<Link href="/upload">
					<div className="px-5 inline-flex gap-2  h-14 rounded-full items-center bg-indigo-600 hover:bg-indigo-700 transition-colors duration-150 text-white">
						<div className="i-tabler-upload text-2xl" />
						<span>upload</span>
					</div>
				</Link>
			</div>
			<LoginBar showName={true} />
		</div>
	);
}
