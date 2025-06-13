module.exports = {
    entry: './src/index.js',
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: require('path').resolve(__dirname, 'node_modules/leader-line/'),
          use: [{
            loader: 'skeleton-loader',
            options: {procedure: content => `${content}export default LeaderLine`}
          }]
        }
      ]
    }
  };