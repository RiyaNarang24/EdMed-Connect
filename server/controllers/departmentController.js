const Department = require("../models/Department");


const getDepartments = async (req, res) => {
  try {

    const filter = {};

if (req.user.role === "hospital-admin") {

    filter.hospital = req.user.hospital;

} else if (req.query.hospital) {

    filter.hospital = req.query.hospital;

}


    const departments = await Department
      .find(filter)
      .populate("hospital", "hospitalName");

    res.status(200).json({
      success: true,
      data: departments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getDepartment = async (req, res) => {

  try {

    const department =
      await Department.findById(req.params.id)
      .populate("hospital", "hospitalName");

    if (!department) {

      return res.status(404).json({
        success: false,
        message: "Department not found",
      });

    }

    res.json({
      success: true,
      data: department,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const createDepartment = async (req, res) => {

  try {

    console.log("USER:", req.user);

    console.log("BODY:", req.body);

    const department = await Department.create(req.body);

    console.log("CREATED:", department);

    res.status(201).json({
      success: true,
      message: "Department created successfully.",
      data: department,
    });

  } catch (error) {

  if (error.code === 11000) {

    return res.status(400).json({
      success: false,
      message: "Department code already exists.",
    });

  }

  res.status(500).json({
    success: false,
    message: error.message,
  });

}

};


const updateDepartment = async (req, res) => {

  try {

    const department =
      await Department.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      );

    if (!department) {

      return res.status(404).json({

        success: false,

        message: "Department not found",

      });

    }

    res.json({

      success: true,

      data: department,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

const deleteDepartment = async (req, res) => {

  try {

    const department =
      await Department.findById(req.params.id);

    if (!department) {

      return res.status(404).json({

        success: false,

        message: "Department not found",

      });

    }

    await department.deleteOne();

    res.json({

      success: true,

      message: "Department deleted successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};