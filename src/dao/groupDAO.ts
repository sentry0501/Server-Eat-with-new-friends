import { getManager, getRepository, In, LessThan, Repository } from 'typeorm';
import { GroupEntity } from '../entity/groupEntity';
import { CustomerEntity } from '../entity/customerEntity';
import IGroup from '../model/IGroup';
import logger from '../_base/log/logger4js';


// async function getByImporterId(id: string) {
//   try {
//     const repository = getRepository(GroupEntity);
//     // logger.info('INPUT2:' + id)
//     const groups = await repository.find({employee: {id: id}});
//     // logger.info('INPUT:'+ groups)
//     if (groups.length <= 0) {
//       return null;
//     }
//     else {
//       return groups;
//     }
//   }
//   catch(e) {
//     throw e;
//   }
// }
async function getById(id: string) {
  try {
    const repository = getRepository(GroupEntity);
    const group = await repository.findOne({id:id})
    if (!group) {
      return null;
    }
    else {
      return group;
    }
    
  }
  catch(e) {
    throw e;
  }
}
// async function getAll() {
//   try {
//     // logger.info('INPUT1:')
//     const repository = getRepository(GroupEntity);
//     // logger.info('INPUT2:')
//     return await repository.find({cache: true});
//   }
//   catch(e) {
//     throw e;
//   }
// }

async function findValid(id: string) {
  try {
    const repository = getRepository(GroupEntity);
    // logger.info('INPUT2:' + id)
    const groups = await repository.find({restaurant: {id: id},members: LessThan(5)});
    // logger.info('INPUT:'+ orders)
    if (groups.length <= 0) {
      return null;
    }
    else {
      return groups[0];
    }
  }
  catch(e) {
    throw e;
  }
}

async function save(group: GroupEntity) {
  try {
    const repository = getRepository(GroupEntity);
    // logger.debug("updateAt: "+group.updateAt);
    return repository.save(group);
  }
  catch(e) {
    throw e;
  }
}
async function update(group: GroupEntity) {
  try {
    const repository = getRepository(GroupEntity);
    // logger.debug("update"+ group.id)
    return repository.save(group);
  }
  catch(e) {
    throw e;
  }
}
async function deleteByIds(ids: Array<string>) {
  try {
    const repository = getRepository(GroupEntity);
    // logger.debug("Delete2")
    // await logger.debug("debug1"+JSON.stringify(ids))
    const deletedIds = await repository.createQueryBuilder()
                      .delete()
                      .from(GroupEntity)
                      .where("id IN (:idx)",{ idx:(ids)})
                      // .returning("id")
                      .execute();
    // await logger.debug("debug"+JSON.stringify(deletedIds))
    // const deletedIds = await repository.delete({id: In(ids)});
    return deletedIds;
  }
  catch(e) {
    throw e;
  }
}


const groupDAO = {
  // getMaxProductId,
  getById,
  // getByImporterId,
  // getAll,
  // create,
  findValid,
  save,
  update,
  deleteByIds,
}

export default groupDAO;