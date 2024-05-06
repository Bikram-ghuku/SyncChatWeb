import CryptoJS from 'crypto-js'

export const encryptSymmetric = async (data: string) => {
	const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
	const encData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	})
	return encData.toString()
}

export const decryptSymmetric = async (data: string) => {
	const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
	const dencData = CryptoJS.AES.decrypt(data, key, {
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	})
	return CryptoJS.enc.Utf8.stringify(dencData)
}
export const encryptSymmetricKey = async (data: string, key: string) => {
	if(key){
		const encData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		})
		return encData.toString()
	}
	return data
}

export const decryptSymmetricKey = async (data: string, key: string) => {
	if(key){
		const dencData = CryptoJS.AES.decrypt(data, key, {
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		})
		return CryptoJS.enc.Utf8.stringify(dencData)
	}
	return data
}