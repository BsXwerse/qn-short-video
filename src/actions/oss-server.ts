import { options, mac, getPrivateDownloadUrl } from '@/lib/qiniu'
import qiniu from 'qiniu'

export function getToken() {
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    return uploadToken
}

export function getUrl(key: string) {
    return getPrivateDownloadUrl(key)
}
