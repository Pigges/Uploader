const fs = require('fs');

module.exports = {
    style : fs.readFileSync('./assets/css/styles.css','utf8'),
    axios: fs.readFileSync('./assets/js/axios.js'),
    upload_js: fs.readFileSync('./assets/js/upload_script.js','utf8'),
};