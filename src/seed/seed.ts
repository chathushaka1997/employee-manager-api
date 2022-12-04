import { EmployeeDao } from "../dao/employee-dao";
import { EmployeeModel, Gender } from "../models/employee-model";

const users = require("./employees");
export default async function seed() {
  try {
    console.log("DB Seeding.......");
    for (let index = 0; index < users.length; index++) {
      const empData: EmployeeModel = {
        email: users[index].email,
        firstName: users[index].first_name,
        gender: users[index].gender == "M" ? Gender.MALE : Gender.FEMALE,
        lastName: users[index].last_name,
        phoneNumber: users[index].number,
        photo: users[index].photo,
      };
      await EmployeeDao.addEmployee(empData);
    }

    console.log("DB Seeding Completed.");
  } catch (error) {
    console.log(error);
  }
}
