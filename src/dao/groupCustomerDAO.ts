import { getManager, getRepository, In, Repository } from 'typeorm';
import { GroupCustomerEntity } from '../entity/groupCustomerEntity';
import IGroupCustomer from '../model/IGroupCustomer';
import logger from '../_base/log/logger4js';


// async function deleteByIds(ids: Array<string>) {
//   try {
//     const repository = getRepository(EmployeeEntity);
//     // const deletedEmployees = await repository
//     // .createQueryBuilder()
//     // .update<EmployeeEntity>(EmployeeEntity, { isActive: false})
//     // .set({ isActive: false})
//     // .where("id = :id", { id: In(ids) })
//     // .returning(['id'])
//     // .updateEntity(true)
//     // .execute();
//     // logger.debug(JSON.stringify(deletedEmployees));
//     // return deletedEmployees.generatedMaps.map((id) => id.toString());
//     const employees = await repository.find({where: {id: In(ids), isActive: true}});
//     employees.map((e) => e.isActive = false);
//     const deletedIds = await repository.save(employees);
//     return deletedIds;
//   }
//   catch(e) {
//     throw e;
//   }
// }

async function getByCustomerId(id: string) {
  try {
    // await logger.debug("proIdDAO"+groupCustomers.product.id);
    const repository = getRepository(GroupCustomerEntity);
    // let newgroupCustomers: any = await repository.create(groupCustomers);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(groupCustomers));
    logger.debug(" id "+id);
    const newgroupCustomers = await repository.find({customer: {id: id}});
    logger.debug("groupCustomers "+JSON.stringify(newgroupCustomers));
    // console.log("hahaha"+re)
    return newgroupCustomers;
  }
  catch(e) {
    throw e;
  }
}

async function save(groupCustomers: any) {
  try {
    // await logger.debug("proIdDAO"+groupCustomers.product.id);
    let repository = getRepository(GroupCustomerEntity);
    // let newgroupCustomers: any = await repository.create(groupCustomers);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(groupCustomers));
    let newgroupCustomers = await repository.save(groupCustomers);
    // await logger.debug("proIdDAO"+JSON.stringify(newgroupCustomers));
    // console.log("hahaha"+re)
    return newgroupCustomers;
  }
  catch(e) {
    throw e;
  }
}
async function create(groupCustomers: GroupCustomerEntity) {
  try {
    // await logger.debug("proIdDAO"+groupCustomers.product.id);
    let repository = getRepository(GroupCustomerEntity);
    // let newgroupCustomers: any = await repository.create(groupCustomers);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(groupCustomers));
    let newgroupCustomers = await repository.create(groupCustomers);
    // await logger.debug("proIdDAO"+newgroupCustomers.product.id);
    // console.log("hahaha"+re)
    return newgroupCustomers;
  }
  catch(e) {
    throw e;
  }
}

async function deleteByCustomerId(id: string,grId: string) {
  try {
    // await logger.debug("proIdDAO"+groupCustomers.product.id);
    let repository = getRepository(GroupCustomerEntity);
    // let newgroupCustomers: any = await repository.create(groupCustomers);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(groupCustomers));
    const dels =  await repository.find({where: {customer: {id:id},group:{id:grId}}});
    let deled = await repository.remove(dels);
    // await logger.debug("proIdDAO"+newgroupCustomers.product.id);
    // console.log("hahaha"+re)
    return deled;
  }
  catch(e) {
    throw e;
  }
}

async function getByGroupId(id: string) {
  try {
    // await logger.debug("proIdDAO"+groupCustomers.product.id);
    const repository = getRepository(GroupCustomerEntity);
    // let newgroupCustomers: any = await repository.create(groupCustomers);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(groupCustomers));
    // logger.debug(" id "+id);
    const groupCustomers = await repository.find({where: [{ group: {id:id}}]});
    // logger.debug("groupCustomers "+JSON.stringify(newgroupLeaders));

    return groupCustomers;


  }
  catch(e) {
    throw e;
  }
}

async function getByNewLeader(id: string) {
  try {
    // await logger.debug("proIdDAO"+groupCustomers.product.id);
    const repository = getRepository(GroupCustomerEntity);
    // let newgroupCustomers: any = await repository.create(groupCustomers);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(groupCustomers));
    // logger.debug(" id "+id);
    const newgroupLeaders = await repository.find({where: [{ group: {id:id}}]});
    // logger.debug("groupCustomers "+JSON.stringify(newgroupLeaders));

    return newgroupLeaders[0].customer;


  }
  catch(e) {
    throw e;
  }
}


async function checkInGroup(customerId: string, restaurantId: string) {
  try {
    // await logger.debug("proIdDAO"+groupCustomers.product.id);
    const repository = getRepository(GroupCustomerEntity);
    // let newgroupCustomers: any = await repository.create(groupCustomers);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(groupCustomers));
    // logger.debug(" id "+id);
    const newgroupCustomers = await repository.find({where: 
                                                      { 
                                                        customer: {id: customerId},
                                                        restaurantId: restaurantId
                                                      }
                                                    });
    // logger.debug("groupCustomers "+restaurantId);
    logger.debug("groupCustomers "+JSON.stringify(newgroupCustomers));
    // console.log("hahaha"+re)
    if (newgroupCustomers.length <= 0) {
      return false;
    }
    else {
      return true;
    }

  }
  catch(e) {
    throw e;
  }
}


async function checkInGroupId(customerId: string, groupId: string) {
  try {
    // await logger.debug("proIdDAO"+groupCustomers.product.id);
    const repository = getRepository(GroupCustomerEntity);
    // let newgroupCustomers: any = await repository.create(groupCustomers);
    // logger.debug("ĐÂUUDUAUDA"+JSON.stringify(groupCustomers));
    // logger.debug(" id "+id);
    const newgroupCustomers = await repository.find({where: 
                                                      { 
                                                        customer: {id: customerId},
                                                        group: {id:groupId}
                                                      }
                                                    });
    // logger.debug("groupCustomers "+restaurantId);
    // logger.debug("groupCustomers "+JSON.stringify(newgroupCustomers));
    // console.log("hahaha"+re)
    if (newgroupCustomers.length <= 0) {
      return false;
    }
    else {
      return true;
    }

  }
  catch(e) {
    throw e;
  }
}

const groupCustomerDAO = {
  // getMaxEmployeeId,
  getByGroupId,
  getByNewLeader,
  getByCustomerId,
  checkInGroup,
  // getAll,
  create,
  save,
  deleteByCustomerId,
  // update,
  // deleteByIds
}

export default groupCustomerDAO;