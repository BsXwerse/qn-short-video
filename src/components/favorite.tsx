import { IconHeartFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { get, post } from "@/common/http";

export default function Favorite({ videoId }: { videoId: number }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: isFavorited, mutate } = useSWR(
    ["/api/user/favorite", session?.user.id ?? "", videoId],
    ([url, userId, videoId]) =>
      get<boolean>(url, {
        userId,
        videoId,
      }),
  );

  const handleClick = useCallback(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    } else {
      session &&
        post("/api/user/favorite", {
          userId: session.user.id,
          videoId,
        }).then(() => mutate());
    }
  }, [mutate, router, session, status, videoId]);

  return (
    videoId !== -1 && (
      <button
        className="w-16 h-16 bg-white/50 absolute  rounded-full right-72 lg:right-0 bottom-28 flex items-center justify-center z-[110] hover:bg-white/70"
        onClick={handleClick}
      >
        <IconHeartFilled
          className={clsx("w-10 h-10 transition-colors", {
            ["text-red-500"]: isFavorited,
            ["text-white"]: !isFavorited,
          })}
        />
      </button>
    )
  );
}
