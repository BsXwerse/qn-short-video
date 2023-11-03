import { putPolicy, mac, getPrivateDownloadUrl } from '@/lib/qiniu'

export function getToken() {
    const uploadToken = putPolicy.uploadToken(mac)
    return uploadToken
}

export function getUrl(key: string) {
    return getPrivateDownloadUrl(key)
}
