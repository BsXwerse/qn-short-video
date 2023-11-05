import * as qiniu from 'qiniu-js'
import { get } from './request'
import { revalidatePath } from 'next/cache'

type ReturnBody = {
    hash: string
    key: string
}

export async function uploadOSS(file: File, key: string) {
    revalidatePath('/api/oss/token')
    const res = await get<string>('/api/oss/token')
    if (res.code !== 200 || typeof res.body !== 'string') throw new Error('get token failed')
    const token = res.body
    const observable = qiniu.upload(file, key, token)
    return new Promise<ReturnBody>((resolve, reject) => {
        const observer = {
            error(err: any) {
                reject(err)
            },
            complete(res: any) {
                resolve(res)
            }
        }
        observable.subscribe(observer)
    })
}
