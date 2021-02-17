<template>
  <div class="admin-panel" v-if="$store.getters['user/getUserStatus'] === 'Authenticated'">
    <p style="color: blue">Виден только админу</p>
    <form @submit.prevent="submitProd">
      <p>Add new Product</p>
      <label>
        <input type="text" placeholder="name" v-model="name">
      </label>
      <label>
        <input type="number" placeholder="price" v-model="price">
      </label>
      <AllCategories @selectCategories="categories = $event"/>
      <input type="submit">
    </form>
    <p ref="admin-message" class="admin-message"></p>
  </div>
</template>

<script>
    import AllCategories from "./admin-panel/AllCategories";
    export default {
      name: "AdminPanel",
      components: {AllCategories},
      data(){
          return {
            name: '',
            price: '',
            categories: [],
          }
      },
      methods: {
        async submitProd(){
          try {
            let data = (await this.$apiAxios.product.addNewProduct({
              name: this.name,
              price: this.price,
              categories: this.categories
            },{
              headers: {
                'Authorization': 'Bearer ' + this.$store.getters['user/getJwt']
              }
            })).data;
            this.$refs['admin-message'].innerHTML = 'Продукт добавлен';
            this.$store.commit('addNewProduct', data);
            this.name = '';
            this.price = '';
          } catch (e) {
            this.$refs['admin-message'].innerHTML = `Error: ${e.message}`;
            setTimeout( () => {
              this.$refs['admin-message'].innerHTML = ``;
            }, 3000)
          }
        },
      }
    }
</script>

<style scoped>

</style>
