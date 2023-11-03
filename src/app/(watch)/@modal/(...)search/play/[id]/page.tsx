import { getById } from '@/actions/video'
import Modal from '@/components/modal'

export default async function Play({ params }: { params: { id: string } }) {
    const video = await getById(parseInt(params.id))
    return (
        <Modal>
            <div className="max-w-3xl max-h-[90vh] h-full">
                <video className="h-full shadow rounded" controls loop>
                    <source src={video.url as string} />
                </video>
            </div>
        </Modal>
    )
}
