import { NextFunction, Request, Response } from "express"; // Importing NextFunction, Request, and Response types from Express for handling middleware functions and HTTP requests/responses
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for generating and verifying JSON Web Tokens (JWT)
import { DecodedTokenTypes } from "../types/middleware/DecodedTokenTypes.js"; // Importing DecodedTokenTypes type from "../types/middleware/DecodedTokenTypes.js" for defining the structure of decoded JWT tokens

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extracting token from request body, cookies, or headers
    const token =
      req.body?.token || // Check if token is in request body
      req.cookies.token || // Check if token is in cookies
      req.header("Authorization")?.replace("Bearer ", ""); // Check if token is in Authorization header (Bearer token)

    // Checking if token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is Missing",
      });
    }

    try {
      // Verifying and decoding the token
      const decode = jwt.verify(
        token,
        process.env.JWT_SECRET! // Decoding token using JWT_SECRET from environment variables
      ) as DecodedTokenTypes; // Casting the decoded token to DecodedTokenTypes for type safety
      //@ts-ignore
      req.user = decode; // Storing decoded user information in req.user for further middleware or route handlers
    } catch (error) {
      // Handling errors during token decoding or verification
      return res.status(401).json({
        success: false,
        messgae: "Error while decoding token",
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handling general errors during token validation
    return res.status(500).json({
      success: false,
      messgae: "Error while token validating",
    });
  }
};

export const isInstructor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.accountType != "Instructor") {
      return res.status(401).json({
        success: false,
        messgae: "This Page is protected only for Instructor",
      });
    }
    // go to next middleware
    next();
  } catch (error) {
    console.log(
      "Error while cheching user validity with Instructor accountType"
    );
    console.log(error);
    return res.status(500).json({
      success: false,
      messgae: "Error while cheching user validity with Instructor accountType",
    });
  }
};
