"use client";

import Loading from "@/components/loading";
import Image from "next/image";
import DefaultImg from "../../../public/imgs/default.png";
import useSWR from "swr";
import VideoCard from "@/components/video-card";
import { get } from "@/common/http";
import { VideoItem } from "@/types/video";

export default function VideoList({ id }: { id: string }) {
  const { data: videos, isLoading } = useSWR(
    ["/api/favorite/all", id],
    ([url, id]) =>
      get<VideoItem[]>(url, {
        id,
      }),
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : videos && videos.length > 0 ? (
        videos.map((x) => (
          <VideoCard key={x.id} item={x} jumpUrl="/favorites/play/" />
        ))
      ) : (
        <Image
          src={DefaultImg}
          alt="no video"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      )}
    </>
  );
}
