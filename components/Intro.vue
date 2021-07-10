<template>
	<div ref="introSection" class="pt-24 pb-10 lg:pb-10 lg:pt-16 text-center overflow-hidden transform-gpu bg-gray-50">
		<Container ref="introContainer" class="max-w-lg lg:max-w-md">
			<Icon name="logo" class="block w-16 h-16 lg:w-10 lg:h-10 text-aporia mx-auto" />
			<h1 class="text-3xl lg:text-xl mx-auto font-bold text-gray-900 mt-3">MLOps.toys</h1>
			<p class="mt-4 text-lg lg:text-base text-gray-500">A curated list of MLOps projects</p>
			<AppButton
				tag="a"
				href="#projects"
				class="inline-block mt-8 lg:mt-6"
				@click="
					$gtag.event('click', {
						event_category: 'button',
						event_label: 'Discover projects',
					})
				"
				>Discover projects</AppButton
			>
		</Container>
		<div
			ref="floating-logos"
			class="floating-logos lg:hidden pointer-events-none absolute left-10 right-10 top-24 bottom-14"
		>
			<div
				v-for="(container, containerKey) in floatingLogos"
				:key="containerKey"
				class="floating-logos-container flex flex-col justify-between"
				:class="container.class"
			>
				<div
					v-for="(row, rowKey) in container.rows"
					:key="`logos-row-${containerKey}-${rowKey}`"
					class="floating-logos-row flex items-center w-full"
					:class="row.class"
				>
					<div
						v-for="(logo, logoKey) in row.logos"
						:key="`logo-${logoKey}`"
						class="floating-logo relative filter rounded flex items-center justify-center"
						:class="logo[1]"
						:style="
							logos[logo[0]]
								? `background-color: ${pSBC(0.87, logos[logo[0]].color)};`
								: 'background-color: transparent'
						"
					>
						<img
							v-if="logos[logo[0]]"
							:src="logos[logo[0]].src"
							class="block w-7/12 h-7/12"
							:alt="logos[logo[0]].name"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import pSBC from 'shade-blend-color'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Container from '~/components/Container.vue'
gsap.registerPlugin(ScrollTrigger)

export default {
	name: 'Intro',
	components: {
		Container,
	},
	data() {
		return {
			floatingLogos: [
				{
					class: 'absolute -left-24 top-0 bottom-0',
					rows: [
						{
							class: 'justify-around',
							logos: [
								[0, 'w-6 h-6'],
								[1, 'w-8 h-8 mb-4'],
								[2, 'w-10 h-10 mt-1'],
							],
						},
						{
							class: 'justify-around',
							logos: [
								[3, 'w-8 h-8 mb-3'],
								[4, 'w-10 h-10'],
								[5, 'w-8 h-8 mt-1'],
								[6, 'w-6 h-6 mt-1'],
							],
						},
						{
							class: 'justify-around',
							logos: [
								[7, 'w-6 h-6 mb-2'],
								[8, 'w-8 h-8 mt-3'],
								[9, 'w-10 h-10 mb-4 mr-10'],
							],
						},
						{
							class: 'justify-around px-10',
							logos: [
								[10, 'w-8 h-8 ml-20'],
								[11, 'w-10 h-10 mt-3 ml-20'],
								[12, 'w-6 h-6'],
							],
						},
					],
				},
				{
					class: 'absolute -right-24 top-0 bottom-0',
					rows: [
						{
							class: 'justify-around px-10',
							logos: [
								[13, 'w-10 h-10'],
								[14, 'w-8 h-8'],
							],
						},
						{
							class: 'justify-around px-6',
							logos: [
								[15, 'w-8 h-8'],
								[16, 'w-10 h-10'],
								[17, 'w-6 h-6'],
							],
						},
						{
							class: 'justify-around',
							logos: [
								[18, 'w-6 h-6'],
								[19, 'w-8 h-8'],
								[20, 'w-10 h-10'],
								[21, 'w-8 h-8'],
							],
						},
						{
							class: 'justify-around px-10',
							logos: [
								[22, 'w-10 h-10'],
								[23, 'w-6 h-6'],
								[24, 'w-8 h-8'],
							],
						},
					],
				},
			],
		}
	},
	computed: {
		...mapGetters({
			logos: 'getProjectsIntroLogos',
		}),
	},
	mounted() {
		this.$nextTick(() => {
			this.scrollTriggerInstance = ScrollTrigger.create({
				trigger: this.$refs.introSection,
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				animation: gsap.to(this.$refs.introContainer.$el, {
					y: '100%',
					opacity: 0,
					ease: 'none',
				}),
				onUpdate: (self) => {
					this.setShowLogoInFilters(self.progress === 1)
				},
			})

			this.scrollTriggerInstanceLogos = ScrollTrigger.create({
				trigger: this.$refs.introSection,
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				animation: gsap.to(this.$refs['floating-logos'], {
					y: '110%',
					opacity: 0,
					ease: 'none',
				}),
			})
		})
	},
	unmounted() {
		this.scrollTriggerInstance?.kill()
		this.scrollTriggerInstanceLogos?.kill()
	},
	updated() {
		this.scrollTriggerInstance?.update()
		this.scrollTriggerInstanceLogos?.update()
	},
	methods: {
		...mapMutations(['setShowLogoInFilters']),
		pSBC,
	},
}
</script>

<style lang="scss" scoped>
.floating-logo {
	@keyframes floating {
		0% {
			transform: translate3d(0, 0, 0);
		}

		50% {
			transform: translate3d(0, -30%, 0);
		}

		100% {
			transform: translate3d(0, 0, 0);
		}
	}

	animation: floating 2s ease infinite;

	@for $i from 1 to 50 {
		&:nth-child(#{$i}) {
			animation-delay: #{0.15 * $i}s;
		}
	}
}

.floating-logos-container {
	width: calc(50% - 5rem);
}
</style>
