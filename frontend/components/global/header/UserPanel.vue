<template>
    <div class="user-panel">
      <div class="login">
        <NuxtLink to="/user-menu">
          User-Menu
        </NuxtLink>
      </div>
      <button v-if="$store.getters['user/getUser']" @click="logOut">logout</button>
    </div>
</template>

<script>
    export default {
      name: "UserPanel",
      methods: {
        logOut(){
          this.$store.commit('user/changeJwt', '');
          this.$store.commit('user/setUser', '');
          this.$store.commit('user/setUserStatus', '');
          this.$apiCookies.deleteCookie('user')
        }
      }
    }
</script>

<style scoped lang="sass">
.user-panel
  display: flex
  align-items: center
  .login
    margin-right: 15px
</style>
