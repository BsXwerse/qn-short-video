import prisma from "@/lib/prisma"
import { videoDto } from "@/types/video"

export async function save({title, introduction, tag, cover, video, uploaderId}: videoDto) {
    await prisma.video.create({
        data: {
            title,
            introduction,
            url: video,
            coverUrl: cover,
            tags: {
                connectOrCreate: {
                    create: {
                        name: tag
                    },
                    where: {
                        name: tag
                    }
                }
            },
            uploder: {
                connect: {
                    id: uploaderId
                }
            }
        },
        
    })
}