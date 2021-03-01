const path = require('path');

module.exports = {
    entry: './lib/index.js',
    output: {
      path: path.resolve(__dirname, 'bundle'),
      filename: 'dash-videots.js'
    },
    mode: 'production'
}