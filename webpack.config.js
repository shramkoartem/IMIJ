const path = require('path');
 
var config = {
    module: {
        rules: [
            { 
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
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
        filename: "test_uploadItemsTable.js"
    }
});

module.exports = [
    basket, uploadTable
];

