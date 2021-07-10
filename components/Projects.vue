<template>
	<div id="projects" class="projects">
		<!-- Header -->
		<div
			class="header my-5 lg:my-2 sticky backdrop-filter backdrop-blur-xl top-0 left-0 w-full z-10 transform-gpu"
			style="background-color: rgba(255, 255, 255, 0.8)"
			:class="{
				'shadow-sm': $store.state.showLogoInFilters,
			}"
		>
			<div class="py-5 lg:py-4 transform-gpu">
				<Container class="flex items-center justify-between lg:block">
					<a
						href="/"
						class="mr-10 lg:hidden text-gray-400 flex items-center hover:text-aporia flex-shrink-0 transform transform-gpu transition-all"
						:class="{
							'translate-x-4 opacity-0 pointer-events-none': !$store.state.showLogoInFilters,
						}"
						@click="$gtagEvents.externalLinkClick('/')"
					>
						<Icon name="logo" class="block w-8 h-8 lg:hidden" />
						<div class="ml-4">
							<div class="text-xl font-bold">MLOps.toys</div>
							<div class="text-xs text-gray-400 text-right -mt-1.5">by Aporia</div>
						</div>
					</a>
					<div class="relative overflow-hidden">
						<div ref="header" class="scroller overflow-x-auto">
							<div class="flex items-center flex-nowrap justify-start">
								<div
									class="clear-button-wrapper overflow-hidden flex-shrink-0"
									:class="{
										'is-hidden': selectedCategoriesVisual.length === 0,
									}"
								>
									<NuxtLink
										:to="{ name: 'category', params: {} }"
										type="button"
										class="group whitespace-nowrap text-xs mr-4 pr-2 flex-shrink-0"
									>
										<div class="flex items-center">
											<div
												class="border border-solid border-gray-200 flex-shrink-0 p-1 rounded mr-2 flex items-center group-hover:border-purple-300 transition-colors"
											>
												<Icon
													name="cross"
													class="w-2 h-2 block text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0"
												/>
											</div>
											<span
												class="text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0"
												>Clear</span
											>
										</div>
									</NuxtLink>
								</div>
								<AppButton
									v-for="category in categories"
									:key="category"
									size="small"
									theme="gray-transparent"
									class="app-button flex-shrink-0 border border-solid border-gray-200"
									:style="
										selectedCategoriesVisual.includes(category)
											? `background-color: ${pSBC(0.93, categoryColors[category][0])}; color: ${
													categoryColors[category][0]
											  }; border-color: transparent;`
											: ''
									"
									type="button"
									@click="
										$router.push({
											name: 'category',
											params: { category: encodeUriParam(category) },
										})
									"
								>
									{{ category }}
								</AppButton>
							</div>
						</div>
						<button
							type="button"
							class="absolute left-0 top-0 bottom-0 bg-gradient-to-l from-transparent to-white items-center justify-center pr-12 z-10 transition-all duration-200 arrow-animation-left flex text-gray-400 hover:text-purple-600 lg:hover:text-gray-400"
							:class="{
								'opacity-0 pointer-events-none':
									headerScrollPosition === 0 || headerScrollPosition === -1,
							}"
							@click="categoriesScrollLeft"
						>
							<Icon name="arrow" class="w-3 h-3 block transform rotate-180" />
						</button>
						<button
							type="button"
							class="absolute right-0 top-0 bottom-0 bg-gradient-to-r from-transparent to-white items-center justify-center pl-12 z-10 transition-all duration-200 arrow-animation-right flex text-gray-400 hover:text-purple-600 lg:hover:text-gray-400"
							:class="{
								'opacity-0 pointer-events-none':
									headerScrollPosition === 1 || headerScrollPosition === -1,
							}"
							@click="categoriesScrollRight"
						>
							<Icon name="arrow" class="w-3 h-3 block transform" />
						</button>
					</div>
				</Container>
			</div>
		</div>

		<!-- Cards -->
		<!-- column-count-3 2xl:column-count-2 column-gap-10 lg:column-count-1 -->
		<Container
			class="max-w-screen cards -mb-6 transition-all transform"
			:class="{ 'opacity-0 translate-y-5': projectsHidden }"
		>
			<Masonry :cols="{ default: 3, 1920: 2, 1023: 1 }" :gutter="40">
				<ProjectCard
					v-for="project in filteredProjects"
					:key="project.name"
					:project="project"
					class="mb-10 lg:mb-6"
				/>
			</Masonry>
			<div :key="filteredProjects.length" class="transition-runner hidden"></div>
		</Container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import pSBC from 'shade-blend-color'
import Masonry from '@/components/Masonry.vue'
import { encodeUriParam, decodeUriParam } from '../utils/uriParams'
export default {
	name: 'Projects',
	components: {
		Masonry,
	},
	data() {
		return {
			selectedCategoriesVisual: [],
			selectedCategories: [],
			headerScrollPosition: 0,
			projectsHidden: false,
			projectHideTimeout: null,
		}
	},
	computed: {
		...mapGetters({
			projects: 'getProjects',
			categories: 'getCategories',
			categoryColors: 'getCategoryColors',
		}),
		filteredProjects() {
			return this.selectedCategories.length > 0
				? this.projects.filter((project) => this.selectedCategories.includes(project.category))
				: this.projects
		},
	},
	watch: {
		selectedCategoriesVisual() {
			setTimeout(() => {
				this.checkHeaderScrollPosition()
			}, 500)
		},
		'$route.params.category': {
			handler(categoryParam) {
				if (!categoryParam) {
					this.clearCategories()
					return
				}

				const category = this.categories.find(
					(category) => this.decodeUriParam(categoryParam).toLowerCase() === category.toLowerCase(),
				)

				if (!category) {
					this.$router.replace({ name: 'category', params: {} })
				}
				this.toggleCategory(category)
			},
			immediate: true,
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.$refs?.header?.addEventListener('scroll', () => {
				this.checkHeaderScrollPosition()
			})

			window.addEventListener('resize', () => {
				this.checkHeaderScrollPosition()
			})

			this.checkHeaderScrollPosition()
		})
	},
	methods: {
		encodeUriParam,
		decodeUriParam,
		toggleCategory(categoryName) {
			const isCategorySelected =
				this.selectedCategoriesVisual.length > 0 && this.selectedCategoriesVisual[0] === categoryName

			if (process.client) {
				this.$gtag.event('click', {
					event_category: 'categories',
					event_label: categoryName,
					value: isCategorySelected ? 0 : 1,
				})
			}
			this.projectsHidden = true

			clearTimeout(this.projectHideTimeout)

			// Single select
			if (isCategorySelected) {
				this.selectedCategoriesVisual = []
			} else {
				this.selectedCategoriesVisual = [categoryName]
			}

			// Uncomment this for multiselect:
			// !this.selectedCategoriesVisual.includes(categoryName)
			//   ? this.selectedCategoriesVisual.push(categoryName)
			//   : (this.selectedCategoriesVisual = this.selectedCategoriesVisual.filter(
			//       (category) => category !== categoryName
			//     ))

			this.projectHideTimeout = setTimeout(() => {
				this.selectedCategories = this.selectedCategoriesVisual.toString()
				this.projectsHidden = false
			}, 300)
		},
		pSBC,
		checkHeaderScrollPosition() {
			const currentScroll = this.$refs?.header?.scrollLeft
			const maxScroll = this.$refs?.header?.scrollWidth - this.$refs?.header?.offsetWidth

			this.headerScrollPosition = maxScroll > 0 ? currentScroll / maxScroll : -1
		},
		clearCategories() {
			if (process.client) {
				this.$gtag.event('click', {
					event_category: 'categories',
					event_label: 'clear',
				})
			}
			this.selectedCategoriesVisual.forEach((category) => {
				this.toggleCategory(category)
			})
		},
		categoriesScrollRight() {
			if (process.client) {
				this.$gtag.event('click', {
					event_category: 'categories',
					event_label: 'scroll right',
				})
			}
			this.$refs?.header?.scrollTo({
				left: this.$refs?.header?.scrollLeft + 200,
				behavior: 'smooth',
			})
		},
		categoriesScrollLeft() {
			if (process.client) {
				this.$gtag.event('click', {
					event_category: 'categories',
					event_label: 'scroll left',
				})
			}
			this.$refs?.header?.scrollTo({
				left: this.$refs?.header?.scrollLeft - 200,
				behavior: 'smooth',
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.arrow-animation-left {
	@keyframes left {
		0% {
			transform: translate3d(0, 0, 0) rotate(180deg);
		}

		25% {
			transform: translate3d(40%, 0, 0) rotate(180deg);
		}

		50% {
			transform: translate3d(0, 0, 0) rotate(180deg);
		}

		100% {
			transform: translate3d(0, 0, 0) rotate(180deg);
		}
	}

	svg {
		animation: left 2s ease infinite;
	}
}

.arrow-animation-right {
	@keyframes right {
		0% {
			transform: translate3d(0, 0, 0);
		}

		25% {
			transform: translate3d(-40%, 0, 0);
		}

		50% {
			transform: translate3d(0, 0, 0);
		}

		100% {
			transform: translate3d(0, 0, 0);
		}
	}

	svg {
		animation: right 2s ease infinite;
	}
}

.clear-button-wrapper {
	transition: opacity 0.2s ease 0.2s, transform 0.2s ease 0.2s, max-width 0.2s ease;
	max-width: 6rem;
	opacity: 1;
	transform: translate3d(0, 0, 0);

	&.is-hidden {
		opacity: 0;
		transform: translate3d(-25%, 0, 0);
		max-width: 0;
		transition: opacity 0.2s ease, transform 0.2s ease, max-width 0.2s ease 0.2s;
	}
}

.scroller {
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
}

.app-button {
	&:not(:last-child) {
		@apply mr-4;
	}
}
</style>
