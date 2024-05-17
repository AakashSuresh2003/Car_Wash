const Service = require("../models/serviceModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllServices = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const service = await Service.find();
    if (!service) throw new Error("Error fetching blogs");
    res.status(200).json(service);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error" + err);
  }
};

const addService = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin")
      throw new Error("You are not authorised to add service");

    const { place, services, price } = req.body;

    if (!Array.isArray(services) || services.length === 0) {
      throw new Error("Services array should not be empty");
    }

    const service = new Service({
      place,
      services,
      price,
    });

    if(!service) throw new Error("No service is passed here")

    await service.save();

    res.status(200).json({ Message: "Service added successfully", service });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error" + err);
  }
};

const updateService = async (req, res) => {
  try {
    const user = req.user;
    if(!user) throw new Error("Middleware is not passed here")
    if (user.role !== "admin")
      throw new Error("You are not authorised to update services");

    const { place, services, price } = req.body;
    const id = req.params.id;
    if(!id) throw new Error("Params is not passed here")
    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        place,
        services,
        price,
      },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" + err });
  }
};

const deleteService = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin")
      throw new Error("You are not authorised to delete services");

    const id = req.params.id;

    const serviceToDelete = await Service.findById(id);
    if (!serviceToDelete) {
      throw new Error("Service not found or unauthorized to delete");
    }

    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      throw new Error("No service found to delete");
    }

    res.status(200).json(deletedService);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error: " + err });
  }
};

module.exports = { addService, updateService, deleteService, getAllServices };
