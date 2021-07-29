const fs = require('fs');
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
});

// Create our bucket if it doesn't exist
exports.upload = async (file) => {
    // Read content from the file
    let val = new Promise(async (resolve,reject) => {
        const fileContent = fs.readFileSync(file['path']);
        // Setting up S3 upload parameters
        const params = {
            Bucket: 'property-image-buck',
            Key: file['originalFilename'], // File name you want to save as in S3
            Body: fileContent
        };
        // Uploading files to the bucket
        await s3.upload(params,async (err,data) => {
            if(err) reject("Could Not Upload")
            else{
                // console.log("PP: "+data.Location)
                resolve(data.Location)
            }
        })
    })

    return val.then((res)=>{
        console.log("Path: "+res)
        return res;
    }).catch((err) => {
        return err;
    })

    
};