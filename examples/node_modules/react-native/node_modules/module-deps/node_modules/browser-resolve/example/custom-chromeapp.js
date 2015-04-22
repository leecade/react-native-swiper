var resolve = require('../');
var parent = { filename: __dirname + '/custom/file.js', browser: 'chromeapp' };
resolve('./main.js', parent, function(err, path) {
    console.log(path);
});
