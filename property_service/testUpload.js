const fs = require('fs');
const AWS = require('aws-sdk');

let AWS_ACCESS_KEY_ID="AKIA2UPAXHZ3X7GX7YXR"
let AWS_SECRET_ACCESS_KEY="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"
let AWS_DEFAULT_REGION="ap-south-1"


const s3 = new AWS.S3({
    // accessKeyId: process.env.AWS_ACCESS_KEY,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // region: 'ap-south-1'
    accessKeyId:AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region:AWS_DEFAULT_REGION
});

// Create our bucket if it doesn't exist
exports.upload = async (file) => {
    console.log(file)
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