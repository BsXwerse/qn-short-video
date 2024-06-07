"use client";

import { SessionProvider } from "next-auth/react";
import { createContextState } from "foxact/context-state";

const [AutoplayProvider, useAutoplayValue, useSetAutoplay] =
  createContextState(false);

export { useAutoplayValue, useSetAutoplay };

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AutoplayProvider>{children}</AutoplayProvider>
    </SessionProvider>
  );
}
