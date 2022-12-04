import {Document} from 'mongoose'

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    NOT_SPECIFIED = "NOT_SPECIFIED",
  }
export interface EmployeeModel{
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    gender:Gender;
    photo?:string
}

export interface IEmployeeModel extends EmployeeModel, Document {}