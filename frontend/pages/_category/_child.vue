<template>
  <div>
    <p>Category: {{$route.params.category}}</p>
    <p>Child: {{$route.params.child}}</p>
    <Product v-for="(prod, i) in currentCategory.products" :product="prod" :key="i"/>
  </div>
</template>

<script>
  import Product from "../../components/pages/shop/Product";
  export default {
    name: "child",
    components: {Product},
    async validate({app,params}){
      let data = (await app.$apiAxios.categories.getSome(`?name=${params.category}`)).data;
      return data[0].subCategories.find(elem => elem.name === params.child) !== undefined;
    },
    async beforeMount() {
      this.currentCategory = (await this.$apiAxios.categories.getSome(`?name=${this.$route.params.category}`)).data[0];
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
