import prisma from '@/lib/prisma'

export async function isFavorited(userId: string, videoId: number) {
    const count = await prisma.user.count({
        where: {
            id: userId,
            favorites: {
                some: {
                    id: videoId
                }
            }
        }
    })
    return count > 0
}

export async function addOrCancel(userId: string, videoId: number) {
    if (await isFavorited(userId, videoId)) {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                favorites: {
                    disconnect: {
                        id: videoId
                    }
                }
            }
        })
    } else {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                favorites: {
                    connect: {
                        id: videoId
                    }
                }
            }
        })
    }
    return await isFavorited(userId, videoId)
}
