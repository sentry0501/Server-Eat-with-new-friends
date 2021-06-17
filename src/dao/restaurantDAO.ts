import { getManager, getRepository, In, Repository } from 'typeorm';
import { RestaurantEntity } from '../entity/restaurantEntity';
import IRestaurant from '../model/IRestaurant';
import logger from '../_base/log/logger4js';

async function getMaxRestaurantId() {
  try {
    const repository = getRepository(RestaurantEntity);
    const maxId = await repository
    .createQueryBuilder("e")
    .select("MAX(e.id)", "max")
    .getRawOne()
    if (!maxId || !maxId.hasOwnProperty("max") || !maxId.max) {
      return null;
    }
    return maxId.max.toString();
  }
  catch(e) {
    throw e;
  }
}

async function deleteByIds(ids: Array<string>) {
  try {
    const repository = getRepository(RestaurantEntity);
    const restaurants = await repository.find({where: {id: In(ids), isActive: true}});
    restaurants.map((e) => e.isActive = false);
    const deletedIds = await repository.save(restaurants);
    return deletedIds;
  }
  catch(e) {
    throw e;
  }
}

async function getById(id: string) {
  try {
    const repository = getRepository(RestaurantEntity);
    const restaurants = await repository.find({where: {id: id,isActive:true}});
    if (restaurants.length <= 0) {
      return null;
    }
    else {
      return restaurants[0];
    }
  }
  catch(e) {
    throw e;
  }
}

async function getByName(name: string) {
  try {
    logger.debug("name "+ name)
    
    const repository = getRepository(RestaurantEntity);
    // const customers = await repository.find({name: Like('%${name}%')});
    const restaurants = await repository.createQueryBuilder("restaurant")
                                      .where("restaurant.name like :name", { name:`%${name}%` })
                                      .andWhere("restaurant.isActive = :isActive",{isActive:1})
                                      .getMany();
    // logger.debug("name "+ JSON.stringify(restaurants))
    // if (restaurants.length <= 0) {
    //   return null;
    // }
    // else {
    return restaurants;
    // }
  }
  catch(e) {
    throw e;
  }
}


async function getAll() {
  try {
    const repository = getRepository(RestaurantEntity);
    return await repository.find({where:{isActive: true},cache:true});
  }
  catch(e) {
    throw e;
  }
}
function create (e: IRestaurant){
  try {
    const repository = getRepository(RestaurantEntity);
    return repository.create(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(restaurant: RestaurantEntity) {
  try {
    const repository = getRepository(RestaurantEntity);
    return repository.save(restaurant);
  }
  catch(e) {
    throw e;
  }
}
async function update(restaurant: any) {
  try {
    const repository = getRepository(RestaurantEntity);
    return repository.update(restaurant.id, restaurant);
  }
  catch(e) {
    throw e;
  }
}

const restaurantDAO = {
  getMaxRestaurantId,
  getByName,
  getById,
  getAll,
  create,
  save,
  update,
  deleteByIds
}

export default restaurantDAO;