import { faker } from '@faker-js/faker'
import { videoDto } from '@/types/video'

export function generateRandomVideoArray(count: number): videoDto[] {
    const randomVideoArray: videoDto[] = []

    for (let i = 0; i < count; i++) {
        const randomVideo: videoDto = {
            title: faker.lorem.words({ min: 1, max: 5 }),
            introduction: faker.lorem.sentences({ min: 1, max: 5 }),
            tag: faker.lorem.word({ length: { min: 3, max: 6 } }),
            cover: faker.image.url(),
            video: faker.internet.url(),
            uploaderId: 'clo8oxlfz0000u0hkm6epkvwn'
        }

        randomVideoArray.push(randomVideo)
    }

    return randomVideoArray
}

export const imgArray = [
    'https://cdn.pixabay.com/photo/2023/10/13/14/39/book-8312948_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/09/16/21/31/girl-8257551_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/10/17/10/32/building-8320842_1280.png',
    'https://cdn.pixabay.com/photo/2023/10/18/03/31/macro-8322755_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/12/18/33/jackdaw-8249384_640.jpg',
    'https://cdn.pixabay.com/photo/2023/10/16/10/51/fox-8318961_640.png',
    'https://cdn.pixabay.com/photo/2023/10/09/16/54/childrens-book-8304585_640.jpg',
    'https://cdn.pixabay.com/photo/2023/10/12/14/41/town-8310950_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/18/20/01/woman-8261342_640.jpg',
    'https://cdn.pixabay.com/photo/2023/10/13/19/54/meadows-8313453_640.jpg',
    'https://cdn.pixabay.com/photo/2023/10/04/02/55/mountains-8292685_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/17/10/17/milky-way-8258264_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/20/20/17/skyline-8265564_640.jpg',
    'https://cdn.pixabay.com/photo/2023/10/06/10/55/toddler-8297939_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/28/20/16/man-8282467_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/15/11/43/torii-8254663_640.jpg',
    'https://cdn.pixabay.com/photo/2023/10/02/16/09/bike-8289452_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/29/07/52/mountains-8283189_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/18/13/46/building-8260627_640.jpg',
    'https://cdn.pixabay.com/photo/2023/08/14/21/44/mountain-8190836_640.jpg',
    'https://cdn.pixabay.com/photo/2023/04/26/13/18/shell-7952399_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/09/12/17/59/stones-8249322_640.jpg',
    'https://cdn.pixabay.com/photo/2023/08/20/09/43/window-frame-8202075_640.jpg'
]

export const videoArray = [
    'https://player.vimeo.com/external/400338460.sd.mp4?s=ea493408a2527bfe478fbee39cb3cc8f350c4622&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/421540218.sd.mp4?s=d996f73a9faa7347a301e90a5b98d26221f8eec1&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/427710919.sd.mp4?s=a6f4a02af947baa4185f77f80d1539401a298ccc&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/551306105.sd.mp4?s=63ea3c6079e15c7de2d64cb8a191d13f64799155&profile_id=165&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/353228361.sd.mp4?s=6cdc67bda0e3efab809aaa8e126a47dfeef7d5b0&profile_id=165&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/353228361.sd.mp4?s=6cdc67bda0e3efab809aaa8e126a47dfeef7d5b0&profile_id=165&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/456103991.sd.mp4?s=d9ca19ba2487a991824baa2063b16a6e0d1a604d&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/502459375.sd.mp4?s=eba1924a234c8ca8f758277b515b01215be5b836&profile_id=165&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/456112109.sd.mp4?s=2a7999d538d239e5621f44c6fce2ccc45ee34011&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/459533899.sd.mp4?s=89e6f8bc5645bada685a53a97b0390d95d1e8bac&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/539670899.sd.mp4?s=c8b6825b48c26bff07fc03c29f53ee91cb47ad0d&profile_id=165&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/548789655.sd.mp4?s=4d794aa16c3a7045e50cfd0c5715bb9704159372&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/554035638.sd.mp4?s=a0b2cfb574a127bca9c4e04252e9ab4fe4960793&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/456104737.sd.mp4?s=11b1da5b9bb60af4c8cc5c15f3271cf7b9e8ce5d&profile_id=165&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/494752269.sd.mp4?s=78705abb978278a4b058e6cb9aaf5644d5eb9b7f&profile_id=164&oauth2_token_id=57447761',
    'https://player.vimeo.com/external/455802231.sd.mp4?s=e4f00b120fe379bf318b461010a05592879c9574&profile_id=165&oauth2_token_id=57447761'
]
