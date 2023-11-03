import { faker } from '@faker-js/faker'
import { videoDto } from '@/types/video'

// import { testGetAllId } from '@/actions/video'

// export async function genRandomVideos(count: number) {
//     const randomVideoArray: videoDto[] = []
//     const ids = await testGetAllId()
//     const genTags = () => {
//         const res: string[] = []
//         for(let i = 0; i < 3; i++) {
//             res.push(faker.lorem.word({ length: { min: 3, max: 6 }}))
//         }
//         return res
//     }
//     for (let i = 0; i < count; i++) {
//         const randomVideo: videoDto = {
//             title: faker.lorem.words({ min: 1, max: 5 }),
//             introduction: faker.lorem.sentences({ min: 1, max: 5 }),
//             tags: genTags(),
//             cover: faker.image.url(),
//             video: faker.internet.url(),
//             uploaderId: ids[i%ids.length].id
//         }

//         randomVideoArray.push(randomVideo)
//     }

//     return randomVideoArray
// }

export type UserDto = {
    name: string
    email: string
    image: string
}

export function genRandomUser(count: number) {
    let res: UserDto[] = []
    for (let i = 0; i < count; i++) {
        const t: UserDto = {
            name: faker.lorem.words({ min: 1, max: 2 }),
            email: faker.internet.email(),
            image: faker.image.avatarGitHub()
        }
        res.push(t)
    }
    return res
}
