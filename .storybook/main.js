const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  // Seems we need to specify to webpack core-js location: https://github.com/storybookjs/storybook/issues/11255
  webpackFinal: (config)=> {
    config.resolve.alias['core-js/modules'] =  path.resolve(
      __dirname,
      '..',
      'node_modules/@storybook/core/node_modules/core-js/modules'
    );
    return config;
  }
}
