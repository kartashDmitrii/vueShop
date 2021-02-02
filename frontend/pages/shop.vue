<template>
    <div>
      <nuxt-link to="/">home</nuxt-link>
      <CurrentCurrency/>
      <Product v-for="(prod, i) in $store.getters.getAllProducts" :product="prod" :key="i"/>
    </div>
</template>

<script>
    import CurrentCurrency from "../components/CurrentCurrency";
    import Product from "../components/Product";
    export default {
        name: "shop",
      components: {Product, CurrentCurrency}
    }
</script>

<style scoped lang="sass">

</style>
