import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import { AccessToken_Secret_Key, Refresh_Token_Secret_Key } from "../../serviceUrl";
export const GenerateAccessToken = (payload:any)=>{
    if(!payload)  {
        throw new Error("Payload not provided");
        return 
    };
    if(!AccessToken_Secret_Key)  {
        throw new Error("Access token secret key not provided")
        return 
    };

    const token = jwt.sign({payload}, AccessToken_Secret_Key,{
        expiresIn:"15m"
    })
    return token;
}

export const GenerateRefreshToken= (payload:any)=>{
    if(!payload){ 
        throw new Error("Payload not provided")
        return 
    };
    if(!Refresh_Token_Secret_Key)  {
        throw new Error("Refresh token secret key not provided")
        return 
    };

    const token = jwt.sign({payload}, Refresh_Token_Secret_Key,{
        expiresIn:"3d"
    })
    return token;
}