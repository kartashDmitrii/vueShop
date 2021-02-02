<template>
  <div>
    <select ref="currencySelect" name="currency" v-model="currency">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="UAH">UAH</option>
    </select>
    <Nuxt/>
    <div class="selected-elems">
      <div class="elem" v-for="(elem, i) in $store.getters.getAllSelectedProducts" :key="i">{{elem.name}}: {{(elem.count * elem.price).toFixed(2)}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.currency = this.$store.getters.getCurrency.ccy;
      this.$refs['currencySelect'].querySelectorAll('option').forEach( elem => {
        if (elem.value === this.$store.getters.getCurrency.ccy) elem.selected = true
      });
    },
    data(){
      return {
        currency: ''
      }
    },
    watch: {
      currency: function (val) {
        this.$store.dispatch('getPrivatCurrency', val);
      }
    }
  }
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.selected-elems {
  margin-top: 15px;
}
.elem {
  border-top: 1px solid red;
  width: max-content;
}
</style>
