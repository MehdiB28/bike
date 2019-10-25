var express = require('express');
var router = express.Router();

/* Array Bike*/

var dataBike=[ 
  {name:"BIK045",url:"/images/Bike-1.jpg", price:679},
  {name:"ZOOK7",url:"/images/Bike-3.jpg", price:799},
  {name:"BX053",url:"/images/Bike-3.jpg", price:799},
  {name:"BD098",url:"/images/Bike-4.jpg", price:948},
  {name:"BDOLE",url:"/images/Bike-5.jpg", price:908},
]; 

/* GET home page. */
router.get('/', function(req, res, next) {

/* Initialisation de la session*/
  req.session.cardBike=[];

  res.render('index', {dataBike});
});

/*GET SHOP page*/

router.post("/shop", function(req,res,next){
  console.log(req.body);

  req.session.cardBike.push({
    name:req.body.bikeNameFromFront,
    url:req.body.bikeImageFromFront,
    model:req.body.bikeModelFromFront,
    price:req.body.bikePriceFromFront,
    quantity:req.body.bikeQuantityFromFront,
  })
  
  res.render('shop',{dataBike,cardBike:req.session.cardBike})
});

/*delete*/

router.post('/delete-shop', function(req, res, next) {

  console.log(req.body)

  req.session.cardBike.splice(req.body.position, 1);
  
  res.render('shop', {cardBike:req.session.cardBike});
});

/*refresh*/

router.post("/refresh-shop", function(req,res,next ){
  var position = req.body.position;
  var newQuantity = req.body.quantity;

  console.log(req.body)
  req.session.cardBike[position].quantity = newQuantity;

  res.render("shop",{dataBike,cardBike:req.session.cardBike})

});

module.exports = router;
