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
    import axios from "axios";
    export default {
      name: "category",
      components: {Filters, Product},
      async beforeRouteEnter(to, from,next){
        let data = (await axios.categories.getSome(`?name=${params.category}`)).data;
        console.log(data);
        next( vm => {
          vm.currentCategory = data;
          console.log(vm.currentCategory)
        })
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
