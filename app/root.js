Vue.config.productionTip = false

module.exports = new Vue({
  el: '#app',
  data: {
    location: window.location,
    htmlBody: document.querySelector('body'),
    currTotal: null,
    cacheNum: null,
    entries: [],
    operator: '',
    isPositive: true,
    history: [],
    numLibrary: ['0','1','2','3','4','5','6','7','8','9'],
    operatorLibrary: ['+','-','*','/'],
  },
  methods: {
    pushToEntries(input) {
      this.entries.push(input)
      this.evaluate()
    },
    evaluate() {
      var num = ''
      if (this.entries.length > 0) {
        this.entries.forEach(item => {
          num = num + item
        })
        num = Number(num)
      } else {
        num = 0
      }
      
      if (this.getValueType(this.currTotal) === 'null' || this.currTotal === 0 && !this.operator) {
        this.currTotal = num
      } else {
        this.cacheNum = num
      }

    },
    setOperator(op) {
      if (!this.operator) {
        this.clearEntries()
        this.operator = op
      } else {
        if (this.getValueType(this.currTotal) !== 'null' && this.getValueType(this.cacheNum) !== 'null') {
          this.equals()
          this.operator = op
          this.clearEntries()
        }
      }
    },
    equals() {
      switch (this.operator) {
        case '+':
          this.addition(this.currTotal, this.cacheNum)
        break
        case '-':
          this.subtraction(this.currTotal, this.cacheNum)
        break
        case '*':
          this.multiply(this.currTotal, this.cacheNum)
        break
        case '/':
          this.divition(this.currTotal, this.cacheNum)
        break
        default:
        // do nothing as no operator has been selected yet
      }
      this.clearEntries()
      this.cacheNum = null
      this.operator = ''
    },
    addition(a, b) {
      this.currTotal = a + b
    },
    subtraction(a, b) {
      this.currTotal = a - b
    },
    multiply(a, b) {
      this.currTotal = a * b
    },
    divition(a, b) {
      this.currTotal = a / b
    },
    clearEntries() {
      this.entries = ['0']
    },
    clearAll() {
      this.currTotal = 0
      this.cacheNum = null
      if (this.currTotal !== null && this.currTotal !== undefined) {
        this.entries = [this.currTotal]
      } else {
        this.entries = ['0']
      }
      this.operator = ''
    },
    togPosNeg() {
      console.log('togPosNeg', this.isPositive)
      if (this.entries[0] !== '-') {
        this.entries.unshift('-')
        this.isPositive = false
      } else if (this.entries[0] === '-') {
        this.entries.shift()
        this.isPositive = true
      }
    },


    getValueType(val) {
      return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
    },
    round(value, exp) {
      if (typeof exp === 'undefined' || +exp === 0) return Math.round(value)
      value = +value
      exp = +exp
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) return NaN;

      value = value.toString().split('e')
      value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)))

      value = value.toString().split('e')
      return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp))
    },
    getParamByName(name, url) {
      if(!url) url = location.href
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
      var regexS = "[\\?&]" + name + "=([^&#]*)"
      var regex = new RegExp(regexS)
      var results = regex.exec(url)
      return results == null ? null : decodeURIComponent(results[1])
    }
  },
  mounted: function () {
    const vm = this
    this.evaluate()
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        vm.equals()
        return
      } else if (e.key === 'Escape') {
        vm.clearAll()
        return
      }
      vm.numLibrary.forEach(num => {
        if (num === e.key) {
          vm.pushToEntries(e.key)
          return
        }
      })
      vm.operatorLibrary.forEach(op => {
        if (op === e.key) {
          vm.setOperator(e.key)
          return
        }
      })
    })
  }
})
