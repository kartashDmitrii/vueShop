<template>
    <header>
      <CurrencySelect/>
      <ul style="flex: 1">
        <li>
          <nuxt-link to="/">home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/catalog">catalog</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/cart">cart</nuxt-link>
        </li>
      </ul>
      <UserPanel/>
    </header>
</template>

<script>
    import UserPanel from "./header/UserPanel";
    import CurrencySelect from "./header/CurrencySelect";
    export default {
      name: "Header",
      components: {CurrencySelect, UserPanel},
      data(){
        return {

        }
      },
      methods: {
      },
    }
</script>   b

<style scoped lang="scss">
header {
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &>ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    li {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}

</style>
