import './index.html'
import './scss/styles.scss'

// -------------------
// Vue set up and extra stuff
// -------------------
switch (process.env.NODE_ENV) {
  case 'production':
    window.Vue = require('vue/dist/vue.min.js')
    break;
  case 'development':
    window.Vue = require('vue/dist/vue')
    break;
  default:
    window.Vue = require('vue/dist/vue.min.js')
    break;
}

// Components
require('./components/screen-display')

// root of app
require('./root')
