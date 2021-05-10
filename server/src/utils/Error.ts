var http = require("https");
import { ErrorMessages } from '../entities/errrorlogs'
import { getConnection } from 'typeorm';

export const errorfeed = async (message: any, module: string, ip: string) => {

  console.log('====>>>>>', message, module)
  ErrorMessages.create({
    errMessages: message,
    module: module,
    ipAddress: ip
  }).save();


}
