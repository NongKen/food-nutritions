module.exports = {
  entry: './src/client.jsx',
  output: {
    path: './public',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'] 
  }
}