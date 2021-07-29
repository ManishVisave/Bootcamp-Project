// const axios = require('axios');

// const config = {
//   headers: { Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJuYW1lIjoia3VuYWwiLCJlbWFpbCI6Imt1bmFsQHYuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkL1BRVlRRT0UyMTJRM3hKSDBtMk5HLmpFV1B2SGFwTmRlb2htbkZxWkQyd3VQei9JUGZuY1MiLCJtb2JpbGUiOiIxMjM0NTY3ODg5Iiwid2hhdHNhcHAiOiIxMjMzNDU2Nzg5IiwibG9jYXRpb24iOiJrb2xrYXRhIiwiaWF0IjoxNjI3NTU3NzE3LCJleHAiOjE2Mjc2NDQxMTd9.ah0oKs0ZRTjN3t_6FVrZ6Qv8vzFlZAxre7Iny10PTzs'}
// };


// function makePostRequest() {

//     //add property
//     axios.post('http://127.0.0.1:8888/add' ,{
//         address:'shivaji nagar',
//         location:'shivaji nagar',
//         city:'pune',
//         pin:'411037',
//         length:200,
//         breadth:400,
//         user_id:1,
//         description:'near railways',
//         price:10000,
//         currency:'INR',
//         country:'India' 
//       },config)
//       .then(function (response) {
//        //console.log(response);
//         if(response.data.status == true){
//             console.log('passed : property-added-test1 ')
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//       //update property
//       axios.post('http://127.0.0.1:8888/update' ,{
//         address:'shivaji nagar',
//         location:'shivaji nagar',
//         city:'pune',
//         pin:'411038',
//         length:225,
//         breadth:409,
//         user_id:1,
//         description:'near railway station',
//         price:1500000,
//         currency:'INR',
//         country:'India' 
//       } , config)
//       .then(function (response) {
//         //console.log(response);
//         if(response.data.status == true){
//             console.log('passed : property-update-test1 ')
//         }
//       },config)
//       .catch(function (error) {
//         console.log('FAILED : update1');
//       });

//       //recommend 

//       axios.get('http://127.0.0.1:8888/recommend',config)
//       .then(function (response) {
//         console.log(response);
//         if(response.data.status == true){
//             console.log('passed : reccomend-test1 ')
//         }
        
//       })
//       .catch(function (error) {
//         console.log(error);
//         console.log('failed : reccomend-test1 ')
//       });

//       axios.get('http://127.0.0.1:8888/recommend' ,config)
//       .then(function (response) {
//         //console.log(response);
//         if (response.data.status == false){
//             console.log('passed : reccomend-test2 ')
//         }
        
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
      
      

//       //delete
//       axios.delete('http://127.0.0.1:8888/delete' ,{
//         property_id:95
//       },config)
//       .then(function (response) {
//         //console.log(response);
//         if (response.data.status == true){
//             console.log('passed : delete-test1')
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//       axios.delete('http://127.0.0.1:8888/delete' ,{
//         property_id:9596
//       })
//       .then(function (response) {
//         //console.log(response);
//         if (response.data.status == false){
//             console.log('passed : delete-test2 ')
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });


//       //search 
//       axios.get('http://127.0.0.1:8888/search' ,{
//         city:'mumbai',
//         pincode: 411043,
//         location:'dhankwadi',
//         areaup :'500',
//         priceup :100

//       },config)
//       .then(function (response) {
//         //console.log(response);
//         if (response.data.status == true){
//             console.log('passed : search-test1')
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//       axios.get('http://127.0.0.1:8888/search' ,{
//         city:'kolkata',
//         areaup :'500000',
//         },config)
//       .then(function (response) {
//         //console.log(response);
//         if (response.data.status == false){
//             console.log('passed : search-test2')
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
   
//       // 

// }
// makePostRequest();