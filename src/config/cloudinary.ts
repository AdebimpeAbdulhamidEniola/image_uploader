import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary"

dotenv.config()

cloudinary.config(process.env.CLOUDINARY_URL as string)