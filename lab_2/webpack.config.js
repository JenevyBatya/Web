const path = require('path');

module.exports = {
    entry: './src/main/webapp/src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/main/webapp/dist')
    }
};