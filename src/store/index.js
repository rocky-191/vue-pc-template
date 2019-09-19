import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import commonStore from "./common";

export default new Vuex.Store({
  modules: {
    commonStore
  }
});
