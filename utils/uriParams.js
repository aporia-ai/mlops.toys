module.exports = {
	encodeUriParam(param) {
		return encodeURI(param.replace(/ /gi, '-')).toLowerCase()
	},
	decodeUriParam(param) {
		return decodeURI(param.replace(/-/gi, ' '))
	},
}
