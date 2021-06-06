var fs = require('fs');

// json file with the data
// data = fs.readFileSync('chemistry.json');
data=JSON.stringify("I am VIjay");
const express = require("express");
const app = express();


  var k=fs.readFileSync('./bank_branches.csv');
  // Returns all information about the elements

  var arr=k.toString().split('\n');
  var data=[];
  var j=0;
  var l=0;
  for(i of arr){
      var temp=i.split(',');
      j=0;
      data[l]=[];
      for(str of temp){
        data[l][j]=str;
        j++;
      }
     l++;
  }
  app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 

app.get('/test', alldata);
function alldata(request, response) {
	console.log("All good")
	response.send("VIjaykanth reddy"+data[0][2]+'\n............'+data[2][2]);
}
app.get('/api/all/:limit',allre);
function allre(res,response){
    var output=data.slice(res.query.start,res.query.limit)
    //data.copyWithin(res.query.start,res.query.limit);
    console.log(output.length)
    response.send(JSON.stringify(output));
}
app.get('/api/branches/:name', branches);
//name format autocomplete?q=data&limit=value1&offset=value2
function branches(request, response) {
	console.log("All good")
   
    try{
        var limit=request.query.limit
        var offset=request.query.offset;
        var name=request.query.q;
        var output=[]
        limit=parseInt(offset)+parseInt(limit);
        for(i=0;i<data.length;i++){
            
            if(data[i][2].startsWith(name.toUpperCase())){
                if(offset<1){
                    output.push(data[i]);
                    limit--;
                }
                else{offset--;}
            }
            if(limit<1){i=data.length+200}
        }
        output.sort((a,b)=>a[0]-b[0])
	response.send(JSON.stringify(output));
    }
    catch(e){
        response.send("VIjaykanth reddy"+e);
    }
    
}


app.get('/api/:name', branches);
//name format autocomplete?q=data&limit=value1&offset=value2
function branches(request, response) {
	console.log("All good")
   
    try{
        var limit=request.query.limit
        var offset=request.query.offset;
        var name=request.query.q;
        var output=[];
        limit=parseInt(offset)+parseInt(limit);
        for(i=0;i<data.length;i++){
            for(k=0;k<6;k++){
                try{ 
                    if(data[i][k].startsWith(name.toUpperCase())){
                    if(offset<1){
                        output.push(data[i]);
                        limit--;
                        break;
                    }
                    else{offset--;}
                }}
                catch{
                    break;
                }
               
            }
            if(limit<1){i=data.length+200}

          
        }
        output.sort((a,b)=>a[0]-b[0])
	response.send(JSON.stringify(output));
    }
    catch(e){
        response.send("VIjaykanth reddy"+e);
    }
    
}

var server = app.listen(process.env.PORT || 8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})