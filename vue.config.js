module.exports = {
  indexPath: "Index.html",
  transpileDependencies: ["vuetify"],
  publicPath: "",
  productionSourceMap: false,
  devServer: {
    proxy: "http://research.cuningham.com/"
  }
};
