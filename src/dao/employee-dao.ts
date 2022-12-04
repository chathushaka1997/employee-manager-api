import { EmployeeModel, IEmployeeModel } from "../models/employee-model";
import Employee from "../schemas/employee-schema";
import { SortOrder, Types } from "mongoose";

export namespace EmployeeDao {
  export async function getEmployeeList(
    keyword: string,
    sortBy: {
      firstName?: SortOrder;
      lastName?: SortOrder;
      email?: SortOrder;
    }
  ): Promise<IEmployeeModel[]> {
    let employeeList;
    if (typeof keyword == "string") {
      employeeList = await Employee.find({
        $or: [
          { firstName: { $regex: keyword, $options: "i" } },
          { lastName: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
        ],
      }).sort(sortBy);
    } else {
      employeeList = await Employee.find().sort(sortBy);
    }
    return employeeList;
  }

  export async function addEmployee(employeeData: EmployeeModel): Promise<IEmployeeModel> {
    const newEmployee = new Employee(employeeData);
    return await newEmployee.save();
  }

  export async function checkEmailExist(email: string): Promise<IEmployeeModel | null> {
    const employee = await Employee.findOne({ email: email });
    return employee;
  }
  export async function checkEmployeeExist(id: Types.ObjectId): Promise<IEmployeeModel | null> {
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
