<template>
  <div
    class="project-card p-10 lg:p-6 rounded"
    :style="`background-color: ${backgroundColor}; --color: ${color};`"
  >
    <!-- Header -->
    <div class="flex lg:block">
      <div class="flex mr-10 lg:mr-0 flex-1 text-zero">
        <div
          class="w-8 h-8 lg:w-6 lg:h-6 mr-5 lg:mr-4 mt-0.5 lg:mt-1 inline-block align-middle flex-shrink-0"
        >
          <a
            :href="project.link"
            target="_blank"
            class="block transition-opacity hover:opacity-70"
            @click.prevent="$gtagEvents.externalLinkClick(project.link)"
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
          <h3
            class="text-2xl lg:text-xl font-bold inline mr-5 lg:mr-4 text-gray-900 align-middle"
          >
            <a
              :href="project.link"
              target="_blank"
              class="link transition-colors"
              @click.prevent="$gtagEvents.externalLinkClick(project.link)"
              >{{ project.name }}</a
            >
          </h3>
          <a
            v-if="project.gitHubRepoName"
            :href="`https://github.com/${project.gitHubRepoName}`"
            target="_blank"
            class="github-link inline-flex items-center text-gray-400 align-middle transition-colors my-1"
            @click.prevent="
              $gtagEvents.externalLinkClick(
                `https://github.com/${project.gitHubRepoName}`
              )
            "
          >
            <Icon name="github" class="block w-5 h-5 lg:w-4 lg:h-4" />
            <Transition name="fade">
              <div
                v-if="parseInt(gitHubRepoStars) > 0"
                class="text-xs font-medium ml-2 lg:hidden"
              >
                {{ gitHubRepoStars }}
              </div>
            </Transition>
          </a>
        </div>
      </div>
      <div
        class="text-sm lg:text-xs text-gray-400 flex-shrink-0 whitespace-nowrap mt-1.5 lg:mt-2"
      >
        {{ project.category }}
      </div>
    </div>

    <!-- Works with -->
    <div
      v-if="project.worksWellWith || project.competesWith"
      class="mt-4 pb-6 border-b border-gray-200"
    >
      <table class="lg:block">
        <tr v-if="project.worksWellWith" class="row lg:block">
          <td
            class="lg:block pr-7 text-sm text-gray-500 flex-shrink-0 whitespace-nowrap align-top"
          >
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
                <span
                  class="text-sm font-semibold align-middle"
                  :class="{ 'mr-2': item.length > 1 }"
                  >{{ item[0] }}</span
                >
                <span
                  v-if="item[1]"
                  class="text-xs align-middle text-gray-500"
                  >{{ item[1] }}</span
                >
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="project.competesWith" class="row lg:block">
          <td
            class="lg:block pr-7 text-sm text-gray-500 flex-shrink-0 whitespace-nowrap align-top"
          >
            <span class="block pt-1 lg:pt-0 lg:pb-2">Competes with:</span>
          </td>
          <td class="lg:block">
            <div class="-m-1 flex justify-start flex-wrap">
              <div
                v-for="(item, itemKey) in project.competesWith"
                :key="itemKey"
                class="py-1 px-2.5 rounded border border-gray-500table-item m-1"
              >
                <span
                  class="text-sm font-semibold align-middle"
                  :class="{ 'mr-2': item.length > 1 }"
                  >{{ item[0] }}</span
                >
                <span
                  v-if="item[1]"
                  class="text-xs align-middle text-gray-500"
                  >{{ item[1] }}</span
                >
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Description -->
    <div
      v-if="project.description"
      class="description text-sm text-gray-600 mt-6"
      v-html="$md.render(project.description)"
    />

    <!-- YouTube -->
    <a
      v-if="project.youTubeVideoId"
      class="block aspect-w-16 aspect-h-9 relative mt-10 lg:mt-6 rounded overflow-hidden group video-block"
      target="_blank"
      :href="`https://www.youtube.com/watch?v=${project.youTubeVideoId}`"
      @click.prevent="
        $gtagEvents.externalLinkClick(
          `https://www.youtube.com/watch?v=${project.youTubeVideoId}`
        )
      "
    >
      <img
        :src="`https://img.youtube.com/vi/${project.youTubeVideoId}/hqdefault.jpg`"
        :alt="`${project.name} Intro Video`"
        class="w-100 h-100 absolute left-0 top-0 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        loading="lazy"
      />

      <svg
        viewBox="0 0 59 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-16 h-16 absolute left-0 top-0 right-0 bottom-0 m-auto"
      >
        <path
          d="M57.7646 6.276C57.4306 5.06483 56.7799 3.9683 55.8817 3.10297C54.9582 2.21103 53.8264 1.57301 52.5929 1.24912C47.9768 0.0123892 29.4828 0.0123895 29.4828 0.0123895C21.7729 -0.0767735 14.0648 0.315388 6.40216 1.18666C5.16871 1.53448 4.03894 2.18676 3.11335 3.08548C2.20389 3.97493 1.54514 5.07175 1.20102 6.2735C0.374379 10.8001 -0.0272612 15.3962 0.00151704 20C-0.027979 24.5996 0.372675 29.1943 1.20102 33.7265C1.53777 34.9232 2.19406 36.0151 3.10597 36.897C4.01789 37.779 5.15349 38.4161 6.40216 38.7533C11.0797 39.9876 29.4828 39.9876 29.4828 39.9876C37.2026 40.0769 44.9204 39.6847 52.5929 38.8133C53.8264 38.4894 54.9582 37.8514 55.8817 36.9595C56.7912 36.0775 57.4377 34.9807 57.7621 33.7864C58.6103 29.2616 59.0228 24.6636 58.9936 20.0575C59.0574 15.4318 58.6455 10.8121 57.7646 6.2735V6.276ZM23.6033 28.5547V11.4478L38.9904 20.0025L23.6033 28.5547Z"
          class="youtube-icon-bg transition-all"
        />
        <path
          d="M23.603 28.5546V11.4478L38.9901 20.0024L23.603 28.5546Z"
          fill="white"
          stroke="white"
        />
      </svg>

      <!-- <iframe
        class="hidden w-100 h-100 absolute left-0 top-0"
        :src="`https://www.youtube.com/embed/${project.youTubeVideoId}`"
        title="YouTube Video Player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
      /> -->
    </a>

    <!-- Footer -->
    <div class="flex items-center flex-wrap mt-10 lg:mt-8">
      <AppButton
        tag="a"
        :href="project.link"
        target="_blank"
        theme="black"
        @click.prevent="$gtagEvents.externalLinkClick(project.link)"
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
  computed: {
    ...mapGetters({
      categoryColors: 'getCategoryColors',
      projects: 'getProjects',
    }),
    color() {
      return this.categoryColors[this.project.category][0]
    },
    backgroundColor() {
      return pSBC(0.95, this.categoryColors[this.project.category][0])
    },
    octokit() {
      return this.$store.state.octokit
    },
  },
}
</script>

<style lang="scss" scoped>
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
      margin-top: (16/14) * 1em;
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
