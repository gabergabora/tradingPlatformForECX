const express = require("express");
const router = express.Router();
const auctionController = require("../controller/auctionController");

router.get("/getAuction", auctionController.getAuction);
router.post("/addAuction", auctionController.addAuction);
module.exports = router;
