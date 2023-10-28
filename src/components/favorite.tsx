import { IconHeartFilled } from "@tabler/icons-react";

export default function Favorite() {
  return (
    <div className="w-16 h-16 bg-foreground/50 absolute  rounded-full right-10 lg:right-80 bottom-20 flex items-center justify-center">
      <IconHeartFilled className=" w-10 h-10 text-red-500 lg:text-white" />
    </div>
  );
}
