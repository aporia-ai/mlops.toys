<template>
	<div class="project-card p-10 lg:p-6 rounded" :style="`background-color: ${backgroundColor}; --color: ${color};`">
		<!-- Header -->
		<div class="flex lg:block">
			<div class="flex mr-10 lg:mr-0 flex-2 text-zero">
				<div class="w-8 h-8 lg:w-6 lg:h-6 mr-5 lg:mr-4 mt-0.5 lg:mt-1 inline-block align-middle flex-shrink-0">
					<a
						:href="project.link"
						target="_blank"
						class="block transition-opacity hover:opacity-70"
						@click="$gtagEvents.externalLinkClick(project.link)"
					>
						<img
							:src="project.logo || '/images/projects/default.svg'"
							alt="project.name"
							class="block w-full h-full transform-gpu"
							loading="lazy"
						/>
					</a>
				</div>
				<div>
					<h3 class="text-2xl lg:text-xl font-bold inline mr-5 lg:mr-4 text-gray-900 align-middle">
						<a
							:href="project.link"
							target="_blank"
							class="link transition-colors"
							@click="$gtagEvents.externalLinkClick(project.link)"
							>{{ project.name }}</a
						>
					</h3>
					<a
						v-if="project.gitHubRepoName"
						:href="`https://github.com/${project.gitHubRepoName}`"
						target="_blank"
						class="github-link inline-flex items-center text-gray-400 align-middle transition-colors my-1"
						@click="$gtagEvents.externalLinkClick(`https://github.com/${project.gitHubRepoName}`)"
					>
						<Icon name="github" class="block w-5 h-5 lg:w-4 lg:h-4" />
						<Transition name="fade">
							<div v-if="parseInt(gitHubRepoStars) > 0" class="text-xs font-medium ml-2 lg:hidden">
								{{ gitHubRepoStars }}
							</div>
						</Transition>
					</a>
				</div>
			</div>
			<!-- Categories -->
			<div class="-m-1 flex lg:mr-0 flex-1">
				<table class="lg:block flex-grow">
					<tr class="row lg:block flex flex-wrap justify-end">
						<td class="lg:block flex flex-wrap">
							<div
								v-for="(item, itemKey) in project.categories"
								:key="itemKey"
								class="py-1 px-2.5 flex-wrap m-1"
								target="_blank"
							>
								<span
									class="text-sm lg:text-xs text-gray-400 flex-shrink-0 whitespace-nowrap mt-1.5 lg:mt-2"
								>{{ item }}
								</span>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>

		<!-- Works Well With -->
		<div v-if="project.worksWellWith || project.competesWith" class="mt-4 pb-6 border-b border-gray-200">
			<table class="lg:block">
				<tr v-if="project.worksWellWith" class="row lg:block">
					<td class="lg:block pr-7 text-sm text-gray-500 flex-shrink-0 whitespace-nowrap align-top">
						<span class="block pt-1 lg:pt-0 lg:pb-2">Works well with:</span>
					</td>
					<td class="lg:block">
						<div class="-m-1 flex justify-start flex-wrap">
							<div
								v-for="(item, itemKey) in project.worksWellWith"
								:key="itemKey"
								class="py-1 px-2.5 rounded border border-gray-500table-item m-1"
								target="_blank"
							>
								<span class="text-sm font-semibold align-middle" :class="{ 'mr-2': item.length > 1 }">{{
									item[0]
								}}</span>
								<span v-if="item[1]" class="text-xs align-middle text-gray-500">{{ item[1] }}</span>
							</div>
						</div>
					</td>
				</tr>
				<tr v-if="project.competesWith" class="row lg:block">
					<td class="lg:block pr-7 text-sm text-gray-500 flex-shrink-0 whitespace-nowrap align-top">
						<span class="block pt-1 lg:pt-0 lg:pb-2">Competes with:</span>
					</td>
					<td class="lg:block">
						<div class="-m-1 flex justify-start flex-wrap">
							<div
								v-for="(item, itemKey) in project.competesWith"
								:key="itemKey"
								class="py-1 px-2.5 rounded border border-gray-500table-item m-1"
							>
								<span class="text-sm font-semibold align-middle" :class="{ 'mr-2': item.length > 1 }">{{
									item[0]
								}}</span>
								<span v-if="item[1]" class="text-xs align-middle text-gray-500">{{ item[1] }}</span>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>

		<!-- Description -->
		<!--  eslint-disable vue/no-v-html -->
		<div
			v-if="project.description"
			class="description text-sm text-gray-600 mt-6"
			v-html="$md.render(project.description)"
		/>
		<!--  eslint-enable vue/no-v-html -->

		<!-- YouTube -->
		<div
			v-if="project.youTubeVideoId"
			class="block aspect-w-16 aspect-h-9 relative mt-10 lg:mt-6 rounded overflow-hidden group video-block"
		>
			<iframe
				class="w-100 h-100 absolute left-0 top-0 object-cover"
				:src="`https://www.youtube.com/embed/${project.youTubeVideoId}`"
				:title="`${project.name} Video`"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>
		<!-- Footer -->
		<div class="flex items-center flex-wrap mt-10 lg:mt-8">
			<AppButton
				tag="a"
				:href="project.link"
				target="_blank"
				theme="black"
				@click="$gtagEvents.externalLinkClick(project.link)"
			>
				{{ project.buttonText }}
			</AppButton>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import pSBC from 'shade-blend-color'

export default {
	name: 'ProjectCard',
	props: {
		project: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			gitHubRepoStars: 0,
		}
	},
	computed: {
		...mapGetters({
			categoryColors: 'getCategoryColors',
			projects: 'getProjects',
		}),
		color() {
			return this.categoryColors[this.project.categories[0]]
		},
		backgroundColor() {
			return pSBC(0.95, this.categoryColors[this.project.categories[0]])
		},
		octokit() {
			return this.$store.state.octokit
		},
	},
	mounted() {
		if (this.project.gitHubRepoName) {
			this.octokit.rest.repos
				.get({
					owner: this.project.gitHubRepoName.split('/')[0],
					repo: this.project.gitHubRepoName.split('/')[1],
				})
				.then(({ data }) => {
					this.gitHubRepoStars = data?.stargazers_count.toLocaleString()
				})
		}
	},
}
</script>

<style lang="scss" scoped>
@use "sass:math";

.project-card {
	break-inside: avoid;

	.row {
		&:not(:first-child) {
			@apply lg:mt-4;

			td {
				@apply pt-2 lg:pt-0;
			}
		}
	}

	.github-link,
	.link {
		&:hover {
			color: var(--color);
		}
	}

	.description {
		::v-deep li {
			padding-left: 1.8rem;
			position: relative;

			&::before {
				position: absolute;
				left: 0;
				top: 0;
			}
		}

		::v-deep ol {
			counter-reset: counter;

			li {
				counter-increment: counter;

				&::before {
					content: counter(counter) '.';
				}
			}
		}

		::v-deep ul li {
			&::before {
				content: '—';
			}
		}

		::v-deep *:not(:first-child) {
			margin-top: math.div(16, 14) * 1em;
		}

		::v-deep li:not(:first-child) {
			margin-top: 0.5em;
		}
	}

	.youtube-icon-bg {
		fill: black;
		opacity: 0.75;
	}

	.video-block:hover .youtube-icon-bg {
		fill: var(--color);
		opacity: 1;
	}
}
</style>
