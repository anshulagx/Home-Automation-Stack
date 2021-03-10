//TODO: auth

const express = require("express")

const router = express.Router()


router.get("/", (req, res) => {

  //send html webpage
  
});

router.post("/",(req, res) => {

  // {
  //   "gateway":2,
  //   "id":4,
  //   "action":"on",
  //   "extras":"adfs",
  //   "value":20
  // }


  //req.body.id 

  //


  res.status(200).send("Hello");

});





module.exports = router
