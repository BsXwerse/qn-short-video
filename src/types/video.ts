import { Video } from '@prisma/client'

export interface videoDto {
    title: string
    introduction: string
    tags: string[]
    cover: string
    video: string
    uploaderId: string
}

export type VideoItem = Video & {
    uploder: {
        image: string | null
        name: string | null
    }
}
