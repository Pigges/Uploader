const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name ? req.body.name + path.extname(file.originalname) : path.basename(file.originalname))
    }
});

const upload = multer({ dest: "uploads/", storage });

module.exports = (app)=>{
    app.post('/upload', upload.array("files"), (req,res)=>{
        console.log(req.files[0])
        const file = req.files[0]
        res.json({"filename": file.filename, url: `/download/${file.filename}`})
        //res.json({"message": req.files[0]?"success":"no file selected"})
    })
}