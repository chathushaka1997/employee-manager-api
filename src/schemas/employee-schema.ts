import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IEmployeeModel } from "../models/employee-model";

const schemaOptions: mongoose.SchemaOptions = {
  _id: true,
  id: false,
  timestamps: true,
  strict: false,
  toJSON: {
    getters: true,
    virtuals: true,
  },
};

export const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: Schema.Types.String,
      require: true,
    },
    lastName: {
      type: Schema.Types.String,
      require: true,
    },
    email: {
      type: Schema.Types.String,
      require: true,
      unique:true
    },
    phoneNumber: {
      type: Schema.Types.String,
      require: true,
    },
    gender: {
      type: Schema.Types.String,
      require: true,
    },
    photo:{
      type: Schema.Types.String,
      require: false,
      default:null
    },
  },
  schemaOptions
);

const Employee = mongoose.model<IEmployeeModel>("Employee", EmployeeSchema);

export default Employee;
