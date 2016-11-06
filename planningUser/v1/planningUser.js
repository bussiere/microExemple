




function getplanning(req,res,callback) {
    var response = new Object();
    console.log("uid",req.body.uid);
    response.status = 1;
    response.message = "";
    var planning = new Object();
    planning.date = "28/01/2016";
    response.data = planning;
    var responseJson = JSON.stringify(response);
    res.status(200).send(responseJson);


}


exports.getplanning   = getplanning;
