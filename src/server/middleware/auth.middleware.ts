import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { PermitEnum, RoleEnum, SECRET } from "../config.js";
import { resError } from "../tools/response.js";

export function checkToken(req: Request & Record<string, any>, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    console.debug("authHeader: " + authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export function checkPermit(permits: PermitEnum | PermitEnum[] ) {
    return function (req: Request & Record<string, any>, res: Response, next: NextFunction) {
        if (req.user.role !== RoleEnum.SUPER) {
            const userPermit = req.user.permit ?? [];
            // permit是数组还是单个, req.user.permit是数组
            if (Array.isArray(permits)) {
                if(!permits.every(permit => userPermit.includes(permit))) {
                    return res.status(403).json(resError('权限不足'));
                }
            } else {
                if (!userPermit.includes(permits)) {
                    return res.status(403).json(resError('权限不足'));
                }
            }
        }
        next();
    };
}

export function checkRole(role: RoleEnum) {
    return function (req: Request & Record<string, any>, res: Response, next: NextFunction) {
        if (req.user.role !== role) {
            return res.status(403).json(resError('权限不足'));
        }
        next();
    };
}