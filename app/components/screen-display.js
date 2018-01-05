import Vue from 'vue'

module.exports.siteNav = Vue.component('screen-display', {
    template: `
    <div>
        {{test}}
    </div>`,
    data() {
        return {
            test: 'hello world'
        }
    },
    props: [],
    methods: {
        
    },
    mounted: function() {
        console.log('site-nav.js')
    }
})
