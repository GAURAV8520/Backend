import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_KEY_SECREATE // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary =async (localfilePaht)=>{
    try{
        if(!localfilePaht) return null;

        const response = await cloudinary.uploader.upload(localfilePaht,{
            resource_type:"auto"
        })

        console.log("file has been uploaded on cloudinary",response.url);

        return response;
    }
    catch(error){
        fs.unlink(localfilePaht)
        return null;
        
    }
}

export {uploadOnCloudinary}