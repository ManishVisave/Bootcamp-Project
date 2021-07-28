const jwt_decode = require('jwt-decode');

module.exports.details = function(req,res){
    let token = req.get("authorization");
//var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJzYW5naXRhIiwiZW1haWwiOiJzYW5naXRhQGIuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkVkxRbnlyMFBEakFGY1MvSlRiVlpvLnA2VmNhL1o1UUpaTUg2VVNkTWw0QzZhVlljeWFnWksiLCJtb2JpbGUiOiI3NzIwNTU2Nzg5Iiwid2hhdHNhcHAiOiI5ODIyMzQ1Njc4IiwibG9jYXRpb24iOiJtdW1iYWkiLCJpYXQiOjE2Mjc0MDY4NzIsImV4cCI6MTYyNzQxMTg3Mn0.-O1kD75YcvBXTAzdjDiq-yYN65oM5LSi1Irmk3Xl8Jk';

var decoded = jwt_decode(token);
console.log(decoded);

var name_p = decoded.name;
var email_p = decoded.email;
var mobile_p = decoded.mobile;
var whatsapp_p = decoded.whatsapp;
var result = [name_p,email_p,mobile_p,whatsapp_p];
res.json({
    //message:'look console',
    data:result
    
})

}