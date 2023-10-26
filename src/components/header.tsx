import LoginBar from "./loginbar";

export default function Header() {
    return (
        <header className="h-12 fixed inset-x-0 mx-auto max-w-5xl flex items-center justify-between  bg-background/30 rounded backdrop-blur-[10px] shadow-md text-foreground z-10 lg:hidden">
            <LoginBar showName={false}/>
        </header>
    )
}