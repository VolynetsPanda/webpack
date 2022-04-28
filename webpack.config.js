const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        myAppName: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: production ? '[name].[contenthash].js' : '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: [
                    production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: !production
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !production
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/, // for fonts and images
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".scss"],
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            helpers: path.resolve(__dirname, 'src/helpers'),
            translate: path.resolve(__dirname, 'src/translate'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack App",
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: production ? '[name].[contenthash].css' : '[name].css',
        }),
    ],
    devServer: {
        port: 3001,
        hot: true
    },
    mode: production ? "production" : "development"
}
