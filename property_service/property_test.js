 const axios = require('axios');

const config = {
  headers: { Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJuYW1lIjoibWFuaXNoaCIsImVtYWlsIjoibWFuaXNoaEBvLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JDk0TW1nOGhtTTJ6TWF3UU9IVjdPTU9VbDdZWS9MaGVHOEE2N242U25hdkxhMEdDSnhlTy5xIiwibW9iaWxlIjoiMTIzNDU2Nzg4OSIsIndoYXRzYXBwIjoiMTIzMzQ1Njc4OSIsImxvY2F0aW9uIjoicHVuZSIsImlhdCI6MTYyNzU3NDAwNiwiZXhwIjoxNjI3NjYwNDA2fQ.8dCIZQu3zh1blY_QkzIeod7vACVnjxUsSTuerEJsXGc'}
};
async function makeserach(){
  //search 
  axios.get('http://127.0.0.1:8888/search' ,{
    city:'mumbai',
    location:'dhankwadi',
    areaup :'500',
    priceup :100

  },config)
  .then(function (response) {
    //console.log(response);
    if (response.data.status == true){
      //  console.log('passed : search-test1')
    }
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('http://127.0.0.1:8888/search' ,{
    city:'kolkata',
    areaup :'500000',
    },config)
  .then(function (response) {
    //console.log(response);
    if (response.data.status == false){
        console.log('passed : search-test2')
    }
  })
  .catch(function (error) {
    console.log(error);
 });
}
async function makedelete(){
  //delete
  axios.delete('http://127.0.0.1:8888/delete/' ,config,{
    property_id:87
  })
  .then(function (response) {
    //console.log(response);
    if (response.data.status == false){
       console.log('passed : delete-test1')
    }
  })
  .catch(function (error) {
    console.log(error);
  });

}
async function makeRecommend(){
   //recommend 

   axios.get('http://127.0.0.1:8888/recommend',config)
   .then(function (response) {
     //console.log(response);
     if(response.data.status == true){
        // console.log('passed : reccomend-test1 ')
     }
     
   })
   .catch(function (error) {
     //console.log(error);
     console.log('failed : reccomend-test1 ')
   });
}
async function makePostUpdat(){
  //update property
  axios.post('http://127.0.0.1:8888/update' ,config,{
    address:'shivaji nagar',
    location:'shivaji nagar',
    city:'pune',
    pin:'411038',
    length:225,
    breadth:409,
    user_id:1,
    description:'near railway station',
    price:1500000,
    currency:'INR',
    country:'India' 
  } )
  .then(function (response) {
    //console.log(response);
    if(response.data.status == true){
      //  console.log('passed : update-test1 ')
    }
  })
  .catch(function (error) {
    console.log('FAILED : update1');
  });
}

async function makePostRequest() {

  //add property
    axios.post('http://127.0.0.1:8888/add' ,{
        address:'shivaji nagar',
        location:'shivaji nagar',
        city:'pune',
        pin:'411037',
        length:200,
        breadth:400,
        user_id:1,
        description:'near railways',
        price:10000,
        currency:'INR',
        country:'India' 
      },config)
      .then(function (response) {
       //console.log(response);
        if(response.data.status == true){
            console.log('passed : property-added-test1 ')
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      

//      

      
      


      


}
let a = async  () => await makePostRequest();
let b = async  () => await makeserach();
let c= async  () =>await makePostUpdat();
let d = async  () =>await makeRecommend();
let e = async  () =>await makedelete();

// a();
//  b();
c();
// d();
// e();