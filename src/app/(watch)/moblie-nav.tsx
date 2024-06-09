"use client";

import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useState, Fragment } from "react";

export default function MobileNav() {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [20, 10],
        },
      },
    ],
  });
  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <div className="i-tabler-menu text-2xl" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition-opacity duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity  duration-100 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel
          className="z-10 bg-background/90 border-foreground/50 border-[1px] rounded m-2 backdrop-blur flex flex-col justify-center text-base p-2"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <Link href="/">
            <div className=" px-5 py-3 inline-flex gap-2 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150 ">
              <div className="i-tabler-home text-2xl" />
              home
            </div>
          </Link>
          <Link href="/search">
            <div className=" px-5 py-3 inline-flex gap-2  rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <div className="i-tabler-search text-2xl" />
              <span>search</span>
            </div>
          </Link>
          <Link href="/follow">
            <div className=" px-5 py-3 inline-flex gap-2  rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <div className="i-tabler-user-plus text-2xl" />
              <span>follow</span>
            </div>
          </Link>
          <Link href="/favorites">
            <div className=" px-5 py-3 inline-flex gap-2  rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <div className="i-tabler-heart text-2xl" />
              <span>favorites</span>
            </div>
          </Link>
          <Link href="/upload">
            <div className=" px-5 py-3 inline-flex gap-2  rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <div className="i-tabler-upload text-2xl" />
              <span>upload</span>
            </div>
          </Link>
          <Link href="/setting">
            <div className=" px-5 py-3 inline-flex gap-2 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <div className="i-tabler-settings text-2xl" />
              <span>setting</span>
            </div>
          </Link>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
