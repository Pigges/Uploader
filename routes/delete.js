const fs = require("fs")

module.exports = (app)=>{
    app.delete('/upload', (req,res)=>{
        let message = ""
        if (req.body.file) {
            fs.readdirSync('./uploads').forEach(file => {
                if (file === req.body.file) {
                    fs.unlink("./uploads/"+req.body.file, (e) => {
                        message = "success"
                    })
                }
            })
            message = "invalid filename"
        } else {
            message = "no filename"
        }

        res.json({message})
    })
}