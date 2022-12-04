import { Express } from "express";
import { EmployeeEp } from "../end-points/employee-ep";

export function initEmployeeRoutes(app:Express){
    app.get('/api/employee',EmployeeEp.getEmployeeList)
    app.post('/api/employee',EmployeeEp.addEmployeeValidationRules(),EmployeeEp.addEmployee)
    app.put('/api/employee/:empId',EmployeeEp.updateEmployeeValidationRules(),EmployeeEp.updateEmployee)
    app.delete('/api/employee/:empId',EmployeeEp.deleteEmployee)
}