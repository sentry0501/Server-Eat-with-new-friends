import { getManager, getRepository, In, Repository } from 'typeorm';
import { OrderEntity } from '../entity/orderEntity';
import IOrder from '../model/IOrder';
import logger from '../_base/log/logger4js';

async function getMaxOrderId() {
  try {
    const repository = getRepository(OrderEntity);
    const maxId = await repository
    .createQueryBuilder("e")
    .select("MAX(e.id)", "max")
    .getRawOne()
    // logger.debug(JSON.stringify(maxId));//{"max": null}
    if (!maxId || !maxId.hasOwnProperty("max") || !maxId.max) {
      return null;
    }
    return maxId.max.toString();
  }
  catch(e) {
    throw e;
  }
}

async function getById(id: string) {
  try {
    const repository = getRepository(OrderEntity);
    const orders = await repository.find({where:{id: id}});
    if (orders.length <= 0) {
      return null;
    }
    else {
      return orders[0];
    }
  }
  catch(e) {
    throw e;
  }
}


async function getByGroupId(id: string) {
  try {
    const repository = getRepository(OrderEntity);
    const orders = await repository.find({where:{group:{ id:id}}});
    if (orders.length <= 0) {
      return null;
    }
    else {
      return orders[0];
    }
  }
  catch(e) {
    throw e;
  }
}

async function getByRestaurantId(id: string) {
  try {
    const repository = getRepository(OrderEntity);
    const orders = await repository.find({where:{approve:0,restaurantId:id}});
    return orders;
  }
  catch(e) {
    throw e;
  }
}


function create (e: IOrder){
  try {
    const repository = getRepository(OrderEntity);
    return repository.create(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(order: OrderEntity) {
  try {
    const repository = getRepository(OrderEntity);
    return repository.save(order);
  }
  catch(e) {
    throw e;
  }
}
async function update(order: any) {
  try {
    const repository = getRepository(OrderEntity);
    return repository.update(order.id, order);
  }
  catch(e) {
    throw e;
  }
}


const orderDAO = {
  getMaxOrderId,
  getByRestaurantId,
  getByGroupId,
  getById,
  create,
  save,
  update,
}

export default orderDAO;