import "reflect-metadata";
import {createConnection} from "typeorm";
import env from "./env";
import * as path from 'path';
import logger from "./_base/log/logger4js";
import { CustomerEntity } from "./entity/customerEntity";
import { ProductEntity } from "./entity/productEntity";
import { join } from "node:path";
import { RestaurantEntity } from "./entity/restaurantEntity";
import { GroupEntity } from "./entity/groupEntity";
import { GroupCustomerEntity } from "./entity/groupCustomerEntity";
import { PromotionEntity } from "./entity/promotionEntity";
import { OrderEntity } from "./entity/orderEntity";
import { ReviewEntity } from "./entity/reviewEntity";
import { MessageEntity } from "./entity/messageEntity";

const ormInit = async () => {
  try {
    const connection = await createConnection({
      type: "mysql",
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [
        CustomerEntity,
        RestaurantEntity,
        GroupEntity,
        GroupCustomerEntity,
        ProductEntity,
        PromotionEntity,
        OrderEntity,
        ReviewEntity,
        MessageEntity,
      ],
      migrations: [
        "./migrations/*" 
      ],
      subscribers: [
        "./subscriber/*" 
      ],
      cli: {
        migrationsDir: './migration',
      },
      synchronize: true,
      logging: false,
      charset: "utf8mb4_unicode_ci"
    })
    logger.debug("SUCCEED: DATABASE CREATED CONNECTION");
    return connection;
  }
  catch (error) {
    logger.error("ERROR: DATABASE CREATED CONNECTION UNSUCESSFULLY");
    logger.error(error);
    return null;
  }
}

export default ormInit;