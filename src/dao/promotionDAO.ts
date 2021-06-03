import { getManager, getRepository, In, Repository } from 'typeorm';
import { PromotionEntity } from '../entity/promotionEntity';
import IPromotion from '../model/IPromotion';
import logger from '../_base/log/logger4js';

async function getMaxPromotionId() {
  try {
    const repository = getRepository(PromotionEntity);
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
    const repository = getRepository(PromotionEntity);
    const promotions = await repository.find({where:{id: id,isActive:true}});
    if (promotions.length <= 0) {
      return null;
    }
    else {
      return promotions[0];
    }
  }
  catch(e) {
    throw e;
  }
}

async function getByRestaurantId(id: string) {
  try {
    const repository = getRepository(PromotionEntity);
    const promotions = await repository.find({where:{restaurant:{id:id},isActive:true}});
    return promotions;
  }
  catch(e) {
    throw e;
  }
}


function create (e: IPromotion){
  try {
    const repository = getRepository(PromotionEntity);
    return repository.create(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(promotion: PromotionEntity) {
  try {
    const repository = getRepository(PromotionEntity);
    return repository.save(promotion);
  }
  catch(e) {
    throw e;
  }
}
async function update(promotion: any) {
  try {
    const repository = getRepository(PromotionEntity);
    return repository.update(promotion.id, promotion);
  }
  catch(e) {
    throw e;
  }
}
async function deleteByIds(ids: Array<string>) {
  try {
    const repository = getRepository(PromotionEntity);
    const promotions = await repository.find({where: {id: In(ids), isActive: true}});
    promotions.map((e) => e.isActive = false);
    const deletedIds = await repository.save(promotions);
    return deletedIds;
  }
  catch(e) {
    throw e;
  }
}


const promotionDAO = {
  getMaxPromotionId,
  getByRestaurantId,
  getById,
  create,
  save,
  update,
  deleteByIds
}

export default promotionDAO;