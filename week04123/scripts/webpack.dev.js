const config = require("./webpack.config");
const path = require("path");

config.mode = "development";
config.devtool = "source-map";


module.exports = config;
