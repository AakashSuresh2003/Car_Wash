const express = require("express");
const router = express.Router();
const Booking = require("../models/serviceModel");
const authMiddleware = require("../middleware/authMiddleware");
const { addService, updateService, deleteService, getAllServices } = require("../controller/addServiceController");

router.use(authMiddleware);

router.get("/",getAllServices)

router.post("/",addService);

router.put("/:id",updateService);

router.delete("/:id",deleteService);

module.exports = router;