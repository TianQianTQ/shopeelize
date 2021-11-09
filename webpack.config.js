module.exports = {
    module: {
      loaders: [
        {exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/},
      ],
    },
    resolve: {
      alias: {
        config$: './configs/app-config.js',
        react: './vendor/react-master',
      },
      extensions: ['', 'js', 'jsx'],
      modules: [
        'node_modules',
        'bower_components',
        'shared',
        '/shared/vendor/modules',
      ],
    },
  };