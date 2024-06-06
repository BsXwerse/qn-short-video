"use client";

import { useState, useEffect, useRef, Fragment, useCallback } from "react";
import { Transition } from "@headlessui/react";
import Video from "@/components/video";
import { throttle } from "@/common/throttle";
import Favorite from "@/components/favorite";
import clsx from "clsx";
import { VideoItem } from "@/types/video";
import { emitter } from "@/lib/mitt";
import {
  IconArrowBigDownLineFilled,
  IconArrowBigUpLineFilled,
} from "@tabler/icons-react";
import useSWR from "swr";
import { get } from "@/common/http";

const PAGE_SIZE = 5;

export default function Player({ tag }: { tag?: string }) {
  const [togle, setTogle] = useState(true);
  const togleRef = useRef(togle);
  const mainRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(true);
  const [isPlay, setIsPaly] = useState(false);
  const isPlayRef = useRef(isPlay);
  const [isAuto, setAuto] = useState(false);
  const cur = useRef(0);
  const A = useRef(0);
  const B = useRef(0);

  const [current, setCurrent] = useState(0);

  const { data: videoItems } = useSWR(
    ["/api/video", current, tag],
    ([url, pn, t]) =>
      get(url, {
        pageNum: pn,
        pageSize: PAGE_SIZE,
        tag: t ?? undefined,
      }),
  );

  const videoRef = useRef<VideoItem[]>(videoItems);

  useEffect(() => {
    videoRef.current = videoItems;
  }, [videoItems]);

  const changeUp = useCallback(async () => {
    if (cur.current % PAGE_SIZE === 0) {
      if (cur.current === 0) {
        return;
      }
      setCurrent(Math.floor((cur.current - 1) / PAGE_SIZE));
    }
    cur.current--;
    setDirection(false);
    togleRef.current = !togleRef.current;
    setTogle(togleRef.current);
    if (togleRef.current) {
      A.current = cur.current % PAGE_SIZE;
    } else {
      B.current = cur.current % PAGE_SIZE;
    }
  }, []);

  const changeDown = useCallback(async () => {
    if (videoRef.current.length === 0) return;
    if ((cur.current % PAGE_SIZE) + 1 === videoRef.current.length) {
      if (videoRef.current.length < PAGE_SIZE) {
        return;
      }
      setCurrent((cur.current + 1) / PAGE_SIZE);
    }
    cur.current++;
    setDirection(true);
    togleRef.current = !togleRef.current;
    setTogle(togleRef.current);
    if (togleRef.current) {
      A.current = cur.current % PAGE_SIZE;
    } else {
      B.current = cur.current % PAGE_SIZE;
    }
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0) {
        changeDown();
      } else {
        changeUp();
      }
    },
    [changeDown, changeUp],
  );

  const handleClick = useCallback((e: PointerEvent) => {
    if (
      e.clientY < (window.innerHeight * 4) / 5 &&
      e.clientY > window.innerHeight / 3
    ) {
      isPlayRef.current = !isPlayRef.current;
      setIsPaly(isPlayRef.current);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        changeUp();
      } else if (e.key === "ArrowDown") {
        changeDown();
      }
    },
    [changeDown, changeUp],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    useCallback(() => {
      emitter.on("autoplay", (x: any) => setAuto(x));
      const warpW = throttle(handleWheel, 600);
      const warpC = throttle(handleClick, 600);
      const warpK = throttle(handleKeyDown, 600);
      mainRef.current?.addEventListener("pointerup", warpC);
      mainRef.current?.addEventListener("wheel", warpW);
      document.addEventListener("keydown", warpK);
      return () => {
        mainRef.current?.removeEventListener("pointerup", warpC);
        mainRef.current?.removeEventListener("wheel", warpW);
        document.removeEventListener("keydown", warpK);
      };
    }, [handleClick, handleKeyDown, handleWheel]),
    [],
  );

  return (
    <div className="h-screen relative overflow-hidden" ref={mainRef}>
      <Favorite
        videoId={
          !videoItems || videoItems?.length === 0
            ? -1
            : videoItems?.[cur.current % PAGE_SIZE].id
        }
      />
      <div className="fixed right-5 top-28 flex lg:hidden flex-col items-center justify-center text-foreground/30 z-[200] gap-5">
        <button onClick={changeUp}>
          <IconArrowBigUpLineFilled className="w-10 h-10" />
        </button>
        <button onClick={changeDown}>
          <IconArrowBigDownLineFilled className="w-10 h-10" />
        </button>
      </div>
      <Transition
        as={Fragment}
        show={togle}
        enter="transition-all duration-500"
        enterFrom={clsx(
          "scale-50 opacity-0",
          {
            ["translate-y-[1000px]"]: direction,
          },
          {
            ["-translate-y-[1000px]"]: !direction,
          },
        )}
        enterTo="translate-y-0 scale-100 opacity-100"
        leave="transition-all duration-500 "
        leaveFrom="translate-y-0 scale-100 opacity-100"
        leaveTo={clsx(
          "scale-50 opacity-0",
          {
            ["-translate-y-[1000px]"]: direction,
          },
          {
            ["translate-y-[1000px]"]: !direction,
          },
        )}
      >
        <Video item={videoItems?.[A.current]} isPlay={isPlay} isAuto={isAuto} />
      </Transition>
      <Transition
        as={Fragment}
        show={!togle}
        enter="transition-all duration-500"
        enterFrom={clsx(
          "scale-50 opacity-0",
          {
            ["translate-y-[1000px]"]: direction,
          },
          {
            ["-translate-y-[1000px]"]: !direction,
          },
        )}
        enterTo="translate-y-0 scale-100 opacity-100"
        leave="transition-all duration-500"
        leaveFrom="translate-y-0 scale-100 opacity-100"
        leaveTo={clsx(
          "scale-50 opacity-0",
          {
            ["-translate-y-[1000px]"]: direction,
          },
          {
            ["translate-y-[1000px]"]: !direction,
          },
        )}
      >
        <Video item={videoItems?.[B.current]} isPlay={isPlay} isAuto={isAuto} />
      </Transition>
    </div>
  );
}
