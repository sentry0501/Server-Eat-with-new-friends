import { getManager, getRepository, In, LessThan, Repository } from 'typeorm';
import { GroupEntity } from '../entity/groupEntity';
import { CustomerEntity } from '../entity/customerEntity';
import IReview from "../model/IReview";
import IGroup from '../model/IGroup';
import logger from '../_base/log/logger4js';
import { ReviewEntity } from '../entity/reviewEntity';

async function getByRestaurantId(id: string) {
  try {
    const repository = getRepository(ReviewEntity);
    const reviews = await repository.find({where:{restaurant:{id:id}}})
    return reviews;
    
  }
  catch(e) {
    throw e;
  }
}

function create (e: IReview){
  try {
    const repository = getRepository(ReviewEntity);
    return repository.create(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(review: ReviewEntity) {
  try {
    const repository = getRepository(ReviewEntity);
    // logger.debug("updateAt: "+group.updateAt);
    return repository.save(review);
  }
  catch(e) {
    throw e;
  }
}


const groupDAO = {

  getByRestaurantId,

  create,

  save,

}

export default groupDAO;