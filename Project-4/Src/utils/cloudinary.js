import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_KEY_SECREATE // Click 'View Credentials' below to copy your API secret
});

