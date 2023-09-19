const employeeService = require("../services/employee.service");
const getAllEmployees = (req, res) => {
    const employees = employeeService.getAllEmployees();
};

const getEmployeeById = (req, res) => {
    const { id } = req.params;
    const employee = employeeService.getEmployeeById(id);
};

const createEmployee = (req, res) => {
    const employeeData = req.body;
};

const updateEmployee = (req, res) => {};

const deleteEmployee = (req, res) => {};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
