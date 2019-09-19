/* eslint-disable no-undef */
const routes_menu = require("../../router/routes");

const menuMixins = {
  data() {
    return {
      menuLevel: routes_menu
    };
  }
};

export default menuMixins;
