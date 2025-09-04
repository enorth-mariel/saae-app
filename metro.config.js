// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 👇 Add PDF as a supported asset extension
config.resolver.assetExts.push("pdf");

module.exports = config;
