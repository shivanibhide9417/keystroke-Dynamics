var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var jsonfile       =         require('jsonfile');
var fs       =         require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',function(req,res){
  res.sendfile("mainpg.html");
});
app.get('/newcss',function(req,res){
  res.sendfile("newcss.html");
});
app.get('/first',function(req,res){
  res.sendfile("first.html");
});
//Newcss Post------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  var captchadim=req.body.captcha_dim;
  var namedim=req.body.name_dim;
  var passdim=req.body.password_dim;
  console.log("User name = "+user_name+", password is ="+password+", captcha dimensions are = "+captchadim+", password dimenstions are "+passdim+"key downup="+namedim);

 //sending data to json
var jsonObject1=new Object();
var jsonObject1 = require("/home/redhat/Desktop/data.json");
var obj = {"username":user_name," password":password,"down_up":namedim,"pass_dim1":passdim,"cap_dim1":captchadim,};
JSON.stringify(obj); 
jsonObject1=obj;
fs.appendFile("/home/redhat/Desktop/data.json", JSON.stringify(jsonObject1), "utf8", function(err) {
    if (err) throw err;
    console.log("File saved.");

});


//svm classifier-------------------------------------------------------------------------------------------------------------------------------------------
var multilabel = require('multilabelsvm');
var actionClassifier = new multilabel.Classifier({kernel:'linear'});
var jsonObject=new Object();
var jsonObject = require("/home/redhat/Desktop/data.json");
var trainSet=[];var trainset2=[];var trainset3=[];var trainset4=[];var trainset5=[];var trainset6=[];

for(var i=0;i<60;i++){
trainSet[i] = { input:jsonObject.users[i].cap_dim1,output: jsonObject.users[i].username };
trainset2[i] = { input:jsonObject.users[i].pass_dim1,output: jsonObject.users[i].username };
}
console.log(trainSet);
console.log(trainset2);

actionClassifier.trainBatch(trainSet);
actionClassifier.trainBatch(trainset2);

var json = actionClassifier.toJSON()
var newActionClassifier = new multilabel.Classifier();
var new3=new multilabel.Classifier();
console.log('----------SVM Classifier----');
//importing 
newActionClassifier.fromJSON(json);
new3.fromJSON(json);
console.log(newActionClassifier.classify(captchadim));
console.log(new3.classify(passdim));

 



console.log("~~~~~~~~~Decision Tree~~~~~~~~~~~~~~~~~~~~~~");
var jsonObject=new Object();
var jsonObject = require("/home/redhat/Desktop/data.json");
var data=[];
var result=[];
var data1=[];
var result1=[];
var dt;
var dt1;
var ml = require('machine_learning');

for(i=0;i<60;i++){
data[i] =[jsonObject.users[i].cap_dim1];
result[i]=jsonObject.users[i].username;

data1[i] =[jsonObject.users[i].pass_dim1];
result1[i]=jsonObject.users[i].username;
}
//console.log(data,result);
dt = new ml.DecisionTree({
    data : data,
    result : result
    
});

dt1 = new ml.DecisionTree({
    data : data1,
    result : result1
    
});
console.log("building");
dt.build();
dt1.build();


console.log("done");
console.log("Classify : ", dt.classify([captchadim]));
console.log("Classify : ", dt1.classify([passdim]));

});
//First post-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/login1',function(req,res){
  var user_name=req.body.user;
  var password1=req.body.password1;
  var password2=req.body.password2;
  var password3=req.body.password3;
  var captcha1=req.body.captcha_dim1;
  var captcha2=req.body.captcha_dim2;
  var captcha3=req.body.captcha_dim3;
  var down_up=req.body.down_up1;
  var passdim1=req.body.pass_dim1;
  var passdim2=req.body.pass_dim2;
  var passdim3=req.body.pass_dim3;
  console.log("User name = "+user_name+", \n password1 is ="+password1+ ", \n password2 is ="+password2+", \n password3 is ="+password3+", \n captchadim1 =" +captcha1+", \n captchadim2 is ="+captcha2+", \n captchadim3 is ="+captcha3+", \n passdim1 = "+passdim1+", \n passdim2= "+passdim2+ ", \n passdim3 ="+passdim3+"down_up:"+down_up);

 //sending data to json

var jsonObject1=new Object();
var jsonObject1 = require("/home/redhat/Desktop/data.json");
var obj = {username:user_name, password:password1, pass_dim3:passdim1, pass_dim2:passdim2, pass_dim1:passdim3, cap_dim3:captcha1, cap_dim2:captcha2, cap_dim1:captcha3,down_up:down_up};
JSON.stringify(obj); 
jsonObject1=obj;

fs.appendFile("/home/redhat/Desktop/data.json", JSON.stringify(jsonObject1), "utf8", function(err) {
    if (err) throw err;
    console.log("File saved.");

});
  console.log('Done!!!!');
  res.end("yes");
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
});

