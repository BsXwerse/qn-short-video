import type { Metadata } from "next";
import LeftBar from "@/app/(watch)/leftbar";
import Header from "./header";
import RightBar from "./rightbar";
import { getAllTags } from "@/actions/tag";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Video playback home page, you can use the mouse wheel or up and down keys to switch videos",
};

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const preTagsData = await getAllTags();

  return (
    <>
      <div className="flex">
        <LeftBar preData={preTagsData} />
        <main className="mx-auto max-w-4xl w-full">
          <Header />
          {children}
        </main>
        <RightBar />
      </div>
      {modal}
    </>
  );
}
