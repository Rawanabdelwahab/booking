import jwt from "jsonwebtoken"
export const extractToken = (req, res,next) => {
    const authorization = req.headers.authorization
    console.log(authorization)
    const replaced = authorization.replace('Bearer ', '')
    let decoded
    try {
         decoded = jwt.verify(replaced, 'shhhhh')
    }
    catch (error) {
        console.log(error)
        return res.send('Incorrect')
    }
    req.body.user = decoded;
    next()
}