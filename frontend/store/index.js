export const state = () => ({
  currency: {
    ccy: 'UAH',
    sale: '1'
  },
  products: [
    // {
    //   name: 'Prod1',
    //   UAHPrice: 50,
    //   price: 50,
    // },
  ],
  selectedProducts: [],
});

export const getters = {
  getCurrency: (state) => {
    return state.currency
  },
  getAllProducts: (state) => {
    return state.products
  },
  getAllSelectedProducts: (state) => {
    return state.selectedProducts
  },
  getSomeSelectedProducts: state => name => {
    return state.selectedProducts.find(prod => prod.name === name)
  },
  getUserStatus: (state) => {
    return state.userStatus
  }
};

export const mutations = {
  changeCurrency(state, newCurrency){
    state.currency.ccy = newCurrency.ccy;
    state.currency.sale = newCurrency.sale;
    state.products.forEach( elem => {
      elem.price = Math.round(((elem.UAHPrice / newCurrency.sale) + Number.EPSILON) * 100) / 100;
    });
    if (state.selectedProducts.length > 0){
      state.selectedProducts.forEach( elem => {
        elem.price = Math.round(((elem.UAHPrice / newCurrency.sale) + Number.EPSILON) * 100) / 100;
      });
    }
  },
  addNewProducts(state, arr){
    state.products = [...arr]
  },
  changeSelectedProducts(state, elem){
    let elemIndex = state.selectedProducts.findIndex(item => item.name === elem.name);
    state.selectedProducts.splice(elemIndex, 1, elem)
  },
  addToSelectedProducts(state, elem){
    state.selectedProducts.push(elem)
  },
  removeFromSelectedProducts(state, elem){
    let elemIndex = state.selectedProducts.findIndex(item => item.name === elem.name);
    state.selectedProducts.splice(elemIndex, 1)
  },
};

export const actions = {
  getPrivatCurrency({commit, state}, newCurrency) {
    let newCurrencyValue;
    if (newCurrency !== 'UAH') {
      fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.forEach(curr => {
            if (curr.ccy === newCurrency) {
              newCurrencyValue = {
                ccy: newCurrency,
                sale: curr.sale
              };
              commit('changeCurrency', newCurrencyValue)
            }
          })
        });
    } else {
      newCurrencyValue = {
        ccy: 'UAH',
        sale: '1'
      };
      commit('changeCurrency', newCurrencyValue)
    }
  }
};
