const path = require('path');
 
module.exports = {
    entry: './ui/basket.js',  
    output: {
        path: path.resolve(__dirname, 'app/static/js/'),
        filename: "basket.js"
    },
    module: {
        rules: [
            { 
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
            }
        ]
    }
}
