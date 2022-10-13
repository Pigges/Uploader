const fs = require('fs');
const path = require('path')

const inline = {
    style : fs.readFileSync('./assets/css/styles.css','utf8'),
    axios: fs.readFileSync('./assets/js/axios.js'),
    upload_js: fs.readFileSync('./assets/js/upload_script.js','utf8'),
};

module.exports = (app)=>{
    app.get('/upload', (req,res)=> {
        console.log(fs.readdirSync('./uploads').keys())
        res.render("upload", { inline, "files": fs.readdirSync('./uploads') })
        //res.render('index');
    })

    app.get('/download', (req,res)=> {
        res.render('download', { inline, "files": fs.readdirSync('./uploads') })
    })

    app.get('/download/:file', (req,res)=> {
        if (fs.existsSync("./uploads/"+req.params.file)) {
            res.sendFile(path.resolve("./uploads/"+req.params.file))
        } else {
            res.render('not_found', {inline, file: req.params.file})
        }
    })

    app.get('/*', (req, res)=> {
        res.status(404);
        res.redirect('/download')
    })
}