const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable CSS support for web platform
config.transformer = {
  ...config.transformer,
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
};

// Ensure proper file resolution
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
  assetExts: ['ttf', 'woff', 'woff2', 'eot', 'svg', 'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov', 'webp'],
};

// Enable CSS support
if (process.env.EXPO_PUBLIC_PLATFORM === 'web') {
  config.transformer.enableCssModules = true;
}

module.exports = config;