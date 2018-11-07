module.exports = Vue.component('screenDisplay', {
    template: //html 
    `
      <div class="calc-display">
        <div>{{ currTotal }} {{ operator }} {{ cacheNum }}</div>
      </div>
    `,
    data() {
      return {
        screen: 0
      }
    },
    props: {
      operator: {
        type: String,
        default: ''
      },
      currTotal: {
        type: Number,
        default: 0
      },
      cacheNum: {
        type: Number,
        default: 0
      }
    },
})
