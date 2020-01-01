const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withTypeScript = require('@zeit/next-typescript');
const withSourceMaps = require('@zeit/next-source-maps');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextBuildId = require('next-build-id');
const environmentVariables = require('./env-config');
const TerserPlugin = require('terser-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const IgnorePlugin = require('webpack').IgnorePlugin;

module.exports = withBundleAnalyzer(
  withTypeScript(
    withSourceMaps(
      withCSS(
        withSass({
          crossOrigin: 'anonymous',
          env: environmentVariables,
          useFileSystemPublicRoutes: false,
          generateBuildId: async () => {
            const fromGit = await nextBuildId({ dir: __dirname });
            return fromGit.id;
          },
          webpack: config => {
            const environment = process.env.ENVIRONMENT || 'development';

            // Filter out certain browser warning
            // Mini CSS Extract Plugin author recommends filtering this error for now: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-415345126
            config.plugins.push(
              new FilterWarningsPlugin({
                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
              })
            );

            // Preferably using date-fns but if moment then the following:
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            // https://arunoda.me/blog/ssr-and-server-only-modules To use server module for server side rendering
            config.plugins.push(new IgnorePlugin(/^\.\/locale$/));

            // Optimize the minimizer
            config.optimization = {
              ...config.optimization,
              minimize: environment !== 'development',
              minimizer: [
                new TerserPlugin({
                  parallel: true,
                }),
              ],
            };

            // Configure shortcuts for the importing of other scripts within a script
            // e.g. import AvatarPanel from '@components/AvatarPanel/AvatarPanel'
            // instead of: import AvatarPanel from '../../../../components/AvatarPanel/AvatarPanel'
            config.resolve.alias = {
              ...config.resolve.alias,
              '@core': path.resolve(__dirname, 'core'),
              '@components': path.resolve(__dirname, 'components'),
              '@constants': path.resolve(__dirname, 'constants'),
              '@definitions': path.resolve(__dirname, 'definitions'),
              '@pages': path.resolve(__dirname, 'pages'),
              '@store': path.resolve(__dirname, 'store'),
              '@routes': path.resolve(__dirname, 'routes'),
              '@utils': path.resolve(__dirname, 'utils'),
            };

            // To resolve the error of
            // Module not found: Can't resolve 'fs' in any location for Client side
            config.node = { fs: 'empty' };

            return config;
          },

          // to ask NextJS to look for the following file extensions when loading pages
          pageExtensions: ['tsx', 'ts'],
        })
      )
    )
  )
);
