import webpack from 'webpack';


const config: webpack.Configuration = {
  entry: ['./examples/main.js'],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './examples'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    libraryTarget: 'umd',
  },
  externals: {
    react: 'commonjs2 react',
    'react-dom': 'commonjs2 react-dom',
    phaser: 'commonjs2 phaser'
  }
};

export default config;
