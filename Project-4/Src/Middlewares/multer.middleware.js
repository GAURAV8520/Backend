import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {     //function for file path 
      cb(null, './Public/Temp')
    },
    filename: function (req, file, cb) {        //fuction to set file name 
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.originalname)

    }
  })
  
 export const upload = multer({ storage })