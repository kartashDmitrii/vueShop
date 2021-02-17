<template>
    <section class="cart-list">
      <CartElem v-for="(product, i) in $store.getters['getAllSelectedProducts']" :elem="product" :key="i"/>
    </section>
</template>

<script>
    export default {
        name: "CartList"
    }
</script>

<style scoped>

</style>
