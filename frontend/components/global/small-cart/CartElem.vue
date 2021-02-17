<template>
  <div class="elem">
    {{elem.name}} - {{elem.count}} : {{(elem.count * currPrice).toFixed(2)}}
    <button @click="$store.commit('removeFromSelectedProducts', elem)">X</button>
  </div>
</template>

<script>
    export default {
      props: ['elem'],
      name: "CartElem",
      computed: {
        currPrice(){
          return Math.round(((this.elem.price / this.$store.getters['getCurrency'].sale) + Number.EPSILON) * 100) / 100;
        }
      }
    }
</script>

<style scoped>

</style>
