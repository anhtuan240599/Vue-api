export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '(admin)',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  proxy: {
    "/api": URL
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'http://localhost:3000/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: 'http://localhost:3000/api/auth/user', method: 'get', propertyName: 'user' },
          propertyName: "token"
        },
        logout: true
      }
    }
  }
}
