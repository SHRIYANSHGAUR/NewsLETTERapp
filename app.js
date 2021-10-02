const express= require("express");
const bodyPARSER=require("body-parser");
const request=require("request");
const https= require("https");
const app= express();


app.use(express.static("public")); ///static fles like css and images arre kept in separate folder

// css and images in seoarate files as public is akeyword type not just a file name

app.use(bodyPARSER.urlencoded({extended: true}));
///////required  statement to tell we want to use body parser



app.get("/", function(req,res){

res.sendFile( __dirname + "/signup.html");

});

 app.post( "/", function(req,res){

const eml= req.body.Email;
const f= req.body.fname;
const l = req.body.lname;

//

  const data= {

    members: [
{
          email_address: eml,
          status: "subscribed",

// looking up in mailchimps docs
          merge_fields:{FNAME: f,   LNAME: l }

}
            ]
           };
 // this creats a java script object but mailchimps asks for JSON FILE

 const  jsondata=  JSON.stringify(data);

  ///     https.request(url,options, function(response){});

const u= "https://us5.api.mailchimp.com/3.0/lists/354b12e3e3";

 const option={

     method: "POST",
     auth:"Shriyansh123:7841964fd8629ec3a18b7116335e1808-us5"

 }// auth : "string: apikey"
////     the below code is standard for posting on  any external site
/// as a response whenever we get a requst

  const  request= https.request(u,option, function(response){


if(response.statusCode==200)
{
  res.sendFile(__dirname + "/sucess.html");
}
else{

  res.sendFile(__dirname + "/failure.html");
}




    response.on("data",  function(data){
      console.log(JSON.parse(data))
    })

   });
// we write the  below data to mailchimp server...,,,,,,,,,,,,
         request.write(jsondata);
         request.end();



 });

app.post("/failure", function(req,res){

  res.redirect("/");
});



//

//  us5 == <dc>


///api
//  7841964fd8629ec3a18b7116335e1808-us5

///list id   354b12e3e3

// heroku needs a Procfile  >>>>follow   name  strictly with no extentions
///   to change or update soething in real server
//  make some chnage here and write   this in hyper terminal


//  git add .                 //notice the  . space between

//  git commit -m "2nd version"
//  git push heroku master


////not a locla port3000 but a virtual port
app.listen((process.env.PORT ||3000 ),function(){
console.log("server is setup at port 3000")
});
