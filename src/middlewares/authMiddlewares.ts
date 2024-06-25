import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UsersModel } from '../db/models/usersModel'
import dotenv from 'dotenv'
import { handleErrorResponse } from '../utils/responseHandler'

dotenv.config()

export interface AuthenticatedRequest extends Request {
  user?: UsersModel
}

interface DecodedToken extends JwtPayload {
  id: string
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return handleErrorResponse(res, 401, 'Access Token Required')
  }

  const token = authHeader.split(' ')[1]?.trim() // Optional chaining for safer access

  try {
    const secretKey = process.env.JWT_SECRET as string
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined')
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken

    if (!decoded?.id) {
      // Optional chaining to check for existence
      throw new Error('Token does not contain user ID')
    }

    const user = await UsersModel.query().findById(decoded.id)

    if (user == null) {
      // Explicit check for null or undefined
      return handleErrorResponse(res, 404, 'User not found')
    }

    req.user = user
    next()
  } catch (err) {
    return handleErrorResponse(res, 403, 'Invalid Access Token')
  }
}

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if ((req.user == null) || !roles.includes(req.user.roleId || '')) {
      // Handle nullable roleId explicitly
      return handleErrorResponse(res, 403, 'Access Denied')
    }
    next()
  }
}
