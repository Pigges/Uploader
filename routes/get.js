const fs = require('fs');
const path = require('path')
const auth = require('./auth')
const inline = require('./inline')


module.exports = (app)=>{
    app.get('/upload', auth, (req,res)=> {
        console.log(fs.readdirSync('./uploads').keys())
        res.render("upload", { inline, "files": fs.readdirSync('./uploads') })
        //res.render('index');
    })

    app.get('/upload/logout', auth, (req,res)=>{
        res.cookie('auth', '')
        res.send('success')
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