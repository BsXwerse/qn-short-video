import Player from '@/components/player'

export default function TagPlayer({ params }: { params: { slug: string } }) {
    return <Player tag={params.slug} />
}
