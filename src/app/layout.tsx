import "@/styles/globals.css";

import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import SWRProvider from "@/components/swr-provider";
import { getAllTags } from "@/actions/tag";

export const metadata: Metadata = {
  title: {
    default: "Qn-video",
    template: "%s | Qn-video",
  },
  description: "short video application by nextjs, nextAuth, prisma, etc.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const preTagsData = await getAllTags();
  return (
    <html lang="en">
      <body>
        <Toaster />
        <SWRProvider tagsData={preTagsData}>
          <Providers>{children}</Providers>
        </SWRProvider>
      </body>
    </html>
  );
}
