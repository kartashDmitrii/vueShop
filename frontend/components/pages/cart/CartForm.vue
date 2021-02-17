<template>
    <section class="cart-form" @submit.prevent="testSubmit">
      <form method="post">
        <label>
          <input type="text" name="name" placeholder="name" v-model="name">
        </label>
        <label>
          <input type="tel" name="phone" placeholder="phone" v-model="phone">
        </label>
        <label>
          <input type="email" name="email" placeholder="email" v-model="email">
        </label>
        <label>
          <input type="text" name="address" placeholder="address" v-model="address">
        </label>
        <input type="submit" value="buy">
      </form>
    </section>
</template>

<script>
    import order from "../../../api/axios/order";

    export default {
      name: "CartForm",
      mounted() {
        if(this.$store.getters['user/getUser'].username){
          this.name = this.$store.getters['user/getUser'].username;
          this.email = this.$store.getters['user/getUser'].email;
        }
      },
      data(){
        return{
          name: '',
          phone: '',
          email: '',
          address: ''
        }
      },
      methods: {
        async testSubmit(){
          try {
            let payload = {
              to: this.email,
              from: "cheloveche3@gmail.com",
              subject: "test send",
              html: this.$apiMail.testMail({
                firstName: this.name,
                prods: this.$store.getters['getAllSelectedProducts'],
                total: (this.$store.getters['getAllSelectedProducts'].reduce((total, elem) => total + (elem.price * elem.count), 0)).toFixed(2)
              })
            };
            await this.$apiAxios.email.sendTest(payload);
            let orderList = [];
            this.$store.getters['getAllSelectedProducts'].forEach( elem => {
              let obj = {};
              obj.__component = 'products.product';
              obj.name = elem.name;
              obj.count = elem.count;
              obj.price = elem.price;
              orderList.push(obj)
            });
            this.$store.dispatch('user/checkout', {
              'userName': this.name,
              'price': (this.$store.getters['getAllSelectedProducts'].reduce((total, elem) => total + (elem.price * elem.count), 0)).toFixed(2) + this.$store.getters.getCurrency.ccy,
              'phone': this.phone,
              'address': this.address,
              'orders': orderList
            })
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
</script>

<style scoped lang="scss">
.cart-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 10px;
      width: 250px;
      display: flex;
      input {
        width: 100%;
      }
    }
    p {
      margin-bottom: 10px;
    }
    input[type="submit"]{
      width: max-content;
    }
  }
}
</style>
