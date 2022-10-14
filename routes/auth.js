require('dotenv').config()
const inline = require('./inline')

const admin = { name: process.env.USERNAME, password: process.env.PASSWORD }

function encode(str) {
    try {
        const buff = Buffer.from(str, 'utf-8');
        return buff.toString('base64')
    } catch (err) {
        return false
    }
}

module.exports = (req,res,next)=>{
    if (!req.cookies.auth || req.cookies.auth !== encode(JSON.stringify(admin))) {
        res.render('login', {inline, params: req.query})
    } else {
        next()
    }
}
