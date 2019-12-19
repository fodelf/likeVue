const path = require ('path');
module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    // 指定特定的ts编译配置，为了区分脚本的ts配置
                    configFile: path.resolve(__dirname, './tsconfig.json'),
                },
            },
        ],
        exclude: /node_modules/,
    },
    ],
  },
  entry: './index.ts',
  output: {
    filename: 'like-vue.js',
    path: path.resolve (__dirname, 'dist'),
    libraryTarget: "umd",
    library: ['likeVue'],
  }
};