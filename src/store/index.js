import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import module1 from "./module1";

export default new Vuex.Store({
  modules: {
    module1
  }
});
