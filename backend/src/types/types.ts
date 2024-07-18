// types.ts

import { Request } from "express";
import { DecodedTokenTypes } from "./middleware/DecodedTokenTypes.js"; // Adjust path as necessary

declare module "express" {
  export interface Request {
    user?: DecodedTokenTypes; // Define your custom property 'user' with DecodedTokenTypes type
  }
}
