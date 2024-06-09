import { auth } from "@/lib/auth";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";
import VideoList from "./video-list";
import { getFavorites } from "@/actions/video";

export default async function Favorite() {
  const session = await auth();

  if (!session) {
    return (
      <div className=" h-screen w-screen flex items-center justify-center">
        <Link
          href="/api/auth/signin"
          className=" text-foreground text-2xl underline hover:text-foreground/50"
        >
          please login
        </Link>
      </div>
    );
  }

  const preData = await getFavorites(session.user.id);

  return (
    <>
      <div className="text-foreground mx-auto max-w-3xl space-y-10 p-10">
        <VideoList id={session.user.id} preData={preData} />
      </div>
      <Link
        href="/"
        className="fixed right-10 bottom-10 lg:right-20 lg:bottom-20 text-foreground"
      >
        <IconHome className="h-8 w-8" />
      </Link>
    </>
  );
}
