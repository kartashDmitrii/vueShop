<template>
  <div class="prop">
    <p>{{property.Name}}</p>
    <ul>
      <li>

      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      props: ['property'],
      name: "PropertyCollection",
      async beforeMount() {
        // console.log((await this.$apiAxios.product.getSomeProduct(`?property_filter=[value::val1]`)).data);
        // console.log((await this.$apiAxios.product.getSomeProduct(`?property=0`)).data);
        // console.log((await this.$apiAxios.product.getSomeProduct(`?name=apple`)).data);
        // console.log((await this.$apiAxios.product.getSomeProduct(`?property_component.properties.properties.Value=val1`)).data);
      },
      data(){
        return {
          allVals: ''
        }
      },
    }
</script>

<style scoped>

</style>
