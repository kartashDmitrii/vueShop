<template>
  <div>
    <nuxt-link to="/">home</nuxt-link>
    <div>
      <p>"identifier" : "userAdmin", "user"</p>
      <p>"password" : "123456", "123456"</p>
    </div>
    <form v-if="$store.getters['user/getJwt'].length === 0" @submit.prevent="logIn">
      <label>
        <input type="text" v-model="login" required>
      </label>
      <label>
        <input type="password" v-model="password" required>
      </label>
      <input type="submit">
    </form>
    <p v-else style="color: green">{{ $store.getters['user/getUser'].username}} - {{ $store.getters['user/getUserStatus']}}</p>
    <p v-if="$store.getters['user/getError'].length > 0">{{$store.getters['user/getError']}}</p>
    <div v-if="$store.getters['user/getUserStatus'] === 'Authenticated'">
      <p style="color: blue">Виден только админу</p>
      <form @submit.prevent="submitProd">
        <p>Add new Product</p>
        <label>
          <input type="text" placeholder="name" v-model="name">
        </label>
        <label>
          <input type="number" placeholder="price" v-model="price">
        </label>
        <input type="submit">
      </form>
    </div>
  </div>
</template>

<script>
    export default {
      name: "user-menu",
      data(){
        return {
          login: '',
          password: '',
          name: '',
          price: ''
        }
      },
      methods: {
        logIn(){
          this.$store.dispatch('user/logIn', {
            "identifier" : this.login,
            "password" : this.password
          });
        },
        async submitProd(){
          try {
            await this.$api.product.addNewProduct({
              params: {
                jwt: this.$store.getters['user/getJwt']
              },
              name: this.name,
              price: this.price
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      }
    }
</script>

<style scoped>

</style>
