const plugins = [
  ["@babel/plugin-transform-async-to-generator"]
];
if (process.env.NODE_ENV === "production") {
  plugins.push("transform-remove-console");
}

module.exports = {
  presets: ["@vue/app"],
  plugins: plugins
};
