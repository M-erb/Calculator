module.exports = {
    files: {
        javascripts: { joinTo: 'app.js' },
        stylesheets: { joinTo: 'app.css' }
    },
//   files: {
//     javascripts: {
//       joinTo: {
//         'vendor.js': /^(?!app)/,
//         'app.js': /^app/
//       }
//     },
//     templates: {
//       joinTo: 'app.js'
//     }
//   },
  plugins: {
    babel: {
      presets: ['es2015']
    }
  },
  npm: {
      aliases: {
          vue: 'vue/dist/vue.js'
      }
  }
}
