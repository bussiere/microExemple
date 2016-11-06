




function testLogin(req,res,callback) {
    var response = new Object();
    console.log("name",req.body.name);
    response.status = 1;
    response.message = "";
    response.data = "OK";
    var responseJson = JSON.stringify(response);



    res.status(200).send(responseJson);


}


exports.testLogin   = testLogin;
