import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      userInfo: {
        id: "",
        name: "",
        age: 0,
        gender: "",
      },
    },
    getters: {},
    actions: {
      fetchState({ commit }) {
        return new Promise<void>((resolve) => {
          commit("setUser", {
            id: "001",
            name: "zxffan",
            age: 22,
            gender: "male",
          });
          resolve();
        });
      },
    },
    mutations: {
      setUser(state, data) {
        Vue.set(state, "userInfo", data);
        // state.userInfo = data;
      },
    },
  });
}
