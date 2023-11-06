import { getAll } from '@/actions/follow'
import Modal from '@/components/modal'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Follow() {
    const session = await auth()
    if (!session) {
        return (
            <Modal>
                <Link href="/api/auth/signin" className=" text-white text-2xl underline hover:text-white/50">
                    please login
                </Link>
            </Modal>
        )
    }
    const follows = session ? await getAll(session.user.id) : []
    return (
        <Modal>
            <div className="max-w-xl max-h-[90vh] w-full h-auto border-[1px] border-muted-foreground bg-background rounded-lg mx-4 p-6 text-foreground  overflow-auto divide-y divide-muted">
                {follows.map((x) => (
                    <div key={x.id} className="flex items-center gap-4 py-3">
                        <Image src={x.image as string} width={40} height={40} alt="user image" className=" rounded-full" />
                        <div>
                            <p className=" font-semibold">{x.name}</p>
                            <p className=" text-muted-foreground text-[12px]">{x.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    )
}
