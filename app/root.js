import Vue from 'vue'

Vue.config.productionTip = false

module.exports.root = new Vue({
    el: '#app',
    data: {
        location: window.location,
        htmlBody: document.querySelector('body'),
        display: '',
        entries: [],
        history: []
    },
    methods: {
        addToEntries(input) {
            this.entries.push(input)
        },
        evaluate() {
            var nums = []
            this.entries.forEach(item => {
                
            })
            // TODO: figure out how to evaluate this
        },





        round(value, exp) {
            if (typeof exp === 'undefined' || +exp === 0)
                return Math.round(value);
            value = +value;
            exp = +exp;
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
                return NaN;
            // Shift
            value = value.toString().split('e');
            value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
            // Shift back
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
        },
        getParamByName(name, url) {
            if(!url) url = location.href
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
            var regexS = "[\\?&]" + name + "=([^&#]*)"
            var regex = new RegExp(regexS)
            var results = regex.exec(url)
            return results == null ? null : decodeURIComponent(results[1])
        },
        activate() {
            console.log('root.js')
        }
    },
    mounted: function () {
        this.activate()
    }
})
