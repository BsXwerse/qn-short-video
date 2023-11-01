import prisma from '@/lib/prisma'
import { videoDto } from '@/types/video'

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
    return res
}

export async function getById(id: number) {
    const res = await prisma.video.findUnique({
        where: {
            id: id
        }
    })
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
