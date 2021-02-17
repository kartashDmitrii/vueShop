<template>
  <div class="сatalog">
    <Filters/>
    <ul>
      <li v-for="(category, i) in childCategory" :key="i">
        <nuxt-link :to="`/${category.name}`">{{category.name}}</nuxt-link>
      </li>
    </ul>
    <Product v-for="(prod, i) in $store.getters['getAllProducts']" :product="prod" :key="i"/>
    <p style="margin-left: 10%;">{{ $store.getters['user/getUser'].username}}</p>
  </div>
</template>

<script>
    import Filters from "../components/pages/shop/Filters";
    import Product from "../components/pages/shop/Product";
    export default {
      name: "catalog",
      components: {Product, Filters},
      async beforeMount() {
        this.childCategory = ((await this.$apiAxios.categories.getAll()).data).filter( elem => elem.mainCategory === null)
      },
      data () {
        return {
          childCategory: []
        }
      }
    }
</script>

<style scoped lang="scss">

</style>
