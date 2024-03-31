export function isBase64(str: string | undefined): boolean {
	if (!str) return false
	const base64Regex = /^(data:){0,1}([A-Za-z0-9+/]){4}([AQgw]){2}==$/
	return base64Regex.test(str)
}

export function isFile(obj: any): obj is File {
	return obj instanceof File
}
