import Modal from "@/components/modal";
import { auth } from "@/lib/auth";
import Link from "next/link";
import FollowList from "./follow-list";

export default async function Follow() {
  const session = await auth();

  if (!session) {
    return (
      <Modal>
        <Link
          href="/api/auth/signin"
          className=" text-white text-2xl underline hover:text-white/50"
        >
          please login
        </Link>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className="max-w-xl max-h-[90vh] w-full h-auto border-[1px] border-muted-foreground bg-background rounded-lg mx-4 p-6 text-foreground  overflow-auto divide-y divide-muted">
        <FollowList id={session.user.id ?? ""} />
      </div>
    </Modal>
  );
}
