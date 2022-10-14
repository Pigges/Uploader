require('dotenv').config()
const multer = require("multer");
const path = require("path");
const auth = require('./auth')

const admin = { name: process.env.USERNAME, password: process.env.PASSWORD }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name ? req.body.name + path.extname(file.originalname) : path.basename(file.originalname))
    }
});

function encode(str) {
    try {
        const buff = Buffer.from(str, 'utf-8');
        return buff.toString('base64')
    } catch (err) {
        return false
    }
}

const upload = multer({ dest: "uploads/", storage });

module.exports = (app)=>{
    app.post('/upload', auth, upload.array("files"), (req,res)=>{
        console.log(req.files[0])
        const file = req.files[0]
        res.json({"filename": file.filename, url: `/download/${file.filename}`})
        //res.json({"message": req.files[0]?"success":"no file selected"})
    })

    app.post('/upload/login', (req,res)=>{
        if (req.body.username && req.body.password) {
            const login = { name: req.body.username, password: req.body.password }

            if (encode(JSON.stringify(login)) === encode(JSON.stringify(admin))) {
                res.cookie('auth', encode(JSON.stringify(login)))
                res.redirect('/upload')
            } else {
                res.redirect('/upload?fail=true')
            }
        } else {
            res.redirect('/upload?fail=true')
        }
    })
}