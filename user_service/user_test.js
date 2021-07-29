const axios = require('axios');


function makePostRequest() {
    
    axios.post('http://127.0.0.1:8081/api/authenticate' ,{
        email: 'kunal@b.com',
        password:'kunal'
      })
      .then(function (response) {
        //console.log(response);
        if(response.data.status == 200){
            console.log('passed : auth-test1 ')
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.post('http://127.0.0.1:8081/api/authenticate' ,{
        email: 'kunal@b.com',
        password:'kual'
      })
      .then(function (response) {
        //console.log(response);
        if(response.data.status == false){
            console.log('passed : auth-test2 ')
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.post('http://127.0.0.1:8081/api/register' ,{
        
            name : 'kunal',
            email: 'kunal@b.com',
            password:'kunal',
            mobile : '1234567889',
            whatsapp:'1233456789',
            location:'nashik',   
        
      })
      .then(function (response) {
        //console.log(response);
        if(response.data.status == true){
            console.log('passed : sign-test1')
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.post('http://127.0.0.1:8081/api/delete' ,{
        
           
            email: 'kunal@b.com',
            password:'kunal',
              
        
      })
      .then(function (response) {
        //console.log(response);
        if(response.data.status == true){
            console.log('passed : delete-test1 ')
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log('failed: delete-test1 ')
      });

      axios.post('http://127.0.0.1:8081/api/delete' ,{
        
           
            email: 'kunal@b.com',
            password:'kunal',
              
        
      })
      .then(function (response) {
        //console.log(response);
        if(response.data.status == true){
            console.log('passed : change_password-test1 ')
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log('failed: change-password-test1 ')
      });

      


}

makePostRequest();