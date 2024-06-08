import { IconHeartFilled } from "@tabler/icons-react";
import clsx from "clsx";

export default function Favorite({
  isFavorited,
  handleClick,
}: {
  isFavorited: boolean;
  handleClick: () => void;
}) {
  return (
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
  );
}
