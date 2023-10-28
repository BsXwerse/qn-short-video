"use client";

import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import {
  IconMenu,
  IconHeart,
  IconSettings,
  IconUpload,
  IconSearch,
  IconTestPipe2,
  IconUserPlus,
} from "@tabler/icons-react";
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
        <IconMenu />
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
          <Link href="/test">
            <div className=" px-5 py-3 inline-flex gap-2 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150 ">
              <IconTestPipe2 />
              test
            </div>
          </Link>
          <Link href="/search">
            <div className=" px-5 py-3 inline-flex gap-2  rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <IconSearch />
              <span>search</span>
            </div>
          </Link>
          <Link href="/follow">
            <div className=" px-5 py-3 inline-flex gap-2  rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <IconUserPlus />
              <span>follow</span>
            </div>
          </Link>
          <Link href="/favorites">
            <div className=" px-5 py-3 inline-flex gap-2  rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <IconHeart />
              <span>favorites</span>
            </div>
          </Link>
          <Link href="/upload">
            <div className=" px-5 py-3 inline-flex gap-2  rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <IconUpload />
              <span>upload</span>
            </div>
          </Link>
          <Link href="/setting">
            <div className=" px-5 py-3 inline-flex gap-2 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
              <IconSettings />
              <span>setting</span>
            </div>
          </Link>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
