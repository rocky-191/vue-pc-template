module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "generator-star-spacing": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
