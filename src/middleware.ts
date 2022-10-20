import { NextFunction, Response, Request } from "express";
import CPE_DEVICES from "./data.json";

/**
 * Проверка запроса клиента, содержится ли в нем поле model. Соответствует ли его содержимое описанным моделям
 */
export const checkCpeModel = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isValid =
      req.query &&
      req.query.model &&
      Object.keys(CPE_DEVICES).some((i) => i === req.query.model);
    if (isValid) {
      next();
    } else {
      throw Error;
    }
  } catch (error) {
    console.log(":: checkCpeModel | error message: ", error);
    res.status(400).json({ message: "incorrect request params" });
  }
};
