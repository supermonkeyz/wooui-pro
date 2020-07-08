const webpack = require('webpack');
const path = require('path');
const config = require('./lib.config');
const packageJson = require('./package.json');
function resolve(dir) {
  return path.join(__dirname, './', dir);
}

const banner = `/*!
  * ${packageJson.name} v${packageJson.version} ${packageJson.versionName}
  * (c) ${new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, '/')} Jop@Weibo
  * Released under the MIT License.
*/`;

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      css: {
        localIdentName:
          config.namespace +
          config.separator +
          '[name]' +
          config.separator +
          '[local]',
        camelCase: 'only'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'postcss',
      patterns: [path.resolve(__dirname, 'components/_style/global.css')]
    }
  },
  chainWebpack: config => {
    config
      .plugin('Banner')
      .use(webpack.BannerPlugin, [
        { banner: banner, raw: true, entryOnly: true }
      ]);
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env']['PACKAGE_VERSION'] = JSON.stringify(
        packageJson.version
      );
      definitions[0]['process.env']['PACKAGE_NAME'] = JSON.stringify(
        packageJson.versionName
      );
      return definitions;
    });
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();
    svgRule.exclude
      .add([resolve('components/icon'), resolve('components/like')])
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugin: [
            {
              removeHiddenElems: false
            }
          ]
        }
      });
    config.module
      .rule('icon')
      .test(/\.svg$/)
      .include.add([resolve('components/icon'), resolve('components/like')])
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');
  }
};
