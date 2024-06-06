"use client";

import Loading from "@/components/loading";
import { User } from "@prisma/client";
import useSWR from "swr";
import Image from "next/image";
import { get } from "@/common/http";

export default function FollowList({ id }: { id: string }) {
  const { data: follows, isLoading } = useSWR(
    ["api/user/myfollow", id],
    ([url, id]) =>
      get<User[]>(url, {
        id,
      }),
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        follows?.map((x) => (
          <div key={x.id} className="flex items-center gap-4 py-3">
            <Image
              src={x.image as string}
              width={40}
              height={40}
              alt="user image"
              className=" rounded-full"
            />
            <div>
              <p className=" font-semibold">{x.name}</p>
              <p className=" text-muted-foreground text-[12px]">{x.email}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
}
