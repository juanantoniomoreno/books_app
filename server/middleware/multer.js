//CONFIG MULTER TO UPLOAD IMAGES

//Libraries
const multer = require("multer");
const { v4:uuidv4 } = require('uuid');


const uploadImage = ( folder ) => {
    const storage = multer.diskStorage({

        //Destination of the image saved
        destination: `../client/./public/images/${ folder }`,

        filename: function( _req, file, cb ){

            //Get the extension of the image
            let extension = file.originalname.slice(
                file.originalname.lastIndexOf(".")
            );

            //Instance uuid to generate unique identifier
            cb( null, uuidv4() + extension );
        }
    });

    //const upload to save in storage(disk) the image/s
    const upload = multer({ storage: storage }).array("file");

    return upload;
}

module.exports = uploadImage;
