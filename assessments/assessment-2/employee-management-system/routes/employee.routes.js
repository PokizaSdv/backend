const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee.controller.js");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getAllEmployeeById);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;