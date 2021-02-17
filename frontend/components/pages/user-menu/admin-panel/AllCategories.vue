<template>
    <div class="all-categories">
      <label v-for="(category, i) in allCategories" :key="i">
        <input type="checkbox" :value="category.id" v-model="selectedCategories">{{category.name}}
      </label>
    </div>
</template>

<script>
    export default {
      async beforeMount() {
        this.allCategories = (await this.$apiAxios.categories.getAll()).data
      },
      name: "AllCategories",
      data(){
        return {
          allCategories: '',
          selectedCategories: []
        }
      },
      watch: {
        selectedCategories(val){
          this.$emit('selectCategories', val)
        }
      }
    }
</script>

<style scoped>

</style>
