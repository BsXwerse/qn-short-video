import { VideoItem } from "@/types/video";
import { useState, useEffect } from "react";
import VideoInfo from "./video-info";
import DefaultCover from "../../public/imgs/default.png";
import Image from "next/image";
import Favorite from "./favorite";
import clsx from "clsx";

export default function Video({
  item,
  isAutoplay = false,
}: {
  item: VideoItem;
  isAutoplay: boolean;
}) {
  const videoId = `${item.id}-${item.url ?? ""}`;
  const [showInfo, setShowInfo] = useState(!isAutoplay);
  const [showVideo, setShowVideo] = useState(isAutoplay);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowVideo(false);
        setShowInfo(true);
        (document.getElementById(videoId) as any)?.pause();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [videoId]);

  return (
    <div className="absolute inset-0 ">
      <VideoInfo item={item} isShow={showInfo} />
      <Favorite videoId={item.id} />
      {!showVideo && (
        <>
          <Image
            src={item ? (item.coverUrl as string) : DefaultCover}
            alt="video cover"
            className="h-full object-contain absolute z-20"
            width={1000}
            height={1000}
          />
          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow z-40"
            onClick={() => {
              setShowVideo(true);
              setShowInfo(false);
              (document.getElementById(videoId) as any)?.play();
            }}
          >
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 hover:opacity-75 transition duration-150 ease-in-out"
              viewBox="0 0 88 88"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="78.169%"
                  y1="9.507%"
                  x2="24.434%"
                  y2="90.469%"
                  id="a"
                >
                  <stop stopColor="#EBF1F5" stopOpacity=".8" offset="0%" />
                  <stop stopColor="#EBF1F5" offset="100%" />
                </linearGradient>
              </defs>
              <circle fill="url(#a)" cx="44" cy="44" r="44" />
              <path
                className="fill-current text-violet-400"
                d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
              />
            </svg>
          </button>
        </>
      )}
      <video
        id={videoId}
        autoPlay={isAutoplay}
        className={clsx("absolute inset-0 m-auto h-full z-10 rounded", {
          ["visible"]: showVideo,
          ["invisible"]: !showVideo,
        })}
        controls
        preload="metadata"
      >
        <source src={item ? (item.url as string) : ""} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
