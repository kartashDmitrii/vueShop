<template>
  <div>
    <p>Category: {{$route.params.category}}</p>
    <p>Child: {{$route.params.child}}</p>
    <ul>
      <li v-for="(category, i) in currentCategory.subCategories" :key="i">
        <nuxt-link :to="`/${$route.params.child}/${category.name}`">{{category.name}}</nuxt-link>
      </li>
    </ul>
    <Product v-for="(prod, i) in currentCategory.products" :product="prod" :key="i"/>
  </div>
</template>

<script>
  import Product from "../../components/pages/shop/Product";
  export default {
    name: "child",
    components: {Product},
    async beforeMount() {
      let data = (await this.$apiAxios.categories.getSome(`?name=${this.$route.params.child}&mainCategory.name=${this.$route.params.category}`)).data;
      if (data.length !== 0 && data[0].mainCategory.name === this.$route.params.category){
        this.currentCategory = data[0];
        console.log(data);
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
