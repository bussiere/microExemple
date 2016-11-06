




function getplanning(req,res,callback) {
    var response = new Object();
    response.status = 1;
    response.message = "";
    response.data = "OK";
    var responseJson = JSON.stringify(response);
    res.status(200).send(responseJson);


}


exports.getplanning   = getplanning;
