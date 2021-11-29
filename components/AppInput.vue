<template>
	<input
		type="text"
		class="app-input text-sm lg:text-xs block w-full h-11 px-4 text-gray-900 placeholder-gray-400 appearance-none border border-solid border-gray-200 rounded-md shadow-sm focus:ring focus:ring-purple-50 focus:border-purple-300 focus:placeholder-gray-500 transition-all"
	/>
</template>

<style lang="scss" scoped>
.app-input {
	&::placeholder {
		transition: color 0.2s ease;
	}
}
</style>
