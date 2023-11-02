import prisma from '@/lib/prisma'
import { videoDto } from '@/types/video'
import { getUrl } from './oss-server'

export async function save({ title, introduction, tags, cover, video, uploaderId }: videoDto) {
    await prisma.video.create({
        data: {
            title,
            introduction,
            url: video,
            coverUrl: cover,
            tags: {
                connectOrCreate: tags.map((x) => {
                    return {
                        where: { name: x },
                        create: { name: x }
                    }
                })
            },
            uploder: {
                connect: {
                    id: uploaderId
                }
            }
        }
    })
}

export async function getByTag(pageNum: number, pageSize: number, tag?: string) {
    const withTag = tag ? { tags: { some: { name: tag } } } : {}
    const videos = await prisma.video.findMany({
        skip: pageNum * pageSize,
        take: pageSize,
        where: withTag,
        include: {
            uploder: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })
    videos.forEach((x) => {
        x.coverUrl = getUrl(x.coverUrl ? x.coverUrl : 'imgs/default.png')
        x.url = getUrl(x.url as string)
    })
    return videos
}

export async function getFavorites(userId: string) {
    const res = await prisma.video.findMany({
        where: {
            favoritedBy: {
                some: {
                    id: userId
                }
            }
        },
        include: {
            uploder: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })
    res.forEach((x) => {
        x.coverUrl = getUrl(x.coverUrl ? x.coverUrl : 'imgs/default.png')
        x.url = getUrl(x.url as string)
    })
    return res
}

export async function getById(id: number) {
    const res = await prisma.video.findUnique({
        where: {
            id: id
        }
    })
    if (!res) throw new Error('no video with id: ' + id)
    res.coverUrl = getUrl(res.coverUrl ? res.coverUrl : 'imgs/default.png')
    res.url = getUrl(res.url as string)
    return res
}

// export async function testGetAllId() {
//     const res = await prisma.user.findMany({
//         select: {
//             id: true
//         }
//     })
//     return res
// }
