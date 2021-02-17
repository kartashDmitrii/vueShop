<template>
  <div id="app">
    <Header/>
    <Nuxt/>
    <SmallCart v-show="currRoute !== 'cart'"/>
  </div>
</template>

<script>
  import Header from "../components/global/Header";
  import SmallCart from "../components/global/SmallCart";
  export default {
    components: {SmallCart, Header},
    async beforeMount(){
      try {
        const data = (await this.$apiAxios.product.getAllProducts()).data
        data.forEach( elem => {
          elem.UAHPrice = elem.price
        });
        this.$store.commit('addNewProducts', data);
      } catch (e) {
        console.log(e.response.data)
      }

      if(this.$apiCookies.getCookie('user') !== undefined){
        let data = JSON.parse(this.$apiCookies.getCookie('user'));

        this.$store.commit('user/changeJwt', data.jwt);
        this.$store.commit('user/setUser', data.user);
        this.$store.commit('user/setUserStatus', data.user.role.name);
      }
    },
    data(){
      return {
        currRoute: '',
      }
    },
    methods: {
    },
    watch: {
      $route(to, from){
        this.currRoute = to.name
      }
    }
  }
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  padding: 0 15px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.selected-elems {
  margin-top: 15px;
}
.elem {
  border-top: 1px solid red;
  width: max-content;
}

</style>
