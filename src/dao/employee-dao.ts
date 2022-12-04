import { EmployeeModel, IEmployeeModel } from "../models/employee-model";
import Employee from "../schemas/employee-schema";
import { Types } from "mongoose";

export namespace EmployeeDao {
  export async function getEmployeeList(): Promise<IEmployeeModel[]> {
    const employeeList = await Employee.find();
    return employeeList;
  }

  export async function addEmployee(employeeData: EmployeeModel): Promise<IEmployeeModel> {
    const newEmployee = new Employee(employeeData);
    return await newEmployee.save();
  }

  export async function checkEmailExist(email: string): Promise<IEmployeeModel|null> {
    const employee = await Employee.findOne({ email: email });
    return employee;
  }
  export async function checkEmployeeExist(id: Types.ObjectId): Promise<IEmployeeModel|null> {
    const employee = await Employee.findById(id);
    return employee;
  }

  export async function updateEmployee(employeeId: Types.ObjectId, employeeData: Partial<EmployeeModel>): Promise<IEmployeeModel | null> {
    const updateEmployee = await Employee.findByIdAndUpdate(employeeId, employeeData, { new: true });
    return updateEmployee;
  }
  export async function deleteEmployee(employeeId: Types.ObjectId): Promise<IEmployeeModel | null> {
    const deleteEmployee = await Employee.findByIdAndDelete(employeeId);
    return deleteEmployee;
  }
}
