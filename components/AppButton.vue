<template>
	<component
		:is="tag"
		:type="type"
		class="rounded transition-colors"
		:class="[sizeClasses, themeClasses]"
		@click="$emit('click')"
	>
		<slot />
	</component>
</template>

<script>
export default {
	props: {
		size: {
			type: String,
			default: 'default',
		},
		theme: {
			type: String,
			default: 'purple',
		},
		tag: {
			type: String,
			default: 'button',
		},
		type: {
			type: String,
			default: '',
		},
	},
	computed: {
		sizeClasses() {
			let sizeClasses = ''

			switch (this.size) {
				case 'default':
					sizeClasses = 'px-6 lg:px-3 py-3 lg:py-2 text-sm lg:text-xs lg:font-medium'
					break

				case 'small':
					sizeClasses = 'px-3 py-2 text-xs font-medium'
					break
			}

			return sizeClasses
		},
		themeClasses() {
			let themeClasses = ''

			switch (this.theme) {
				case 'purple':
					themeClasses = 'text-white bg-purple-600 hover:bg-purple-700'
					break

				case 'black':
					themeClasses = 'text-white bg-gray-900 hover:bg-gray-800'
					break

				case 'gray':
					themeClasses = 'text-gray-500 bg-gray-50 hover:bg-gray-100'
					break

				case 'gray-transparent':
					themeClasses = 'text-gray-500 hover:bg-gray-50'
					break
			}

			return themeClasses
		},
	},
}
</script>
