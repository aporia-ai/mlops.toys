<template>
	<div class="footer text-gray-400 py-10 text-sm lg:text-xs">
		<Container class="flex items-center justify-between lg:flex-col mt-5 lg:mt-10">
			<!-- Left -->
			<div class="flex items-center lg:flex-col">
				<Icon name="logo" class="w-6 h-6 mr-5 lg:mr-0 flex-shrink-0" />
				<div class="lg:text-center lg:mt-5">
					Licensed under
					<a
						href="https://creativecommons.org/licenses/by-sa/4.0/"
						class="text-gray-600 hover:text-purple-600 transition-colors whitespace-nowrap"
						target="_blank"
						@click="$gtagEvents.externalLinkClick('https://creativecommons.org/licenses/by-sa/4.0/')"
						>CC BY-SA 4.0</a
					>
				</div>
			</div>

			<!-- Right -->
			<div class="flex items-center lg:mt-6 flex-shrink-0">
				<div>Made with</div>
				<div>
					<Icon name="heart" class="heart block w-5 h-5 mx-2 text-aporiaRed" />
				</div>
				<div>by</div>
				<a
					href="https://www.aporia.com?utm_source=mlops-toys&utm_medium=inhouse-application&utm_campaign=mlops-toys"
					target="_blank"
					class="block transition-opacity hover:opacity-70"
					@click="$gtagEvents.externalLinkClick('https://aporia.com')"
				>
					<img :src="AporiaLogo" alt="Aporia" class="block ml-3 h-8 lg:h-6" />
				</a>
			</div>
		</Container>
	</div>
</template>

<script>
import AporiaLogo from '~/assets/logo-aporia.svg'

export default {
	data() {
		return {
			AporiaLogo,
			suggestionProject: '',
		}
	},
}
</script>

<style lang="scss" scoped>
.heart {
	@keyframes heartbeat {
		0% {
			transform: scale(0.75);
		}

		10% {
			transform: scale(1);
		}

		20% {
			transform: scale(0.75);
		}

		30% {
			transform: scale(1);
		}

		40% {
			transform: scale(0.75);
		}

		50% {
			transform: scale(0.75);
		}

		100% {
			transform: scale(0.75);
		}
	}

	animation: heartbeat 2s infinite ease;
}

.suggest-form {
	width: 22rem;
}
</style>
