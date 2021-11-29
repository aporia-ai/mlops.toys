<template>
	<svg-icon :name="name" :class="`icon icon-${name}`" :style="iconStyle" />
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true,
		},
		size: {
			type: [Number, Array],
			default: undefined,
		},
	},
	computed: {
		iconStyle() {
			if (!this.size) return {}

			let width = this.size
			let height = this.size

			if (Array.isArray(this.size)) {
				width = this.size[0]
				height = this.size[1]
			}

			return {
				width: `${width}px`,
				height: `${height}px`,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.icon {
	display: block;
	fill: currentColor;
}
</style>
