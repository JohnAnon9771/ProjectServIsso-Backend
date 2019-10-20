const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb) =>{
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)

                const filename = `${hash.toString('hex')}-${file.originalname}`

                cb(null, filename)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]
        if (allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }
        else {
            cb(new Error('Invalid file type.'))
        }
    }
}