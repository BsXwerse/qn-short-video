import { get } from '@/common/http';
import * as qiniu from 'qiniu-js';

type ReturnBody = {
	hash: string;
	key: string;
};

export async function uploadOSS(file: File, key: string) {
	const token = await get<string>('/api/oss/token');
	const observable = qiniu.upload(file, key, token);
	return new Promise<ReturnBody>((resolve, reject) => {
		const observer = {
			error(err: any) {
				reject(err);
			},
			complete(res: any) {
				resolve(res);
			},
		};
		observable.subscribe(observer);
	});
}
