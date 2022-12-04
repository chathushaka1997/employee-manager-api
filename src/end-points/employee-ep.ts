import { NextFunction, Request, Response } from "express";
import { check, param, ValidationChain, validationResult } from "express-validator";
import { EmployeeDao } from "../dao/employee-dao";
import { EmployeeModel, Gender } from "../models/employee-model";
import { SortOrder, Types } from "mongoose";

export namespace EmployeeEp {
  export async function getEmployeeList(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyword, sortBy } = req.query;
      let sortByQuery = {};
      if (typeof sortBy == "string") {
        if (sortBy == "firstName") {
          sortByQuery = { firstName:1 as SortOrder };
        } else if (sortBy == "lastName") {
          sortByQuery = {lastName:1 as SortOrder};
        } else if (sortBy == "email") {
          sortByQuery = { email:1 as SortOrder};
        }
      }
      const employeeList = await EmployeeDao.getEmployeeList(keyword as string, sortByQuery);
      return res.send({ success: true, data: employeeList });
    } catch (error) {
      next(error);
    }
  }

  export function addEmployeeValidationRules(): ValidationChain[] {
    return [
      check("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name is not a String")
        .isLength({ min: 6, max: 10 })
        .withMessage("First name must be at least 6 characters long & not more than 10 characters")
        .isAlpha()
        .withMessage("First name must be alphabetic"),
      check("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name is not a String")
        .isLength({ min: 6, max: 10 })
        .withMessage("Last name must be at least 6 characters long & not more than 10 characters")
        .isAlpha()
        .withMessage("Last name must be alphabetic"),
      check("email").not().isEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
      check("phoneNumber").notEmpty().withMessage("PhoneNumber is required").isMobilePhone("si-LK").withMessage("Please enter valid LK phone number"),
      check("gender")
        .notEmpty()
        .withMessage("gender is required")
        .isString()
        .withMessage("gender is not a String")
        .isIn([Gender.FEMALE, Gender.MALE, Gender.NOT_SPECIFIED])
        .withMessage("gender is not valid type"),
      check("photo").optional().isString().withMessage("photo is not a String"),
    ];
  }

  export async function addEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send({ error: errors.array()[0]["msg"], suceess: false });
      }
      const employeeData: EmployeeModel = req.body;
      const checkEmailExist = await EmployeeDao.checkEmailExist(employeeData.email);
      if (checkEmailExist) {
        return res.send({ error: "Email already exist", suceess: false });
      }
      const createEmployee = await EmployeeDao.addEmployee(employeeData);
      return res.send({ success: true, data: createEmployee });
    } catch (error) {
      next(error);
    }
  }

  export function updateEmployeeValidationRules(): ValidationChain[] {
    return [
      check("firstName")
        .optional()
        .isString()
        .withMessage("First name is not a String")
        .isLength({ min: 6, max: 10 })
        .withMessage("First name must be at least 6 characters long & not more than 10 characters")
        .isAlpha()
        .withMessage("First name must be alphabetic"),
      check("lastName")
        .optional()
        .isString()
        .withMessage("Last name is not a String")
        .isLength({ min: 6, max: 10 })
        .withMessage("Last name must be at least 6 characters long & not more than 10 characters")
        .isAlpha()
        .withMessage("Last name must be alphabetic"),
      check("email").optional().isEmail().withMessage("Invalid email address"),
      check("phoneNumber").optional().isMobilePhone("si-LK").withMessage("Please enter valid LK phone number"),
      check("gender")
        .optional()
        .isString()
        .withMessage("gender is not a String")
        .isIn([Gender.FEMALE, Gender.MALE, Gender.NOT_SPECIFIED])
        .withMessage("gender is not valid type"),
      check("photo").optional().isString().withMessage("photo is not a String"),
    ];
  }

  export async function updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send({ error: errors.array()[0]["msg"], suceess: false });
      }

      const newEmployeeData: Partial<EmployeeModel> = req.body;
      const employeeId = new Types.ObjectId(req.params.empId);
      const checkEmployeeExist = await EmployeeDao.checkEmployeeExist(employeeId);
      if (newEmployeeData.email) {
        const checkEmailExist = await EmployeeDao.checkEmailExist(newEmployeeData.email);
        if (checkEmailExist && checkEmailExist.email != checkEmployeeExist?.email) {
          return res.send({ error: "Email already exist", suceess: false });
        }
      }

      if (!checkEmployeeExist) {
        return res.send({ error: "User not found", suceess: false });
      }

      const updatedEmployeeData = await EmployeeDao.updateEmployee(employeeId, newEmployeeData);
      if (!deleteEmployee) {
        return res.send({ success: false, error: "Employee data update failed" });
      }
      return res.send({ success: true, data: updatedEmployeeData });
    } catch (error) {
      next(error);
    }
  }

  export async function deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = new Types.ObjectId(req.params.empId);
      const deleteEmployee = await EmployeeDao.deleteEmployee(employeeId);
      if (!deleteEmployee) {
        return res.send({ success: false, error: "Employee not found" });
      }
      return res.send({ success: true, data: deleteEmployee });
    } catch (error) {
      next(error);
    }
  }
}
