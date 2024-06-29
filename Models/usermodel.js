const mongoos = require('mongoose')

const userSchema = new mongoos.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    },
    license: {
        type: String,
        unique: true
    }

})

const users=mongoos.model("users",userSchema)