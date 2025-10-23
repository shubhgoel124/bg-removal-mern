import jwt from 'jsonwebtoken'

// Middleware Function to decode jwt token to get clerkId
// add customize session token in clerk dashboard // {"clerkId": "{{user.id}}"}
const authUser = async (req, res, next) => {

    try {

        // getting token from headers
        const { token } = req.headers;

        // checking token availability
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }

        // decoding JWT token
        const token_decode = jwt.decode(token)

        // getting clerkId from decoded token
        req.body.clerkId = token_decode.clerkId
        next()

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}

export default authUser