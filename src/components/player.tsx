"use client";

import { useCallback, useEffect, useMemo } from "react";
import Video from "@/components/video";
import { VideoItem } from "@/types/video";
import useSWRInfinite from "swr/infinite";
import { get } from "@/common/http";
import { motion } from "framer-motion";
import { Virtuoso } from "react-virtuoso";
import qs from "qs";

const PAGE_SIZE = 5;

export default function Player({ tag }: { tag?: string }) {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: VideoItem[]) => {
      if (previousPageData && previousPageData.length <= 0) return null;
      const query = qs.stringify(
        {
          pageNum: pageIndex,
          pageSize: PAGE_SIZE,
          tag: tag,
        },
        {
          arrayFormat: "comma",
          skipNulls: true,
          addQueryPrefix: true,
          encode: true,
        },
      );
      return `/api/video${query}`;
    },
    [tag],
  );

  const { data, setSize } = useSWRInfinite(getKey, get<VideoItem[]>);

  //disable space key scroll
  useEffect(() => {
    const f = (e: KeyboardEvent) => e.key === " " && e.preventDefault();
    document.addEventListener("keydown", f);
    return () => document.removeEventListener("keydown", f);
  }, []);

  const videoList = useMemo(() => {
    const list: VideoItem[] = [];
    data?.forEach((i) => list.push(...i));
    return list;
  }, [data]);

  return (
    <div className="h-screen overflow-hidden">
      <Virtuoso
        className="snap-y snap-mandatory"
        data={videoList}
        endReached={() => setSize((pre) => pre + 1)}
        overscan={2000}
        itemContent={(_, data) => (
          <>
            <div className="h-[50px]" />
            <div className="h-screen snap-center snap-always relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-300px 0px" }}
                transition={{
                  ease: "easeIn",
                  duration: 0.2,
                }}
                className="h-full"
              >
                <Video item={data} />
              </motion.div>
            </div>
            <div className="h-[50px]" />
          </>
        )}
      />
    </div>
  );
}
