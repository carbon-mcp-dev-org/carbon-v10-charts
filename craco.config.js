module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fix ESM resolution for @floating-ui/react and other ESM packages
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      });
      
      // Add node polyfills fallback for webpack 5
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/')
      };
      
      return webpackConfig;
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@carbon/charts/scss$': 'identity-obj-proxy',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
      }
    }
  }
};
