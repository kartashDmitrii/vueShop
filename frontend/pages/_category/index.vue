<template>
    <div>
      <Filters/>
      <ul>
        <li v-for="(category, i) in currentCategory.subCategories" :key="i">
          <nuxt-link :to="`${$route.params.category}/${category.name}`">{{category.name}}</nuxt-link>
        </li>
      </ul>
      <Product v-for="(prod, i) in currentCategory.products" :product="prod" :key="i"/>
      <p style="margin-left: 10%;">{{ $store.getters['user/getUser'].username}}</p>
    </div>
</template>

<script>
    import Product from "../../components/pages/shop/Product";
    import Filters from "../../components/pages/shop/Filters";
    export default {
      name: "category",
      components: {Filters, Product},
      async mounted() {
          let data = (await this.$apiAxios.categories.getSome(`?name=${this.$route.params.category}`)).data;
          if (data.length !== 0){
            this.currentCategory = data[0]
          } else {
            this.$nuxt.error({statusCode: 404, message: 'wrongCategoryName'})
          }
      },
      data () {
        return {
          currentCategory: ''
        }
      }
    }
</script>

<style scoped lang="sass">

</style>
