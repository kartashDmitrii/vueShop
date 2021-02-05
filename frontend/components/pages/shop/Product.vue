<template>
    <div class="product">
      <p class="name">{{product.name}}</p>
      <div class="count">
        <button class="plus" @click="count++">+</button>
        <p>{{ totalCount }}</p>
        <button class="minus" @click="count <= 0 ? count = 0 : count--">-</button>
      </div>
      <p class="summ"> {{(product.price * count).toFixed(2)}} <span>{{$store.getters.getCurrency.ccy}}</span></p>
      <button style="margin-left: 50px"
              v-if="$store.getters['user/getUserStatus'] === 'Authenticated'"
              @click="$store.dispatch('deleteProduct', product)">Х</button>
    </div>
</template>

<script>
    export default {
      props: ['product'],
      name: "Product",
      beforeMount() {
      },
      data (){
        return {
          count: 0
        }
      },
      computed: {
        totalCount(){
          let count = this.$store.getters.getSomeSelectedProducts(this.product.name) ? this.$store.getters.getSomeSelectedProducts(this.product.name).count : 0
          this.count = count
          return count
        }
      },
      watch: {
        totalCount: function(val){
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
