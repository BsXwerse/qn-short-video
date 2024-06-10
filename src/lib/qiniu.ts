import qiniu from 'qiniu';

export const mac = new qiniu.auth.digest.Mac(
	process.env.QN_ACCESS_KEY as string,
	process.env.QN_SECRET_KEY as string,
);

export const options: qiniu.rs.PutPolicyOptions = {
	scope: process.env.QN_BUCKET,
	expires: 300,
};

const config = new qiniu.conf.Config();
const bucketManager = new qiniu.rs.BucketManager(mac, config);
const privateBucketDomain = process.env.QN_URL as string;
const deadline = Math.ceil(Date.now() / 1000) + 3600;

export function getPrivateDownloadUrl(key: string) {
	return bucketManager.privateDownloadUrl(privateBucketDomain, key, deadline);
}
