/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express'
import { Secret } from 'jsonwebtoken'
import ApiError from '../error/ApiError'
import { httpCode } from '../shared/httpCodes'
import { jwtHelpers } from '../utils/jwtHelpers'
import config from '../config'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.header('Authorization')?.replace('Bearer ', '') // Extract the token from the request header
      if (!token) {
        throw new ApiError(httpCode.UNAUTHORIZED, 'You are not authorized')
      }

      //verify token
      let verifiedUser = null

    
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
      req.user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpCode.FORBIDDEN, 'Invalid Token')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth;