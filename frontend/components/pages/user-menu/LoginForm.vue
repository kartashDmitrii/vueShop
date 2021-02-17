<template>
    <div class="login-form">
      <form @submit.prevent="logIn">
        <label>
          <input type="text" v-model="login" required>
        </label>
        <label>
          <input type="password" v-model="password" required>
        </label>
        <input type="submit">
      </form>
      <p v-if="$store.getters['user/getError'].length > 0">{{$store.getters['user/getError']}}</p>
    </div>
</template>

<script>
    export default {
      name: "LoginForm",
      data(){
        return {
          login: '',
          password: '',
        }
      },
      methods: {
        logIn(){
          this.$store.dispatch('user/logIn', {
            "identifier" : this.login,
            "password" : this.password
          });
        },
      }
    }
</script>

<style scoped>

</style>
