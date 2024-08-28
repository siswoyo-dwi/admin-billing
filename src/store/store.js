import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import ip from '/ipBackend.js'

const store = createStore({
  state () {
    return {
      theme: {},
      login: {},
      token: null,
    }
  },
  mutations: {
    set_store(state, val){
      state[val.name] = val.value
    },
    set_theme(state, val){
      state.theme = val
    },
    login(state, val) {
      state.login = val.data
      state.token = val.token
      state.is_login = 1
      state.role = val.data.role
console.log( val.data.role);

    },
    logout(state) {
      state.login = {}
      state.token = null
      state.is_login = 0
      state.role = null
    },
  },
  plugins: [
    createPersistedState({
      key: "ppid",
      // paths: ['state'],
    }),
  ],
})

store.commit("set_store", { name:'ipBackend', value: ip})
import json from '../../static.json'

for (const key in json) {
  if (Object.hasOwnProperty.call(json, key)) {
    const item = json[key];
    store.commit("set_store", {
      name: key,
      value: item,
    })
  }
}

export default store