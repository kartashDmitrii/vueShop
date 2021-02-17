<template>
    <div class="cart">
      <CartForm v-if="$store.getters['getAllSelectedProducts'].length > 0"/>
      <CartList v-if="$store.getters['getAllSelectedProducts'].length > 0" />
      <p style="color: red" v-else>Cart is empty</p>
    </div>
</template>

<script>
    import CartForm from "../components/pages/cart/CartForm";
    import CartList from "../components/pages/cart/CartList";
    export default {
      name: "cart",
      components: {CartList, CartForm}
    }
</script>

<style scoped>

</style>
