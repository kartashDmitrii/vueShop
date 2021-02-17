<template>
    <div class="product">
      <p class="name">{{product.name}}</p>
      <div class="count">
        <button class="plus" @click="count++">+</button>
        <p>{{count}}</p>
        <button class="minus" @click="count > 0 ? count-- : count = 0">-</button>
      </div>
      <p class="summ"> {{(CurrPrice * count).toFixed(2)}} <span>{{$store.getters.getCurrency.ccy}}</span></p>
      <button style="margin-left: 50px"
              v-if="$store.getters['user/getUserStatus'] === 'Authenticated'"
              @click="$store.dispatch('deleteProduct', product)">Х</button>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
      props: ['product'],
      name: "Product",
      beforeMount() {
        let thisElem = this.$store.getters.getSomeSelectedProducts(this.product.name);
        if(thisElem !== undefined){
          this.count = thisElem.count
        }
      },
      data (){
        return {
          count: 0
        }
      },
      computed: {
        ...mapGetters({
          selectedProducts: 'getAllSelectedProducts'
        }),
        CurrPrice(){
          return Math.round(((this.product.price / this.$store.getters['getCurrency'].sale) + Number.EPSILON) * 100) / 100;
        }
      },
      watch: {
        selectedProducts: {
          deep: true,
          handler(prods) {
            let thisElem = prods.find(elem => elem.name === this.product.name)
            if (thisElem === undefined){
              this.count = 0;
            }
          }
        },
        count: function(val){
          if (val > 0 ){
            let selectedProduct = {...this.product};
            selectedProduct.count = this.count;
            if (!this.$store.getters.getAllSelectedProducts.find(elem => elem.name === this.product.name)) {
              this.$store.commit('addToSelectedProducts', selectedProduct);
            } else {
              this.$store.commit('changeSelectedProducts', selectedProduct)
            }
          } else {
            this.$store.commit('removeFromSelectedProducts', this.product);
          }
        }
      }
    }
</script>

<style scoped lang="sass">
  .product
    margin-left: 10%
    display: flex
    align-items: center
    &>*
      margin-right: 20px
      &:last-child
        margin-right: 0
    .count
      display: flex
      align-items: center
      justify-content: center
      p
        margin: 0 10px
</style>
