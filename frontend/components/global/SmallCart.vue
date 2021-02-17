<template>
  <div class="small-cart">
    <div class="selected-elems">
      <CartElem v-for="(elem, i) in $store.getters.getAllSelectedProducts" :elem="elem" :key="i"/>
    </div>
    <div class="summ">
      <p class="total">{{`${totalSumm} ${$store.getters['getCurrency'].ccy}`}}</p>
    </div>
  </div>
</template>

<script>
    import CartElem from "./small-cart/CartElem";
    export default {
      name: "SmallCart",
      components: {CartElem},
      computed: {
        totalSumm(){
          return (this.$store.getters['getAllSelectedProducts'].reduce((total, elem) => {
            let price = Math.round(((elem.price / this.$store.getters['getCurrency'].sale) + Number.EPSILON) * 100) / 100;
            return total + (price * elem.count)
          }, 0)).toFixed(2)
        }
      }
    }
</script>

<style scoped lang="scss">
  .small-cart {
    position: absolute;
    top: 75px;
    right: 0;
  }
</style>
