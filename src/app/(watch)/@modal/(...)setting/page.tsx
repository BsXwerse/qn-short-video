"use client";

import Modal from "@/components/modal";
import {
  IconBrightnessUp,
  IconMoon,
  IconCarouselVertical,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useSetAutoplay } from "@/components/providers";
import { useCallback, useEffect } from "react";

const AUTOPLAY_KEY = "autoplay";
const DARK_MODE_KEY = "dark-mode";

//TODO next theme
export default function Setting() {
  const router = useRouter();
  const setAutoplay = useSetAutoplay();
  const isDark = localStorage.getItem(DARK_MODE_KEY) === "true";
  const isAuto = localStorage.getItem(AUTOPLAY_KEY) === "true";

  const togleDark = useCallback(() => {
    const html = document.querySelector("html");
    if (!html) return;
    const isDark = html.classList.toggle("dark");
    isDark
      ? localStorage.setItem(DARK_MODE_KEY, "true")
      : localStorage.setItem(DARK_MODE_KEY, "false");
    router.back();
  }, [router]);

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
              <IconBrightnessUp /> Light Mode
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <IconMoon /> Dark Mode
            </span>
          )}
        </p>
        <p
          className="hover:bg-muted p-2 rounded-md hover:cursor-pointer flex items-center gap-2"
          onClick={togleAuto}
        >
          <IconCarouselVertical /> {isAuto ? "Auto Play Off" : "Auto Play On"}
        </p>
      </div>
    </Modal>
  );
}
