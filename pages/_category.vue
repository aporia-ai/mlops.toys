<template>
	<div>
		<Header />
		<Intro />
		<Projects />
		<Footer />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Index',
	key(route) {
		return route.name
	},
	scrollToTop: false,
	head() {
		return {
			script: this.projects.map((project) => ({
				type: 'application/ld+json',
				json: {
					'@context': 'http://schema.org',
					'@type': 'VideoObject',
					name: `${project.name} Video`,
					description: `${project.description.split('\n')[0]}`,
					thumbnailUrl: `https://i.ytimg.com/vi/${project.youTubeVideoId}/default.jpg`,
					uploadDate: '2021-07-10T10:38:33Z',
					embedUrl: `https://www.youtube.com/embed/${project.youTubeVideoId}`,
				},
			})),
		}
	},
	computed: {
		...mapGetters({
			projects: 'getProjects',
		}),
	},
}
</script>

<style>
.index {
	display: block;
}
</style>
