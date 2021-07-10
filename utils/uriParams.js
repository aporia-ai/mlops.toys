module.exports = {
	encodeUriParam(param) {
		return encodeURI(param.replace(/ /gi, '-'))
	},
	decodeUriParam(param) {
		return decodeURI(param.replace(/-/gi, ' '))
	},
}
