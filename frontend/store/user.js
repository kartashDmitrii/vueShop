
export const state = () => ({
    userStatus: '',
    jwt: '',
    user: '',
    error: ''
});

export const getters = {
    getJwt(state) {
      return state.jwt
    },
    getUser(state) {
      return state.user
    },
    getUserStatus(state) {
      return state.userStatus
    },
    getError(state) {
      return state.error
    }
};

export const mutations = {
  changeJwt(state, newVal){
    state.jwt = newVal
  },
  setUser(state, user){
    state.user = user
  },
  setUserStatus(state, status){
    state.userStatus = status
  },
  setError(state,error){
    state.error = error
  }
};

export const actions = {
  async logIn({commit}, payload){
    try {
      const data = (await this.$apiAxios.auth.signUp(payload)).data;
      this.$apiCookies.setCookie('user', JSON.stringify(data));
      commit('changeJwt', data.jwt);
      commit('setUser', data.user);
      commit('setUserStatus', data.user.role.name);
    } catch (e) {
      commit('setError', 'wrong Login or Password');
      setTimeout(()=> {
        commit('setError', '');
      }, 2500)
    }
  },
  async checkout({commit}, payload){
    try {
      const data = (await this.$apiAxios.order.checkout(payload)).data;
    } catch (e) {
      console.log('error')
    }
  }
};
