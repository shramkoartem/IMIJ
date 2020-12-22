const path = require('path');
 
var config = {
    module: {
        rules: [
            { 
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['react', 'es2016', ],
                plugins: ['babel-plugin-transform-class-properties']
              }
            }
        ]
    }
};


var basket = Object.assign({}, config, {
    name: "basket",
    entry: './ui/basket.js',
    output: {
        path: path.resolve(__dirname, 'app/static/js/'),
        filename: "test_basket.js"
    }
});

var uploadTable = Object.assign({}, config, {
    name: "uploadTable",
    entry: './ui/uploadItems/UploadItemsTable.js',
    output: {
        path: path.resolve(__dirname, 'app/static/js/'),
        filename: "uploadItemsTable.js"
    }
});

module.exports = [
    basket, uploadTable
];

