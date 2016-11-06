var request = require('request');




function Data(req,res,callback) {
    var response = new Object();
    response.status = 1;
    response.message = "";
    var dataUser = new Object();
    dataUser.name = "bussiere";

    request.post({url:'http://localhost:7003/v1/planning', form: {"uid":'bussiere'}}, function(err,httpResponse,body){
        console.log(httpResponse);
        console.log(body);
        body = JSON.parse(body);
        dataUser.date = body.data.date;
        response.data = dataUser;
        var responseJson = JSON.stringify(response);
    res.status(200).send(responseJson);
    });


}


exports.Data   = Data;
