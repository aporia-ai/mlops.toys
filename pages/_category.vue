<template>
	<div>
		<Header />
		<Intro />
		<Projects />
		<Footer />
	</div>
</template>

<script>
export default {
	name: 'Index',
	key(route) {
		return route.name
	},
	scrollToTop: false,
}
</script>

<style>
.index {
	display: block;
}
</style>
