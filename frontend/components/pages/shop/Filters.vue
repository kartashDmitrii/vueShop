<template>
    <aside class="filters">
      <PriceFilter min-v="10" max-v="2220" min-value-v="40" max-value-v="1950"/>
    </aside>
</template>

<script>
    import PriceFilter from "./filters/PriceFilter";
    export default {
        name: "Filters",
      components: {PriceFilter} 
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
