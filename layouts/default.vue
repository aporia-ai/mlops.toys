<template>
  <Nuxt />
</template>

<script>
import { mapMutations } from 'vuex'
import yaml from 'js-yaml'

// Octokit
import { Octokit } from '@octokit/rest'

import projects from '~/store/data/projects.yaml'

export default {
  mounted() {
    try {
      const projectsJSON = yaml.load(projects)
      this.setProjects(projectsJSON)
    } catch (e) {
      console.error(e)
    }

    this.octoAuth()
  },
  methods: {
    ...mapMutations({
      setProjects: 'setProjects',
      setOctokit: 'setOctokit',
    }),
    octoAuth() {
      this.setOctokit(new Octokit())
    },
  },
}
</script>
