const ApiError = require("../exceptions/api-error")
const TokenService = require("../service/token-service")
const chalk = require("chalk")

module.exports = async function (req, res, next) {
    try {
        const AuthorizationHeader = req.headers.authorization
        if (!AuthorizationHeader) {
            return next (ApiError.UnauthoriezedError())
        }
        const accessToken = AuthorizationHeader.split(" ")[1] 
        if (!accessToken) {
            return next (ApiError.UnauthoriezedError())
        }
        
        const userData = await TokenService.validateAccessToken(accessToken)
        
        if (!userData) {
            return next (ApiError.UnauthoriezedError())
        }
        
        req.user = userData
        next()
    } catch (e){
        return next (ApiError.UnauthoriezedError())
    }
   
    
    
}