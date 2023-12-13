import { RequestHandler } from 'express';

export const getUser: RequestHandler = (req, res, next) => {
  res.locals.user = req?.oidc?.user;
  next();
};
