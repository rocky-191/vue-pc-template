const plugins = [
  ["@babel/plugin-transform-async-to-generator"],
  [
    "component",
    {
      libraryName: "fw-ui",
      styleLibraryName: "theme-chalk"
    }
  ]
];
if (process.env.NODE_ENV === "production") {
  plugins.push("transform-remove-console");
}

module.exports = {
  presets: ["@vue/app"],
  plugins: plugins
};
