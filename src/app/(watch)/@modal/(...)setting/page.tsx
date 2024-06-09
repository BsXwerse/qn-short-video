"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useSetAutoplay } from "@/components/providers";
import { useCallback } from "react";
import { useTheme } from "next-themes";

const AUTOPLAY_KEY = "autoplay";

export default function Setting() {
  const router = useRouter();
  const setAutoplay = useSetAutoplay();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const isAuto = localStorage.getItem(AUTOPLAY_KEY) === "true";

  const togleDark = useCallback(() => {
    isDark ? setTheme("light") : setTheme("dark");
    router.back();
  }, [isDark, router, setTheme]);

  const togleAuto = useCallback(() => {
    const v = localStorage.getItem(AUTOPLAY_KEY);
    v === "true"
      ? localStorage.setItem(AUTOPLAY_KEY, "false")
      : localStorage.setItem(AUTOPLAY_KEY, "true");
    setAutoplay(localStorage.getItem(AUTOPLAY_KEY) === "true");
    router.back();
  }, [router, setAutoplay]);

  return (
    <Modal>
      <div className=" bg-background border-muted-foreground border-[1px] rounded-lg max-w-xs max-h-[90vh] w-auto h-auto p-4 text-foreground space-y-2 font-semibold text-xl overflow-auto text-center">
        <p
          className="hover:bg-muted p-2 rounded-md hover:cursor-pointer"
          onClick={togleDark}
        >
          {isDark ? (
            <span className="flex items-center gap-2">
              <div className="i-tabler-brightness-up text-3xl" /> Light Mode
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <div className="i-tabler-moon text-2xl" /> Dark Mode
            </span>
          )}
        </p>
        <p
          className="hover:bg-muted p-2 rounded-md hover:cursor-pointer flex items-center gap-2"
          onClick={togleAuto}
        >
          <div className="i-tabler-carousel-vertical text-2xl" />
          {isAuto ? "Auto Play Off" : "Auto Play On"}
        </p>
      </div>
    </Modal>
  );
}
