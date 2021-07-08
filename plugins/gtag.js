import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
	Vue.use(
		VueGtag,
		{
			config: { id: 'G-8TS3X7Y01N' },
			appName: 'MLOps Toys',
			pageTrackerScreenviewEnabled: true,
		},
		app.router,
	)

	Vue.use({
		install(vm) {
			vm.prototype.$gtagEvents = {
				externalLinkClick(url) {
					vm.$gtag.event('click', {
						event_category: 'outbound',
						event_label: url,
						transport_type: 'beacon',
					})
				},
			}
		},
	})
}
