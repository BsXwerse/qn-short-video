"use client";

import { Tag } from "@prisma/client";
import { SWRConfig } from "swr";

export default function SWRProvider({
  children,
  tagsData,
}: {
  children: React.ReactNode;
  tagsData?: Tag[];
}) {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/tag": tagsData,
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
