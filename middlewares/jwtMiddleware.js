const jwt = require('jsonwebtoken')

exports.jwtMiddleware = (req, res, next) => {

    console.log("__________JWT Middleware__________");

    //verify
    try {
        //access token from req "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgwNDk4YmU2ZjI5Yzk4MzhhODlmYjEiLCJpYXQiOjE3MTk4MDY4MzB9.o0GcYhJcYAAN1D4ZGOQstfnUcwZ5SnfP9bDV-EoZEE8"
        const token = req.headers['access_token'].split(" ")[1]
        // console.log(token);
        const jwtResponse = jwt.verify(token, process.env.SECRET_KEY)

        //access the payload and 
        req.payload = jwtResponse.userId

        //exit from middleware function and continue
        next()


    }
    catch {
        res.status(401).json("authenticationfailed !plase login")
    }


}
