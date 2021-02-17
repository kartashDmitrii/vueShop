<template>
  <div>

    <div>
      <p>"identifier" : "userAdmin", "user"</p>
      <p>"password" : "123456", "123456"</p>
    </div>
    <LoginForm v-if="$store.getters['user/getJwt'].length === 0"/>
    <p v-else style="color: green">{{ $store.getters['user/getUser'].username}} - {{ $store.getters['user/getUserStatus']}}</p>
    <AdminPanel/>
  </div>
</template>

<script>
    import LoginForm from "../components/pages/user-menu/LoginForm";
    import AdminPanel from "../components/pages/user-menu/AdminPanel";
    export default {
      name: "user-menu",
      components: {AdminPanel, LoginForm},
      data(){
        return {
        }
      },
      methods: {
      }
    }
</script>

<style scoped>

</style>
