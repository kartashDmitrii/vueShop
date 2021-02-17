<template>
  <select ref="currencySelect" name="currency" v-model="currency">
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="UAH">UAH</option>
  </select>
</template>

<script>
    export default {
      name: "CurrencySelect",
      mounted() {
        if (this.$apiCookies.getCookie('currency') !== undefined){
          this.currency = this.$apiCookies.getCookie('currency');
          this.$store.dispatch('getPrivatCurrency', this.$apiCookies.getCookie('currency'));
        } else {
          this.currency = this.$store.getters.getCurrency.ccy;
        }
        this.$refs['currencySelect'].querySelectorAll('option').forEach(elem => {
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

<style scoped>

</style>
