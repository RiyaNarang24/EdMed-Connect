const Hospital = require("../models/Hospital");

// GET ALL HOSPITALS
const getHospitals = async (req, res) => {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 8;

        const keyword =
            req.query.search
                ? {
                    hospitalName: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                }
                : {};

        const state =
            req.query.state
                ? { state: req.query.state }
                : {};

        const city =
            req.query.city
                ? { city: req.query.city }
                : {};

        const filter = {
            ...keyword,
            ...state,
            ...city,
        };

        const total =
            await Hospital.countDocuments(filter);

        const hospitals =
            await Hospital.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({
                    createdAt: -1,
                });

        res.status(200).json({

            success: true,

            total,

            page,

            pages:
                Math.ceil(total / limit),

            data: hospitals,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// CREATE HOSPITAL
const createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hospital created successfully.",
      data: hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//CRUD OPS
const getHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({
      slug: req.params.slug,
    });

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.json({
      success: true,
      data: hospital,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const updateHospital = async (req, res) => {
  try {

    const hospital =
      await Hospital.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      );

    if (!hospital) {

      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });

    }

    res.json({
      success: true,
      data: hospital,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const deleteHospital = async (req, res) => {

  try {

    const hospital =
      await Hospital.findByIdAndDelete(
        req.params.id
      );

    if (!hospital) {

      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });

    }

    res.json({
      success: true,
      message: "Hospital deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
const getHospitalBySlug = async (req, res) => {

  try {

    const hospital = await Hospital.findOne({
      slug: req.params.slug,
    });

    if (!hospital) {

      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });

    }

    res.json({
      success: true,
      data: hospital,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
module.exports = {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalBySlug,
};