module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "",
  productionSourceMap: false,
  devServer: {
    proxy: "http://research.cuningham.com/"
  }
};
