import { QueryFailedError } from "typeorm/error/QueryFailedError";
import ERR_CODE from "../const/error";
import STATUS_CODE from '../const/status';
import restaurantDAO from '../dao/restaurantDAO'
import CustomError from '../error/customError';
import logger from "../_base/log/logger4js";
import dateUtil from "../util/dateUtil";
import accountService from "./accountService";

class RestaurantService {
  private static _instance: RestaurantService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private async generateRestaurantId() {
    let maxId = await restaurantDAO.getMaxRestaurantId();
    if (!maxId) {
      maxId = "RE-000000";
    }
    const arr = maxId.split("-");
    let nextId = (parseInt(arr[1], 10) + 1).toString().padStart(6, "0");
    return arr[0] + "-" + nextId.toString();
  }

  public async getById(id: string) {
    try {
      const restaurant = await restaurantDAO.getById(id);
      if (!restaurant) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_GET_BY_ID_ERROR);
      }
      return restaurant;
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_GET_BY_ID_ERROR);
    }
  }

  public async getByName(name: string) {
    try {
      const restaurants = await restaurantDAO.getByName(name);
      if (!restaurants) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_GET_BY_NAME_ERROR);
      }
      return restaurants;
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_GET_BY_NAME_ERROR);
    }
  }

  public async getAll() {
    const restaurants = await restaurantDAO.getAll();
    return restaurants;
  }
  public async delete(ids: Array<string>) {
    try {
      const restaurants = await restaurantDAO.deleteByIds(ids);
      const deletedIds = restaurants.map((e) => e.id);
      // const deletedIds = restaurants;
      logger.debug("Delete" + deletedIds)
      return deletedIds;
    }
    catch {
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_DELETE_ERROR);
    }
  }
  public async updateInfo(restaurant: any, avatarPath: string, coverPath: string) {
    try {
      // Gen Date


      const e = await restaurantDAO.getById(restaurant.id);
      if (e) {
        let newRestaurant: any = {
          id: e.id,
          name: restaurant.name,
          description: restaurant.description,
          avatarUri: avatarPath ? avatarPath : e.avatarUri,
          coverUri: coverPath ? coverPath : e.coverUri,
          isActive: restaurant.isActive === false ? false : true,
          address: restaurant.address,
          hashPassword: e.hashPassword,
          roleCode: restaurant.roleCode,
        };
        if (restaurant.account.toString() != e.account.toString()) {
          newRestaurant.account = restaurant.account;
        }
        await restaurantDAO.update(newRestaurant);
        let newEntity = await this.getById(e.id);
        newEntity.password = e.password;
        return newEntity;
      }
      else {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_UPDATE_ERROR);
      }
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_CREATE_ERROR);
    }
  }
  public async createOne(e: any, avatarPath: string, coverPath: string) {
    try {
      // Generate Next Ids
      const nextId = await this.generateRestaurantId();
      logger.debug("GENERATE" + nextId);

      // Hash Password
      e.hashPassword = await accountService.hashPassword(e.password);

      // Create Restaurant to save
      let newRestaurant = restaurantDAO.create({
        id: nextId,
        name: e.name,
        description: e.description,
        avatarUri: avatarPath,
        coverUri: coverPath,
        isActive: e.isActive === false ? false : true,
        account: e.account,
        address: e.address,
        hashPassword: e.hashPassword,
        roleCode: e.roleCode,
      });
      newRestaurant.password = e.password;

      // Save restaurant in database
      newRestaurant = await restaurantDAO.save(newRestaurant);
      return newRestaurant;
    }
    catch(e) {
      logger.error(e+"\n");
      logger.error(JSON.stringify(e));
      if (e instanceof QueryFailedError) {
        // logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_CREATE_ERROR);
    }
  }
}

export default RestaurantService.Instance