import Vue from 'vue'

Vue.config.productionTip = false

module.exports.root = new Vue({
    el: '#app',
    data: {
        location: window.location,
        htmlBody: document.querySelector('body'),
        display: '',
        currTotal: null,
        cacheNum: null,
        entries: [],
        operator: '',
        history: []
    },
    methods: {
        pushToEntries(input) {
            this.entries.push(input)
        },
        evaluate() {
            console.log('evaluate started', this.currTotal)
            var num = ''
            if (this.entries.length > 0) {
                this.entries.forEach(item => {
                    num = num + item
                })
                num = Number(num)

                if (this.getValueType(this.currTotal) === 'null') {
                    console.log('testing currTotal', num, this.currTotal)
                    this.currTotal = num
                } else {
                    console.log('testing cacheNum', num, this.cacheNum)
                    this.cacheNum = num
                }
            } else {
                num = this.cacheNum
            }
            
            this.entries = []
            return num
        },
        setOperator(opp) {
            this.operator = opp
            this.evaluate()
        },
        equals() {
            console.log('equals started')
            switch (this.operator) {
                case '+':
                    console.log('Plus found')
                    this.addition(this.currTotal, this.evaluate())
                    break
                case '-':
                    console.log('Minus found')
                    this.subtraction(this.currTotal, this.evaluate())
                    break
                case '*':
                    console.log('Times found')
                    this.multiply(this.currTotal, this.evaluate())
                    break
                case '/':
                    console.log('Divide found')
                    this.divition(this.currTotal, this.evaluate())
                    break
                default:
                    // do nothing as no operator has been selected yet
            }
        },
        addition(a, b) {
            console.log('addition started', a, b)
            this.currTotal = a + b
        },
        subtraction(a, b) {
            console.log('subtraction started', a, b)
            this.currTotal = a - b
        },
        multiply(a, b) {
            console.log('multiply started', a, b)
            this.currTotal = a * b
        },
        divition(a, b) {
            console.log('divition started', a, b)
            this.currTotal = a / b
        },
        clearAll() {
            this.currTotal = null
            this.cacheNum = null
            this.entries = []
            this.operator = ''
        },


        getValueType(val) {
            return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
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
        // this.activate()
    }
})
