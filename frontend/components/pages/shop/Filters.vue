<template>
    <aside class="filters">
      <PropertyCollection v-for="(prop, i) in allProps" :property="prop" :key="i"/>
      <PriceFilter @change-values="changePriceVals" min-v="10" max-v="2220" min-value-v="40" max-value-v="1950"/>
    </aside>
</template>

<script>
    import PriceFilter from "./filters/PriceFilter";
    import PropertyCollection from "./filters/PropertyCollection";
    export default {
      name: "Filters",
      components: {PropertyCollection, PriceFilter},
      async beforeMount() {
        this.allProps = (await this.$apiAxios.properties.getAll()).data;
      },
      data(){
        return {
          allProps: ''
        }
      },
      methods: {
        changePriceVals(payload){
          console.log(payload)
        }
      }
    }
</script>

<style scoped lang="scss">
aside.filters {
  position: absolute;
  left: 15px;
  top: 270px;
  width: 10%;
}
</style>
