"use client";

import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import { IconCategory, IconBallFootball } from "@tabler/icons-react";
import { useState, Fragment } from "react";

export default function MobileTag() {
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
          offset: [50, 10],
        },
      },
    ],
  });
  const tags = [
    "life",
    "sports",
    "pet",
    "music",
    "travel",
    "food",
    "comedy",
    "technology",
    "education",
    "news",
    "gaming",
    "beauty",
    "fitness",
    "vlogs",
    "documentary",
    "fashion",
    "health",
    "DIY",
    "entertainment",
    "cars",
    "science",
    "art",
    "history",
    "business",
    "cooking",
    "gardening",
    "crafts",
    "celebrities",
    "nature",
    "photography",
    "dance",
    "magic",
    "anime",
    "reviews",
    "trailer",
    "reactions",
    "interviews",
    "reality",
    "pranks",
    "how-to",
    "unboxing",
    "product demos",
    "home improvement",
    "music videos",
    "sustainability",
    "parenting",
    "finance",
    "horror",
    "romance",
    "thriller",
    "fantasy",
    "scifi",
  ];
  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <IconCategory />
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
          className="z-10 bg-background/90 border-foreground/50 border-[1px] rounded m-2 backdrop-blur flex flex-col  justify-center text-base p-2 overflow-auto max-h-72 gap-2"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {tags.map((x, index) => (
            <Link href={"/tag/" + x} key={index}>
              <div className=" px-3 py-1 inline-flex gap-2 rounded-full items-center hover:bg-foreground/10 transition-colors duration-150 ">
                <IconBallFootball />
                <span>{x}</span>
              </div>
            </Link>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
