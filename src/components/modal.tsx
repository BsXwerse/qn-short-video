"use client";

import { Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import {
  Fragment,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === ref.current) {
        router.back();
      }
    },
    [router, ref],
  );

  const keydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    },
    [router],
  );

  useEffect(() => {
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [keydown]);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div
        ref={ref}
        className="fixed inset-0 bg-black/60 z-[200] flex flex-col items-center justify-center overflow-auto"
        onClick={handleClick}
      >
        {children}
      </div>
    </Transition>
  );
}
